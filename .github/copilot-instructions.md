# Shifty Frontend AI Coding Instructions

## 言語

- **コードレビュー・コメント・チャットでの応答は必ず日本語で行うこと。** 英語での応答は禁止。

## このドキュメントについて

- GitHub Copilot（コードレビュー含む）が本リポジトリのコンテキストを理解しやすくするためのガイドです。
- 新しい機能を実装する際はここで示す技術選定・設計方針・モジュール構成を前提にしてください。

## アプリ概要

**Shifty** は、シフト作成作業を効率化し、管理者の負担を軽減するためのWebサービスです。半月ごとのシフト登録・編集・確定といった運用を一元化します。現在は **Phase1 (MVP)**。管理者機能を中心に構築中。

## 技術スタック

- **Language**: TypeScript (strict mode ON)
- **Framework**: React 19 / Vite
- **Router**: React Router
- **State Management**:
  - **Server State**: TanStack Query (React Query)
  - **Global/UI State**: Zustand (必要に応じて)
  - **Form**: React Hook Form + Zod
- **Styling**: Tailwind CSS / shadcn/ui + Radix UI
- **Utilities**: date-fns (日付操作の標準), dnd-kit (ドラッグ&ドロップ操作)
- **API Client**: fetch API + 独自 wrapper (shared/api)
- **Testing**: Vitest + React Testing Library (Phase2以降)

## プロジェクト構成と役割

```
src/
├── features/           # 機能別モジュール (shift, auth, settings等)
│   ├── components/
│   ├── hooks/
│   ├── api/
│   └── types/
├── shared/             # 共通モジュール
│   ├── components/     # ui (shadcn等), layout
│   ├── hooks/
│   ├── utils/
│   └── api/            # APIクライアント設定
└── assets/             # 静的ファイル
```

## アーキテクチャ指針

- **Component**: Atomic Designをベースにしつつ、`shared/components/ui` に汎用パーツ、`features/` 内に機能特化したパーツを配置。
- **State Management**:
  - APIデータはすべて React Query で管理し、`staleTime` などを利用して最適化。
  - 複雑なフォームは React Hook Form + Zod で型安全にバリデーション。
- **Data Flow**: `UI -> Custom Hook -> API Client (fetch wrapper) -> Server`

## シフトドメインの仕様

- **期間概念**: 半月単位（1〜15日、16日〜末日）での管理。
- **状態遷移**: `draft` (下書き) → `confirmed` (確定)。
- **ガント表示**: スタッフ × 日付のグリッド表示。日付の範囲計算には `date-fns` を使用。

## 認証フロー (Sanctum)

- **認証シーケンス**: ログイン前に `GET /sanctum/csrf-cookie` を呼び出し、次に `POST /api/login` を叩くフローを厳守。
- **認証状況判定**: ユーザー情報取得APIが成功するかどうかでログイン状態を判定。

## アンチパターン

- **useEffectの濫用**: データフェッチは React Query、イベントハンドラで済む処理に `useEffect` は使わない。
- **anyの禁止**: TypeScript では可能な限り型を定義する。

## ファイル命名規則

- Component: `ShiftTable.tsx` (PascalCase) / ディレクトリは `shift-table/` (kebab-case)
- Hook: `useShifts.ts` (camelCase + use prefix)
- Utils: `formatDate.ts` (camelCase)

## コミットメッセージ規約

- コミットメッセージは日本語で、以下の形式：
  ```
  接頭辞: 本文
  - 理由の詳細（体言止め）
  ```
