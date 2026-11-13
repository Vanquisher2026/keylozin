const WebSocket = require('ws');
const http = require('http');

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
  const action = process.argv[2] || 'check';
  const tabId = process.argv[3];
  try {
    const targets = await getJSON('/json');
    let tab = tabId ? targets.find(t => t.id === tabId) : targets.find(t => t.type === 'page' && t.url.includes('github.com'));
    if (!tab) tab = targets.find(t => t.type === 'page');
    if (!tab) { console.log('No tab'); return; }
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
    const ev = expr => send('Runtime.evaluate', { expression: expr, returnByValue: true });
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    await new Promise(r => ws.once('open', r));
    await send('Page.enable');
    console.log('Tab:', tab.id, tab.url);
    if (action === 'navigate') {
      await send('Page.navigate', { url: process.argv[3] });
      await sleep(5000);
      const r = await ev('document.body.innerText.substring(0, 5000)');
      console.log(r.result.value);
    } else if (action === 'eval') {
      const r = await ev(process.argv[3]);
      console.log(JSON.stringify(r.result.value, null, 2));
    } else if (action === 'click') {
      await ev(process.argv[3] + '.click()');
      await sleep(3000);
      const r = await ev('document.body.innerText.substring(0, 3000)');
      console.log(r.result.value);
    } else if (action === 'type') {
      await ev(`(() => { const el = ${process.argv[3]}; el.focus(); el.value = ''; })()`);
      await send('Input.insertText', { text: process.argv[4] });
      console.log('Typed:', process.argv[4]);
    } else {
      const r = await ev('document.body.innerText.substring(0, 5000)');
      console.log(r.result.value);
    }
    ws.close();
  } catch (e) { console.error('Error:', e.message); }
})();
