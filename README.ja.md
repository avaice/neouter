# neouter

neouter($/njuːtər/$, ニョーター) is type-safe router for minimalists!

## インストール
```bash
npm i neouter
```

## 使い方

詳細は [API リファレンス](./API.ja.md) を参照

### ルートの定義
```tsx
import { useCreateRoutes } from "neouter";

const routes = {
  "/": {
    component: () => <div>こんにちは！</div>,
  },
  "/about": {
    component: () => <div>概要</div>,
  },
};

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
```tsx
import { Title } from "neouter";

export const Page = () => {
  return (
    <div>
      <Title>neouter</Title>
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