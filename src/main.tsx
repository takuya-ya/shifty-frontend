import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // 全体に適応するスタイルシート
import App from './App.tsx' // アプリの本体（親コンポーネント）

// 1. HTML内の id="root" を持つ要素を探し、Reactの「起点」を作成
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

// 2. Reactアプリを画面に映し出す
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
