// 定期讀取 Supabase 的 birds 資料表一筆資料，讓免費專案不會因為閒置被暫停。
// 設定值（SUPABASE_URL、SUPABASE_KEY）來自 wrangler secret，不寫在程式碼裡。

async function ping(env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
    throw new Error('缺少 SUPABASE_URL 或 SUPABASE_KEY，請用 wrangler secret put 設定');
  }
  const url = env.SUPABASE_URL.replace(/\/+$/, '') + '/rest/v1/birds?select=id&limit=1';
  const started = Date.now();
  const res = await fetch(url, {
    headers: { apikey: env.SUPABASE_KEY, Accept: 'application/json' },
  });
  const ms = Date.now() - started;
  const body = await res.text();
  if (!res.ok) {
    throw new Error('Supabase 回應 HTTP ' + res.status + '（' + ms + ' ms）：' + body.slice(0, 200));
  }
  let rows = 0;
  try { rows = JSON.parse(body).length; } catch (e) {}
  return { status: res.status, ms, rows };
}

export default {
  async scheduled(controller, env, ctx) {
    const at = new Date(controller.scheduledTime).toISOString();
    try {
      const r = await ping(env);
      console.log(JSON.stringify({ ok: true, at, cron: controller.cron, status: r.status, ms: r.ms, rows: r.rows }));
    } catch (err) {
      console.error(JSON.stringify({ ok: false, at, cron: controller.cron, error: String(err && err.message || err) }));
      throw err; // 讓 Cloudflare 把這次執行標成失敗
    }
  },
};
