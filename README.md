# JPYC Wallet

JPYC Wallet は、JPYC SDK を使用した基本的な暗号資産ウォレットのサンプル実装です。Next.js、TypeScript、Tailwind CSS、shadcn/ui を使用してモダンな UI を実現しています。

## 機能

- ウォレット接続
- 残高確認
- JPYC 送金
- トランザクション履歴の表示
- マルチチェーン対応（Ethereum, Polygon, Astar）

## 技術スタック

- [Next.js](https://nextjs.org/) - React フレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [shadcn/ui](https://ui.shadcn.com/) - UI コンポーネント
- [JPYC SDK](https://docs.jpyc.jp/) - JPYC との連携
- [wagmi](https://wagmi.sh/) - Ethereum との連携
- [RainbowKit](https://www.rainbowkit.com/) - ウォレット接続 UI

## 始め方

1. リポジトリのクローン:

```bash
git clone [your-repo-url]
cd jpyc-wallet
```

2. 依存パッケージのインストール:

```bash
npm install
```

3. 開発サーバーの起動:

```bash
npm run dev
```

4. ブラウザで開く:

```
http://localhost:3000
```

## プロジェクト構成

```
src/
├── app/           # Next.js App Router
├── components/    # Reactコンポーネント
│   ├── layout/   # レイアウト関連
│   ├── wallet/   # ウォレット機能
│   └── ui/       # UIコンポーネント
└── lib/          # ユーティリティ
```

## 環境変数

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_JPYC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_INFURA_ID=your_infura_id
```

## ライセンス

MIT

## 貢献について

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成
