import express from 'express';
import http from 'http';
import { Server } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

wss.on('connection', ws => {
ws.on('message', message => {
    console.log('Received:', message);
});
setInterval(() => {
    ws.send('Hello from server!');
}, 1000);
});

app.get('/', (req, res) => {
res.send('Hello World!');
});

server.listen(3001, () => {
console.log('Server started on http://localhost:3001');
});

// テストのため、または他のファイルからこのアプリケーションを利用するために、appオブジェクトをエクスポートします。
export default app;