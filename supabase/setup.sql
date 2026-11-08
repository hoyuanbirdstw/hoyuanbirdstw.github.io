-- =========================================================
-- 禾園鳥坊｜Supabase 資料庫設定
-- ---------------------------------------------------------
-- 用法：Supabase 後台 → SQL Editor → 貼上整份 → Run
-- 可以重複執行，不會重複建立，也不會刪除既有的鳥類資料。
--
-- 這份檔案做四件事：
--   1. 建立 birds 資料表（在店鳥寶清單）
--   2. 設定「更新資料時自動改 updated_at」
--   3. 開啟 RLS：所有人可讀，只有登入的使用者可新增、修改、刪除
--   4. 建立 bird-photos 照片空間：公開讀取，只有登入的使用者可上傳、修改、刪除
--
-- ⚠ 執行完還要到 Supabase 後台手動做兩件事（SQL 做不到）：
--   (a) Authentication → Sign In / Providers → 關閉「Allow new users to sign up」
--       否則任何人都能自己註冊帳號，註冊後就變成「登入的使用者」，可以改你的資料
--   (b) Authentication → Users → Add user，手動幫家人建立帳號（Email + 密碼）
-- =========================================================


-- ---------------------------------------------------------
-- 1. 資料表 birds：在店鳥寶
--    欄位和網站目前的 birds.js 對照：
--      name → name、name_en → name_en、desc → description、
--      desc_en → description_en、price → price、photo → photo_url、status → status
-- ---------------------------------------------------------
create table if not exists public.birds (
  id             uuid primary key default gen_random_uuid(),
  name           text not null check (length(btrim(name)) > 0),   -- 中文名稱（必填，不能只有空白）
  name_en        text,                                            -- 英文名稱（選填）
  description    text,                                            -- 中文介紹，例如年紀、個性
  description_en text,                                            -- 英文介紹（選填）
  price          text,                                            -- 價格，例如 'NT$1,200'；空的網站會顯示「價格請來店詢問」
  status         text not null default '在店'                     -- 狀態只能是這三個字，預設「在店」
                 check (status in ('在店', '已預訂', '已售出')),
  photo_url      text,                                            -- 照片網址（存在 bird-photos 空間）
  sort_order     integer not null default 0,                      -- 排序，數字小的排前面
  created_at     timestamptz not null default now(),              -- 建立時間
  updated_at     timestamptz not null default now()               -- 最後更新時間（下面的觸發器會自動更新）
);

-- 網站會依 sort_order 由小到大、同數字時新的在前面來排，建索引讓查詢快一點
create index if not exists birds_sort_idx on public.birds (sort_order, created_at desc);


-- ---------------------------------------------------------
-- 2. 自動更新 updated_at
--    每次修改一筆鳥的資料，updated_at 都會自動變成現在時間，前端不用自己填
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists birds_set_updated_at on public.birds;
create trigger birds_set_updated_at
  before update on public.birds
  for each row
  execute function public.set_updated_at();


-- ---------------------------------------------------------
-- 3. 權限：Row Level Security（RLS）
--    網站用的 publishable key 是公開的，真正的防護靠這一段：
--    沒登入的人（anon）只能讀；登入的人（authenticated）才能新增、修改、刪除
-- ---------------------------------------------------------
alter table public.birds enable row level security;

-- 資料表層級的權限（RLS 是在這之上再過濾一層，兩層都要允許才行）
grant select                         on public.birds to anon, authenticated;
grant insert, update, delete         on public.birds to authenticated;

-- 所有人（含沒登入的訪客）都可以讀取，網站首頁要顯示鳥類清單
drop policy if exists "birds_select_all" on public.birds;
create policy "birds_select_all"
  on public.birds for select
  to anon, authenticated
  using (true);

-- 只有登入的使用者可以新增
drop policy if exists "birds_insert_authenticated" on public.birds;
create policy "birds_insert_authenticated"
  on public.birds for insert
  to authenticated
  with check (true);

-- 只有登入的使用者可以修改
drop policy if exists "birds_update_authenticated" on public.birds;
create policy "birds_update_authenticated"
  on public.birds for update
  to authenticated
  using (true)
  with check (true);

-- 只有登入的使用者可以刪除
drop policy if exists "birds_delete_authenticated" on public.birds;
create policy "birds_delete_authenticated"
  on public.birds for delete
  to authenticated
  using (true);


-- ---------------------------------------------------------
-- 4. 照片空間（Storage bucket）：bird-photos
--    - public = true：網頁上的 <img src="照片網址"> 任何人都能直接看，不用登入
--    - 單張上限 5MB（5 * 1024 * 1024 = 5242880 位元組）
--    - 只收 jpg / png / webp / gif。刻意不收 SVG（可內嵌程式碼）和 HEIC（多數瀏覽器看不到）
--      iPhone 拍的照片若是 HEIC，後台頁面上傳前要先轉成 jpg
--    - 重複執行時會把這些設定更新成最新值
-- ---------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'bird-photos',
  'bird-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;


-- ---------------------------------------------------------
-- 照片空間的權限（storage.objects 的 RLS）
--    「公開讀取」由上面 public = true 負責（用照片網址就能看），
--    所以不另外開放匿名者「列出所有檔案」的權限。
--    登入的使用者需要 select 權限，才能做修改、覆蓋、刪除（這些操作內部會先查檔案）。
-- ---------------------------------------------------------
drop policy if exists "bird_photos_select_authenticated" on storage.objects;
create policy "bird_photos_select_authenticated"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'bird-photos');

-- 只有登入的使用者可以上傳照片
drop policy if exists "bird_photos_insert_authenticated" on storage.objects;
create policy "bird_photos_insert_authenticated"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'bird-photos');

-- 只有登入的使用者可以修改（覆蓋、改名）照片
drop policy if exists "bird_photos_update_authenticated" on storage.objects;
create policy "bird_photos_update_authenticated"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'bird-photos')
  with check (bucket_id = 'bird-photos');

-- 只有登入的使用者可以刪除照片
drop policy if exists "bird_photos_delete_authenticated" on storage.objects;
create policy "bird_photos_delete_authenticated"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'bird-photos');
