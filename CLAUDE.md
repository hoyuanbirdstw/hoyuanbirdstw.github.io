# 禾園鳥坊（Hoyuan Birds）網站

台中在地傳統鳥店的靜態網站，沒有建置流程，直接用 GitHub Pages 發佈。

- 網址：https://hoyuanbirdstw.github.io/
- Repo：`hoyuanbirdstw/hoyuanbirdstw.github.io`（public，main 分支、根目錄）
- 推到 `main` 後 Pages 會自動重新發佈，通常一兩分鐘內生效

## 語言

之後一律用繁體中文（台灣用語）回答使用者。程式碼、檔名、commit message 可維持英文。

## Git 與帳號

- 這個 repo 只能用 GitHub 帳號 `hoyuanbirdstw`，使用者平常的帳號不是這個
- commit 身分只設在本機 repo（`--local`）：名字 `Hoyuan Birds`，信箱是 `hoyuanbirdstw` 的 GitHub noreply 信箱。不要改全域設定
- `gh` 同時登入了多個帳號。推送或操作 GitHub 前先用 `gh auth status` 確認，必要時 `gh auth switch --user hoyuanbirdstw`。不要登出其他帳號
- `birds/` 資料夾目前是空的，靠 `.gitkeep` 保留。放進第一張鳥的照片後可以刪掉 `.gitkeep`

## 網站結構

```
index.html   整個網站（HTML + CSS + JS 都在這一個檔案）
birds.js     在店鳥類清單（資料檔，店家最常改的檔案）
birds/       鳥的照片（檔名用英文或數字，例如 bunchou-01.jpg）
photos/      其他照片：hero.jpg（首頁主視覺）、shop-01.jpg ~ shop-05.jpg（店面照片，目前尚未放入）
supabase-config.js   Supabase 連線設定（Project URL + Publishable key），網站和後台頁面都讀它
supabase/setup.sql   Supabase 資料庫設定（資料表、權限、照片空間），在 Supabase SQL Editor 執行
care.html            養鳥知識頁（分頁：依鳥種查詢／共通照顧須知；網址 # 對應：#species、#species/<id>、#beginner #feed #daily #health #faq）。頁首、頁尾、CSS 是從 index.html 複製的，改 index 的共用部分時要同步改這裡；頁面右下角 #helper 的 LINE 連結也要和 index.html 一致
care-data.js         養鳥知識：鳥種資料（11 組，中英文，補資料只改這個檔；中文寫 null 的列不顯示）
care-topics.js       養鳥知識：共通照顧須知文章資料（5 個主題，中英文）
admin.html           後台頁面（家人用手機上架「在店鳥寶」），網站上沒有連結，見下方「後台 admin.html」
admin.webmanifest    後台的 PWA 設定（名稱「禾園鳥坊後台」，加到主畫面後全螢幕）
admin-icons/         後台圖示：icon-192.png、icon-512.png、apple-touch-icon.png（由店徽產生）
```

`index.html` 由上到下的區塊（錨點 id）：

`#top` 首頁 → `#birds` 在店鳥寶 → `#supplies` 鳥用品 → `#knowledge` 養鳥知識 → `#about` 關於本店 → `#gallery` 店面照片 → `#trade` 進出口貿易 → `#visit` 到店資訊

- 圖示全部是內嵌 SVG，沒有載入 Font Awesome。頁尾的 Facebook、LINE 圖示取自 Font Awesome Free 6.5.2（CC BY 4.0），程式碼裡留有出處註解，改動時請保留。要新增圖示就直接貼 SVG，不要再引入外部圖示字型
- 響應式斷點：寬度 ≤1020px 時上方選單改成「☰ 選單」按鈕，點開後直向排列，點選項目、點外面、按 Esc 會收起；≤900px 時主視覺改成上圖下字（文字放在深色底，避免壓在鳥臉上），小幫手在主視覺還大部分在畫面內時會先收起。調整版面後請在 320、375、414、768、1024、1440 寬度檢查中英文兩版，不能有橫向捲軸，手機上可點的地方至少 44px 高
- 頁面中有底色的 `<span class="fill">【...】</span>` 是**待補的佔位文字**（開店年份、地址、營業時間、電話等），店家提供資料後要換掉，中英文兩邊都要換
- LINE 連結：頁面右下角 `#helper` 的 `href` 是全站 LINE 按鈕的單一來源，所有帶 `data-line` 的連結會自動沿用。要設定 LINE，只改 `#helper` 的 `href`
- 頁尾的 Facebook / Instagram / LINE 圖示 `href` 目前都是 `#`，待填
- 店面照片 `photos/shop-01.jpg` ~ `shop-05.jpg` 沒有檔案時會自動顯示灰底佔位，放入同名檔案即可
- 首頁主視覺要換圖，把新照片命名為 `hero.jpg` 放進 `photos/`

## birds.js 上架方式

`birds.js` 定義 `window.BIRDS` 陣列，每隻鳥一組 `{ ... }`，存檔後網頁自動顯示，不需要改 `index.html`。

上架一隻鳥：

1. 把照片放進 `birds/`（檔名用英文或數字）
2. 在 `birds.js` 複製一整組 `{ ... }`，改成那隻鳥的資料
3. commit 並 push 到 `main`

欄位：

| 欄位 | 說明 |
| --- | --- |
| `name` | 名稱（必填，沒有就不會顯示這組） |
| `name_en` | 英文名稱（選填，英文版顯示；沒填就顯示中文） |
| `desc` | 一句介紹，例如年紀、個性、適不適合新手 |
| `desc_en` | 英文介紹（選填） |
| `price` | 價格，例如 `"NT$1,200"`；留空 `""` 會顯示「價格請來店詢問」 |
| `photo` | 照片路徑，例如 `"birds/bunchou-01.jpg"`；留空 `""` 或載入失敗會顯示預設鳥圖示 |
| `status` | 只能是 `"在店"`、`"已預訂"`、`"已售出"` 其中一個（中文原字，英文版會自動轉成 Available / Reserved / Sold）；填錯會當成 `"在店"` |

注意：

- 每組 `{ }` 後面要加逗號，最後一組可以不加
- `"已售出"` 的鳥會顯示價格欄為 Sold／已售出，並套用 sold 樣式
- 目前 `birds.js` 裡三筆是「範例：」開頭的假資料，要換成店裡實際的鳥

## Supabase（在店鳥寶後台，建置中）

目標：讓家人用手機登入後台頁面上架「在店鳥寶」，取代手動改 `birds.js`。

**目前進度：資料庫設定、後台頁面 `admin.html` 都完成了。** `index.html` 還是讀 `birds.js`，網站改讀 Supabase 還沒做。改網站之前，`birds.js` 要繼續保留可用。

### 架構

- Supabase 專案：`https://kxaqytzfufaltpgmtrks.supabase.co`
- 連線設定放在 `supabase-config.js`（`window.SUPABASE_CONFIG`：`url`、`publishableKey`、`birdsTable`、`photoBucket`）。網站和後台頁面都讀這個檔案，要換專案只改這裡。因為是純靜態網站，沒有 `.env`，也不用 `NEXT_PUBLIC_` 前綴
- `supabase/setup.sql` 是資料庫的單一來源，可重複執行（不會重複建立、不會刪資料）。改資料表、權限或照片空間時，改這份檔案，再到 Supabase 後台 SQL Editor 執行。Claude 沒有 Supabase 後台權限，不會替使用者執行它

### setup.sql 的內容

- 資料表 `birds`：`id`（uuid）、`name`（中文名稱，必填）、`name_en`、`description`、`description_en`、`price`、`status`、`photo_url`、`sort_order`、`created_at`、`updated_at`（修改時由觸發器自動更新）
- `status` 只能是 `在店`、`已預訂`、`已售出`，預設 `在店`（和 `birds.js` 的 status 一致）
- 與 `birds.js` 欄位對照：`name`→`name`、`name_en`→`name_en`、`desc`→`description`、`desc_en`→`description_en`、`price`→`price`、`photo`→`photo_url`、`status`→`status`。網站改讀 Supabase 時，要在前端把 `description` 對回頁面用的 `desc`
- 權限（RLS）：所有人（含沒登入的訪客）可讀；只有登入的使用者可新增、修改、刪除
- 照片空間 `bird-photos`：公開讀取（用照片網址就能顯示）；只有登入的使用者可上傳、修改、刪除；單張上限 5MB；只收 jpg、png、webp、gif（不收 SVG 和 HEIC，所以後台上傳前要把 iPhone 的 HEIC 轉成 jpg）

### 登入與帳號

- 「登入的使用者」就是有權限改資料的人，所以 Supabase 後台必須**關閉公開註冊**（Authentication → Sign In / Providers → 關閉 Allow new users to sign up），並由使用者手動建立家人的帳號。不關的話，任何人都能自己註冊並改資料
- 不要開啟 Anonymous sign-ins（匿名登入也算 `authenticated`）

### 金鑰規則（重要）

這是 **public repo**，放進去的東西全世界都看得到。

- `supabase-config.js` 只能放 Project URL 和 **Publishable key**（`sb_publishable_` 開頭）。Publishable key 設計上就是給瀏覽器用的，能做什麼完全由 RLS 決定
- **Secret key（`sb_secret_` 開頭）、`service_role` key、資料庫密碼絕對不能放進專案**：不能寫在任何檔案、commit、CLAUDE.md、註解或截圖裡，也不要貼給任何人。它們能繞過所有 RLS 權限。使用者若貼出這類金鑰，先提醒他到 Supabase 後台重新產生（作廢舊的），不要寫進檔案
- 寫前端程式只能用 `window.SUPABASE_CONFIG.publishableKey`；需要管理員權限的事，請使用者到 Supabase 後台操作，不要用 secret key 在網頁裡做

## 後台 admin.html

- 網址：https://hoyuanbirdstw.github.io/admin.html（網站上不放連結，有 `noindex`，也刻意不加 `robots.txt`，免得把網址寫出來）
- 登入：Email + 密碼，帳號由 Supabase 後台 Authentication → Users 手動建立。登入狀態由 supabase-js 存在瀏覽器，右上角顯示帳號和「登出」
- 清單：依 `sort_order`、再依 `created_at`（新的在前）排序。點狀態腳環切換「在店 → 已預訂 → 已售出」，立刻存檔。「上移／下移」會先把全部重新編號成 0、1、2…再交換（因為舊資料的 `sort_order` 都是 0）。新增的鳥放最上面（`sort_order` = 目前最小值 − 1）
- 新增／編輯：整頁（網址 hash：`#/new`、`#/edit/<id>`）。名稱必填；英文名稱、英文介紹收在「英文（選填）」。按「儲存」後按鈕停用並顯示「上傳中…」；有未儲存的變更時按返回、瀏覽器返回、登出、關閉頁面都會先問「還沒儲存，確定要離開嗎？」
- 刪除：跳出確認，先刪資料列，再刪 Storage 照片檔
- 照片：上傳前在瀏覽器壓縮成最長邊 1600px 的 JPEG，盡量小於 500KB。HEIC／HEIF 先用 heic2any 轉 JPEG（選到 HEIC 才載入）。每次上傳用新檔名 `bird-<時間>-<隨機>.jpg`，不覆蓋（所以 Storage 只需要 insert／delete 權限）。換照片時順序是：傳新圖 → 更新資料列 → 刪舊圖；更新失敗會把剛傳的新圖刪掉
- 外部函式庫（jsDelivr，固定版本＋SRI 雜湊）：`@supabase/supabase-js@2.118.0`、`heic2any@0.0.4`。升級時要同時換 URL 和 `integrity`（用 `curl` 下載後 `openssl dgst -sha384 -binary | openssl base64 -A` 算），並選發布超過兩週的版本（`npm view <套件> time`）
- 只使用 `window.SUPABASE_CONFIG` 的 Project URL 和 Publishable key，不放任何 secret key。Supabase 的 `update`／`delete` 被 RLS 擋住時不會報錯、只是回傳 0 筆，所以程式有用 `.select('id')` 檢查回傳筆數
- 加到手機主畫面：iPhone 用 Safari「分享 → 加入主畫面」；Android 用 Chrome 選單「加到主畫面」。圖示是店徽，開啟時全螢幕
- 修改後台後，用 Playwright 開 `admin.html` 檢查 320、375、414、768、1024 寬度沒有橫向捲軸、按鈕至少 48px。要測登入後的畫面時，攔截 supabase-js 的 URL 換成假的 `window.supabase`（同時要拿掉 `<script>` 的 `integrity`，否則會被擋）。真正的登入、上傳、刪除要用真帳號手動測

## 養鳥知識頁 care.html

- 內容來自「養鳥知識文章.md」「鸚鵡鳥種資料.md」（已查證，只在本機、列在 .gitignore，不上傳）。內容不要自行改寫，每格都有來源編號
- 內容是「待店家補充」的欄位在資料裡是 null，網頁不顯示；店家補資料後把 null 換成文字即可
- 鳥種照片在 photos/species/（11 張，Wikimedia Commons，CC BY／CC BY-SA），作者與授權寫在 care-data.js 底部的 CARE_PHOTOS 和 photos/species/CREDITS.md；換照片時兩邊都要更新，小檔案會自動標註作者、授權和來源。只能用 CC0、Public Domain、CC BY、CC BY-SA
- 灰鸚鵡 CITES 附錄一會醒目標示；凱克、非洲鸚鵡、各色和尚、鷹頭 4 組 `lowSource: true`，會標「資料來源：飼料公司，非獸醫撰寫」
- 英文版在 care-data.js、care-topics.js 的第二個字串，頁面固定文字在 care.html 底部的 `EN`、`T`

## 英文翻譯

英文翻譯放在 `index.html` 底部 `<script>` 裡的 `EN` 物件（約第 449 行）。

- 中文直接寫在 HTML 裡，英文寫在 `EN`
- 對應方式：HTML 元素的 `data-i18n="某個key"` ↔ `EN.某個key`
- 切換語言時，程式把元素的 `innerHTML` 換成 `EN[key]`；沒有對應 key 的元素維持中文
- 新增或修改頁面文字時，**要同時做兩件事**：在元素上加 `data-i18n="key"`，並在 `EN` 補上同名 key。中文原文和英文都要保留 HTML 結構，例如 `<span class="fill">`、`<a data-line>`、`<br>`
- 鳥清單狀態與「價格請來店詢問」這類固定字串是 `EN` 裡的 `s_avail`、`s_reserved`、`s_sold`、`ask_price`，中文版對應 `ZH_FIXED`
- 網址加 `?lang=en` 會直接開啟英文版；語言選擇會存在瀏覽器 `localStorage`
- 鳥清單的英文名稱與介紹不在 `EN`，而是寫在 `birds.js` 的 `name_en`、`desc_en`

## 編輯注意

- `index.html` 約 190 KB，其中有內嵌的大型資料（例如主視覺圖），用 Grep 或指定行號範圍讀取，不要整檔讀
- 檔案是 UTF-8。在 Windows PowerShell 用 `Get-Content` 看會出現亂碼，這是終端機編碼問題，檔案本身沒壞；請用 Read 工具檢視
- 改完先用瀏覽器開 `index.html` 檢查中文版與英文版（`?lang=en`）
