/* =========================================================
   禾園鳥坊｜Supabase 連線設定
   ---------------------------------------------------------
   網站首頁和之後的後台頁面都讀這個檔案，要換專案只改這裡。

   這裡只能放「可公開」的資料：
   - url             Project URL
   - publishableKey  Publishable key（sb_publishable_ 開頭），設計上就是給瀏覽器用的，
                     能做什麼完全由資料庫的 RLS 權限決定（見 supabase/setup.sql）

   ⚠ 絕對不能放進這個檔案或整個專案的：
   - Secret key（sb_secret_ 開頭）
   - service_role key（舊版的 service_role JWT）
   - 資料庫密碼、其他任何私密金鑰
   這個專案是 public repo，放進去等於全世界都看得到，而且能繞過所有權限。
   ========================================================= */

window.SUPABASE_CONFIG = {
  url: "https://kxaqytzfufaltpgmtrks.supabase.co",
  publishableKey: "sb_publishable_xBG2Es0CGJs_F9jGCk3f-A_HyJLytgm",
  birdsTable: "birds",          // 在店鳥寶資料表
  photoBucket: "bird-photos"    // 鳥的照片空間
};
