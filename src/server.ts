// src/server.js
import express from 'express';
import http from 'http';
import { Server } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

// WebSocket接続が開かれたときの処理
wss.on('connection', ws => {
  // メッセージを定期的にクライアントに送信
  const intervalId = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send('Hello from server!');
    }
  }, 1000);

  // クライアントからのメッセージを受け取る
  ws.on('message', message => {
    console.log('Received:', message);
  });

  // WebSocket接続が閉じたときの処理
  ws.on('close', () => {
    clearInterval(intervalId); // インターバルを停止
    console.log('Connection closed');
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

if (require.main === module) {
  server.listen(3001, () => {
    console.log('Server started on http://localhost:3001');
  });
}

// テストのため、または他のファイルからこのアプリケーションを利用するために、appオブジェクトをエクスポートします。
export { app, server }; // appとserverをエクスポート