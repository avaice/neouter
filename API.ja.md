# neouter API reference

## コンポーネント

### `BaseLink`

クライアントサイドナビゲーション用のリンクコンポーネント。

```tsx
import { BaseLink } from "neouter";

<BaseLink href="/about" className="link">About</BaseLink>
```

| Prop | 型 | 必須 | 説明 |
|------|------|------|------|
| `href` | `string` | Yes | 遷移先のパス |
| `children` | `ReactNode` | | リンクの中身 |
| `...props` | `ComponentProps<'a'>` | | `<a>` タグの全属性 |

- Ctrl+Click / Cmd+Click で新規タブを開く動作を維持
- `onClick` を渡した場合、ナビゲーション前に実行される
- `e.preventDefault()` 済みの場合はナビゲーションしない

---

### `Title`

ドキュメントのタイトルを変更するコンポーネント。アンマウント時に元のタイトルへ復元する。

```tsx
import { Title } from "neouter";

<Title>ページタイトル</Title>
```

| Prop | 型 | 必須 | 説明 |
|------|------|------|------|
| `children` | `string` | Yes | タイトル |

---

## Hooks

### `useCreateRoutes`

ルーティングをセットアップする。`RouterProvider` と `Router` を返す。

```tsx
import { useCreateRoutes } from "neouter";

const { RouterProvider, Router, paths } = useCreateRoutes({
  routes: {
    "/": { component: HomePage },
    "/user/:id": { component: UserPage },
  },
  notFoundComponent: NotFoundPage,
});

// 使い方
<RouterProvider>
  <Header />
  <Router />
  <Footer />
</RouterProvider>
```

#### 引数

| プロパティ | 型 | 必須 | 説明 |
|------|------|------|------|
| `routes` | `Routes` | Yes | パスパターンとコンポーネントのマッピング |
| `notFoundComponent` | `React.ComponentType` | | 404 用コンポーネント（省略時は `<div>404</div>`） |

#### 戻り値

| プロパティ | 型 | 説明 |
|------|------|------|
| `RouterProvider` | `React.ComponentType<{ children: ReactNode }>` | Router Contextを提供するラッパー |
| `Router` | `React.ComponentType` | マッチしたルートを描画するコンポーネント |
| `paths` | `string[]` | 登録されたパスパターンの配列 |

---

### `useRouter`

現在のロケーション取得とナビゲーションを行う。

```tsx
import { useRouter } from "neouter";

const [location, setLocation] = useRouter();

// 現在のパスを取得
console.log(location); // "/user/123?tab=profile"

// ナビゲーション
setLocation("/about");
```

#### 戻り値

| 要素 | 型 | 説明 |
|------|------|------|
| `location` | `string` | 現在のパス（pathname + search） |
| `setLocation` | `(path: string) => void` | 指定パスへ遷移する関数（`pushState` を使用） |

---

### `usePathParams`

現在のルートからパスパラメータを取得する。

```tsx
import { usePathParams } from "neouter";

// ルート定義: "/user/:id/:tab"
// 現在のパス: "/user/123/profile"

const params = usePathParams<"/user/:id/:tab">();
// => { id: "123", tab: "profile" }
```

#### 戻り値

| 型 | 説明 |
|------|------|
| `ParamsObject<Path> \| null` | パスパラメータのオブジェクト。マッチしない場合は `null` |

型引数にパスパターンを渡すと、パラメータ名が型レベルで推論される。

---

### `useQueryParams`

クエリパラメータを取得する。

```tsx
import { useQueryParams } from "neouter";

// パス: "/search?q=neouter&page=2"

const params = useQueryParams({
  q: "string",
  page: "number",
});
// => { q: "neouter", page: 2 }
```

#### 引数

| 引数 | 型 | 必須 | 説明 |
|------|------|------|------|
| `expectedTypes` | `Record<string, 'string' \| 'number'>` | Yes | 期待するパラメータ名と型の定義 |
| `options` | `{ noThrowError?: boolean }` | | `noThrowError: true` で数値変換に失敗したときにエラーを起こさないようにできる |

#### 戻り値

| 型 | 説明 |
|------|------|
| `Partial<{ [K in keyof T]: ... }>` | パースされたクエリパラメータ。`'number'` 指定のキーは `number` 型、`'string'` 指定のキーは `string` 型 |

`expectedTypes` に含まれないクエリパラメータは無視される。

---

## ユーティリティ関数

### `redirect`

リダイレクト用のルートコンポーネントを生成する。

```tsx
import { redirect } from "neouter";

const routes = {
  "/old-path": { component: redirect("/new-path") },
  "/new-path": { component: NewPage },
};
```

| 引数 | 型 | 必須 | 説明 |
|------|------|------|------|
| `path` | `string` | Yes | リダイレクト先のパス |

**戻り値:** `React.ComponentType` - ルート定義に渡せるコンポーネント。

---

### `lazyImport`

名前付きエクスポートを遅延読み込みする。`React.lazy` のラッパー。

```tsx
import { lazyImport } from "neouter";

const { UserPage } = lazyImport(
  () => import("./pages/UserPage"),
  "UserPage"
);

const routes = {
  "/user/:id": { component: UserPage },
};
```

| 引数 | 型 | 必須 | 説明 |
|------|------|------|------|
| `factory` | `() => Promise<T>` | Yes | dynamic import を返す関数 |
| `name` | `U` | Yes | モジュールからエクスポートする名前 |

**戻り値:** `{ [name]: React.LazyComponent }` - `React.Suspense` と併用すること。

---

### `extractParams`

パスパターンと実際のパスからパラメータを抽出する。

```tsx
import { extractParams } from "neouter";

const params = extractParams("/user/:id/:tab", "/user/123/profile");
// => { id: "123", tab: "profile" }
```

| 引数 | 型 | 必須 | 説明 |
|------|------|------|------|
| `pathPattern` | `string` | Yes | `:param` を含むパスパターン |
| `actualPath` | `string` | Yes | 実際のパス |

**戻り値:** `Record<Params, string>` - パラメータ名をキー、パスの該当部分を値とするオブジェクト。

---

### `getMatchedPath`

ルート定義の中から現在のパスにマッチするパターンを返す。

```tsx
import { getMatchedPath } from "neouter";

const matched = getMatchedPath(routes, "/user/123");
// => "/user/:id"
```

| 引数 | 型 | 必須 | 説明 |
|------|------|------|------|
| `routes` | `Routes` | Yes | ルート定義オブジェクト |
| `path` | `string` | Yes | マッチ対象のパス（クエリ文字列含んでも可） |

**戻り値:** `string | null` - マッチしたパスパターン。マッチしない場合は `null`。

- 末尾スラッシュは自動で除去される
- クエリ文字列はマッチング前に除去される
- 正規表現はキャッシュされる

---

## 型定義

### `Routes`

```typescript
type Routes = Record<Path, Route>
```

ルート定義オブジェクト。キーがパスパターン、値が `Route`。

### `Route`

```typescript
type Route = {
  component: React.ComponentType
  options?: RouteOptions
}
```

### `Path`

```typescript
type Path = string
```

### `ParamsObject<Path>`

```typescript
type ParamsObject<Path extends string> = {
  [K in ExtractParams<Path>]?: string
}
```

パスパターンから型レベルでパラメータを抽出したオブジェクト型。

### `ExtractParams<Path>`

```typescript
type ExtractParams<Path extends string> = /* ... */
```

パス文字列からパラメータ名を再帰的に抽出するユーティリティ型。

```typescript
ExtractParams<"/user/:id/:tab"> // => "id" | "tab"
```

### `QueryParamsValueType`

```typescript
type QueryParamsValueType = "string" | "number"
```

### `WithQueryAndHash<Path>`

```typescript
type WithQueryAndHash<Path extends string> =
  | Path
  | `${Path}?${string}`
  | `${Path}#${string}`
```

パスにクエリ文字列やハッシュを付与可能にするユーティリティ型。

### `AssertPathType<R>`

```typescript
type AssertPathType<R extends string> = ReplaceParams<R>
```

パスパターン内の `:param` を `string` に置換した型を返すユーティリティ型。
