---
description: ユーザーがプロジェクトの環境構築を行う場合、このスキルを使用する
---

# Webアプリ環境構築スキル: Next.js + Supabase

Next.js(App Router)とSupabaseを組み合わせた、認証機能付きのモダンなWebアプリケーションの土台を構築します。

## 1. 事前確認事項（ヒアリング）
構築を開始する前に、以下の項目をユーザーに確認し、確定させること。
* **プロジェクト名**: (例: AntigravityProject)
* **Supabaseプロジェクト名**: (例: AntigravityProject)
* **利用する認証プロバイダー**: (例: Email + Google, GitHub等)
* **インストール先ディレクトリ**: (カレントディレクトリか、新規作成か)

## 2. プロジェクトスタック
* **Frontend**: Next.js (最新版, App Router, TypeScript, Tailwind CSS)
* **Backend/BaaS**: Supabase
* **Authentication**: Supabase Auth (ヒアリングで確定したプロバイダー)

## 3. 実装要件
環境構築完了時点で、以下の機能が動作する状態にすること。

### A. プロジェクト初期化
* ヒアリングしたディレクトリにて `npx create-next-app@latest` を実行。
* TypeScript, ESLint, Tailwind CSS を有効化。
* Supabaseクライアントライブラリ（`@supabase/supabase-js`, `@supabase/ssr`）のインストール。

### B. Supabase連携設定
* ユーザーに対し、Supabase管理画面でのプロジェクト作成を促す。
* `.env.local` への `NEXT_PUBLIC_SUPABASE_URL` および `NEXT_PUBLIC_SUPABASE_ANON_KEY` の設定。
* 選択されたプロバイダー（Google等）のOAuth設定手順を提示し、環境変数またはSupabaseコンソールへの入力を案内する。

### C. 認証機能の実装
以下の機能を Server Components / Client Components を適切に使い分けて実装する。
1. **サインアップ機能**: メールアドレス/パスワードによる新規登録（必要な場合）。
2. **サインイン機能**:
    * メールアドレス/パスワードによるログイン。
    * **指定されたソーシャルプロバイダー**を利用したログイン。
3. **サインアウト機能**: セッションを破棄し、適切なページへリダイレクト。

## 4. 完了定義 (Definition of Done)
* [ ] ローカル環境で `npm run dev` がエラーなく起動する。
* [ ] 選択した全てのログイン手段で認証フローが完了し、ユーザー情報が取得できる。
* [ ] ログイン済みのユーザーのみが閲覧できる「マイページ（プロテクトページ）」が1つ以上存在する。
* [ ] ログアウト後にプロテクトページにアクセスしようとすると、自動的にログインページへリダイレクトされる。