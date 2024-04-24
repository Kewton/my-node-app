# Dockerfile
FROM node:16-slim

# 作業ディレクトリを設定
WORKDIR /app

# アプリケーションの依存関係ファイルをコピー
COPY package.json package-lock.json ./

RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションを実行
CMD ["npx", "ts-node", "src/server.ts"]
