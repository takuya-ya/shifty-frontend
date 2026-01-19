FROM node:20-alpine

WORKDIR /app

# 依存を先にコピーしてキャッシュ利用
COPY package*.json ./
RUN npm install

# ソースをコピー
COPY . .

EXPOSE 5173

# Vite を開発モードで起動（外部アクセス許可）
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
