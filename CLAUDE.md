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
```

`index.html` 由上到下的區塊（錨點 id）：

`#top` 首頁 → `#birds` 在店鳥寶 → `#supplies` 鳥用品 → `#knowledge` 養鳥知識 → `#about` 關於本店 → `#gallery` 店面照片 → `#trade` 進出口貿易 → `#visit` 到店資訊

- 用 Font Awesome 6.5.2（cdnjs）當圖示
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
