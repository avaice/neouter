Language: [EN](./README.md) / JA

# neouter

neouter($/njuːtər/$, ニョーター) is type-assisted router for minimalists!

2026年時点での主要ブラウザのbaselineに対応しています。 (Chrome 123+, Firefox 147+, Safari 26.2+)
それ以前のブラウザでは、ハードナビゲーションとして動作します。

## インストール

```bash
npm i neouter
```

## 使い方

詳細は [API リファレンス](./API.ja.md) を参照

### ルートの定義

```tsx
import { useCreateRoutes } from "neouter";

type PathPatterns = "/" | "/about";

const routes: Record<PathPatterns, { component: () => JSX.Element }> = {
  "/": {
    component: () => <div>こんにちは！</div>,
  },
  "/about": {
    component: () => <div>概要</div>,
  },
};

declare module "neouter" {
  interface Register {
    pathPatterns: PathPatterns;
  }
}

export const App = () => {
  const { Router, RouterProvider } = useCreateRoutes({ routes });
  return (
    <RouterProvider>
      <Router />
    </RouterProvider>
  );
};
```

### リンク

```tsx
import { Link } from "neouter";

export const Page = () => {
  return (
    <div>
      <p>
        neouter is a routing library for people who are obsessed with
        simplicity😄
      </p>
      <Link href="/learn">Learn more</Link>
    </div>
  );
};
```

### タイトル

Reactでは、任意の場所で`<title>`タグを使用できます。
https://ja.react.dev/reference/react-dom/components/title

```tsx
export const Page = () => {
  return (
    <div>
      <title>neouter</title>
      <p>
        neouter is a routing library for people who are obsessed with
        simplicity😄
      </p>
    </div>
  );
};
```

## コントリビューション

[CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください
