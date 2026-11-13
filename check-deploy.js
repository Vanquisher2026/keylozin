const http = require('http');
const WebSocket = require('ws');

function getJSON(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port: 9222, path, method: 'GET' }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e){ reject(e); } });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  try {
    const targets = await getJSON('/json');
    const tab = targets.find(t => t.type === 'page' && t.url.includes('github.com'));
    if (!tab) { console.log('No GitHub tab'); return; }
    console.log('Connecting to tab:', tab.url);
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();
    ws.on('message', msg => {
      const m = JSON.parse(msg);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    });
    const send = (method, params) => new Promise(res => {
      const mid = id++;
      pending.set(mid, res);
      ws.send(JSON.stringify({ id: mid, method, params: params || {} }));
    });
    await new Promise(r => ws.once('open', r));
    await send('Page.enable');
    await send('Page.navigate', { url: 'https://github.com/Vanquisher2026/keylozin/actions' });
    await new Promise(r => setTimeout(r, 4000));
    const { result } = await send('Runtime.evaluate', { expression: 'document.body.innerText.substring(0, 3000)', returnByValue: true });
    console.log('--- Page ---');
    console.log(result.value);
    ws.close();
  } catch (e) { console.error('Error:', e.message); }
})();
