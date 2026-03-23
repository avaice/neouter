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

#### 型補完が効くLinkを作る

`BaseLink` と型ユーティリティを組み合わせて、`href` に登録済みルートのみを受け付ける `Link` コンポーネントを作れます。

```tsx
// routes.ts
export const routes = {
  "/": { component: Home },
  "/about": { component: About },
  "/users/:userId": { component: User },
} as const;
```

```tsx
// components/Link.tsx
import { type AssertPathType, BaseLink, type WithQueryAndHash } from "neouter";
import type { ComponentProps } from "react";
import type { routes } from "./routes";

export const Link = <T extends AssertPathType<keyof typeof routes>>(
  props: Omit<ComponentProps<typeof BaseLink>, "href"> & {
    href: WithQueryAndHash<T>;
  }
): ReturnType<typeof BaseLink> => BaseLink(props);
```

`AssertPathType` はパスの `:param` 部分を `string` に置換し、`WithQueryAndHash` はクエリ文字列やハッシュの付与を許可します。

```tsx
<Link href="/about" />            // OK
<Link href="/about?tab=1" />      // OK
<Link href="/users/123" />        // OK
<Link href="/nonexistent" />      // NG
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