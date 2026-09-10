
const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const crypto = require('crypto');

const HTTP_PORT = process.env.PORT || 3000;
const WS_PORT   = process.env.WS_PORT || 8000;
const COMMAND_TIMEOUT_MS = parseInt(process.env.COMMAND_TIMEOUT_MS || '7000', 10); 


const clients = new Map();    
const pending = new Map();            

const wss = new WebSocketServer({ port: WS_PORT });
console.log(`[WS] WebSocket listening on ws://0.0.0.0:${WS_PORT}`);
ko
wss.on('connection', (ws, req) => {
  const clientId = crypto.randomUUID();
  clients.set(clientId, { ws, lastPong: Date.now() });
  console.log(`[WS] Client connected: ${clientId} (${req.socket.remoteAddress})`);

  ws.on('message', (buf) => {
    let data;
    try {
      data = JSON.parse(buf.toString());
    } catch {
      console.log(`[WS] Plain text from ${clientId}:`, buf.toString());
      return;
    }

    console.log(data);

    const entry = pending.get(data.requestId);
    if (entry) {
      clearTimeout(entry.timeout);
      pending.delete(data.requestId);

      if (data.ok) {
        entry.resolve({
          ok: true,
          output: data.output ?? '',
          fromClientId: clientId
        });
      } else {
        entry.resolve({
          ok: false,
          error: data.error ?? 'Unknown error',
          output: data.output ?? '',
          fromClientId: clientId
        });
      }
    }
  });




  ws.on('close', () => {
    console.log(`[WS] Client disconnected: ${clientId}`);
    clients.delete(clientId);
  });

  ws.on('pong', () => {
    const c = clients.get(clientId);
    if (c) c.lastPong = Date.now();
  });
});

setInterval(() => {
  const now = Date.now();
  for (const [id, { ws, lastPong }] of clients) {
    if (now - lastPong > 30000) {
      console.warn(`[WS] Client ${id} timed out (no pong). Terminating.`);
      ws.terminate();
      clients.delete(id);
    } else {
      try { ws.ping(); } catch {}
    }
  }
}, 10000);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    httpPort: HTTP_PORT,
    wsPort: WS_PORT,
    clients: Array.from(clients.keys()),
    pending: pending.size,
  });
});

// body: { text: string, timeoutMs?: number, targetClientId?: string }
app.post('/send', async (req, res) => {
  const text = req.body?.text;
  const timeoutMs = Math.max(500, Math.min(60000, Number(req.body?.timeoutMs || COMMAND_TIMEOUT_MS)));
  const targetClientId = req.body?.targetClientId;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ ok: false, error: 'text (string) is required' });
  }

  let selectedId = targetClientId;
  if (selectedId) {
    if (!clients.has(selectedId)) {
      return res.status(404).json({ ok: false, error: `targetClientId not connected: ${selectedId}` });
    }
  } else {
    selectedId = clients.keys().next().value;
    if (!selectedId) return res.status(503).json({ ok: false, error: 'No Minecraft clients connected' });
  }

  const client = clients.get(selectedId);
  if (!client) return res.status(503).json({ ok: false, error: 'Selected client unavailable' });

  const requestId = crypto.randomUUID();
  const payload = {
    type: 'command',
    requestId,
    command: text, 
  };

  const resultPromise = new Promise((resolve, reject) => {
    const to = setTimeout(() => {
      pending.delete(requestId);
      resolve({ ok: false, error: 'Command timed out' });
    }, timeoutMs);

    pending.set(requestId, { resolve, reject, timeout: to });
  });

  try {
    client.ws.send(JSON.stringify(payload));
  } catch (e) {
    pending.delete(requestId);
    return res.status(500).json({ ok: false, error: 'Failed to send to WS client', detail: String(e?.message || e) });
  }

  const result = await resultPromise;

  if (result.ok) {
    return res.json({
      ok: true,
      requestId,
      fromClientId: result.fromClientId || selectedId,
      output: result.output || '',
    });
  } else {
    return res.status(200).json({
      ok: false,
      requestId,
      fromClientId: result.fromClientId || selectedId,
      error: result.error || 'Unknown error',
      output: result.output || '',
    });
  }
});

app.post('/broadcast', (req, res) => {
  const text = req.body?.text;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ ok: false, error: 'text (string) is required' });
  }
  const sentTo = [];
  for (const [id, { ws }] of clients) {
    try {
      ws.send(JSON.stringify({ type: 'command', requestId: crypto.randomUUID(), command: text }));
      sentTo.push(id);
    } catch {}
  }
  res.json({ ok: true, sentTo });
});

app.listen(HTTP_PORT, () => {
  console.log(`[HTTP] API listening on http://0.0.0.0:${HTTP_PORT}`);
});
