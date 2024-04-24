# back(node)
## setup
1. プロジェクトディレクトリの作成
    ```
    mkdir my-node-typescript-backend
    ```
1. パッケージの初期化
    ```
    cd my-node-typescript-backend
    npm init -y
    ```
1. TypeScriptとExpressのインストール
    ```
    npm install express
    npm install ws
    npm install --save-dev typescript @types/node @types/express ts-node　
    npm install --save-dev @types/ws

    # test
    npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
    ```
1. TypeScript設定ファイルの生成
    ```
    npx tsc --init
    ```
1. 'tsconfig.json'を編集して、以下のように設定します。
    ```json
    {
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*", "tests/*"],
    "exclude": ["node_modules"]
    }
    ```
1. Jestの設定をpackage.jsonに追加します。
    ```json
    "jest": {
        "preset": "ts-jest",
        "testEnvironment": "node"
    }
    ```
1. package.jsonにテストスクリプトを追加します。
    ```json
    "scripts": {
        "test": "jest"
    }
    ```
# coding
1. サーバー設定 (src/server.ts):
    - ディレクトリの作成
    - server.tsファイルの作成
    ```typescript
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
    ```
1. 起動
    ```
    npx ts-node src/server.ts
    ```
## test
1. バックエンドのテスト (tests/server.test.ts):
    ```typescript
    import request from 'supertest';
    import app from '../src/server';

    describe('GET /', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
    });

    ```
1. テストの実行
    ```
    npm test
    ```

# container
- build
```
docker build -t node-app:v0.0.1 . --no-cache
```
- run
```
docker run -p 3001:3001 node-app:v0.0.1
```
- test
```
curl http://127.0.0.1:3001
```