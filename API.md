# neouter API reference

## Components

### `Link`

A link component for client-side navigation.

```tsx
import { Link } from "neouter";

<Link href="/about" className="link">
  About
</Link>;
```

| Prop       | Type                  | Required | Description              |
| ---------- | --------------------- | -------- | ------------------------ |
| `href`     | `Path`                | Yes      | Destination path         |
| `children` | `ReactNode`           |          | Link content             |
| `...props` | `ComponentProps<'a'>` |          | All `<a>` tag attributes |

- Preserves Ctrl+Click / Cmd+Click behavior to open in a new tab
- If `onClick` is provided, it is called before navigation
- Navigation is skipped if `e.preventDefault()` has been called

---

### `Title`

A component that changes the document title. Restores the original title on unmount.

```tsx
import { Title } from "neouter";

<Title>Page Title</Title>;
```

| Prop       | Type     | Required | Description |
| ---------- | -------- | -------- | ----------- |
| `children` | `string` | Yes      | Title       |

---

## Hooks

### `useCreateRoutes`

Sets up routing. Returns `RouterProvider` and `Router`.

```tsx
import { useCreateRoutes } from "neouter";

const { RouterProvider, Router, paths } = useCreateRoutes({
  routes: {
    "/": { component: HomePage },
    "/user/:id": { component: UserPage },
  },
  notFoundComponent: NotFoundPage,
});

// Usage
<RouterProvider>
  <Header />
  <Router />
  <Footer />
</RouterProvider>;
```

#### Parameters

| Property            | Type                  | Required | Description                                            |
| ------------------- | --------------------- | -------- | ------------------------------------------------------ |
| `routes`            | `Routes`              | Yes      | Mapping of path patterns to components                 |
| `notFoundComponent` | `React.ComponentType` |          | Component for 404 pages (defaults to `<div>404</div>`) |

#### Return value

| Property         | Type                                           | Description                              |
| ---------------- | ---------------------------------------------- | ---------------------------------------- |
| `RouterProvider` | `React.ComponentType<{ children: ReactNode }>` | Wrapper that provides the Router Context |
| `Router`         | `React.ComponentType`                          | Component that renders the matched route |
| `paths`          | `string[]`                                     | Array of registered path patterns        |

---

### `useRouter`

Gets the current location and provides navigation.

```tsx
import { useRouter } from "neouter";

const [location, setLocation] = useRouter();

// Get current path
console.log(location); // "/user/123?tab=profile"

// Navigate
setLocation("/about");
```

#### Return value

| Element       | Type                   | Description                                                   |
| ------------- | ---------------------- | ------------------------------------------------------------- |
| `location`    | `Path`                 | Current path (pathname + search)                              |
| `setLocation` | `(path: Path) => void` | Function to navigate to the specified path (uses `pushState`) |

---

### `usePathParams`

Gets path parameters from the current route.

```tsx
import { usePathParams } from "neouter";

// Route definition: "/user/:id/:tab"
// Current path: "/user/123/profile"

const params = usePathParams("/user/:id/:tab");
// => { id: "123", tab: "profile" }
```

#### Parameters

| Argument | Type     | Required | Description                   |
| -------- | -------- | -------- | ----------------------------- |
| `path`   | `string` | Yes      | Path pattern to match against |

#### Return value

| Type                         | Description                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `ParamsObject<Path> \| null` | Path parameters object. Returns `null` if current path doesn't match the specified pattern |

The path pattern enables type-level inference of parameter names.

---

### `useQueryParams`

Gets query parameters.

```tsx
import { useQueryParams } from "neouter";

// Path: "/search?q=neouter&page=2"

const params = useQueryParams({
  q: "string",
  page: "number",
});
// => { q: "neouter", page: 2 }
```

#### Parameters

| Argument        | Type                                   | Required | Description                                                          |
| --------------- | -------------------------------------- | -------- | -------------------------------------------------------------------- |
| `expectedTypes` | `Record<string, 'string' \| 'number'>` | Yes      | Definition of expected parameter names and their types               |
| `options`       | `{ noThrowError?: boolean }`           |          | `noThrowError: true` suppresses errors when numeric conversion fails |

#### Return value

| Type                               | Description                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `Partial<{ [K in keyof T]: ... }>` | Parsed query parameters. Keys specified as `'number'` are typed as `number`, keys specified as `'string'` are typed as `string` |

Query parameters not included in `expectedTypes` are ignored.

---

## Utility functions

### `redirect`

Generates a route component for redirects.

```tsx
import { redirect } from "neouter";

const routes = {
  "/old-path": { component: redirect("/new-path") },
  "/new-path": { component: NewPage },
};
```

| Argument | Type     | Required | Description               |
| -------- | -------- | -------- | ------------------------- |
| `path`   | `string` | Yes      | Redirect destination path |

**Return value:** `React.ComponentType` — A component that can be passed to a route definition.

---

### `lazyImport`

Lazily loads a named export. A wrapper around `React.lazy`.

```tsx
import { lazyImport } from "neouter";

const { UserPage } = lazyImport(() => import("./pages/UserPage"), "UserPage");

const routes = {
  "/user/:id": { component: UserPage },
};
```

| Argument  | Type               | Required | Description                            |
| --------- | ------------------ | -------- | -------------------------------------- |
| `factory` | `() => Promise<T>` | Yes      | Function that returns a dynamic import |
| `name`    | `U`                | Yes      | Name of the export from the module     |

**Return value:** `{ [name]: React.LazyComponent }` — Use with `React.Suspense`.

---

### `extractParams`

Extracts parameters from a path pattern and an actual path.

```tsx
import { extractParams } from "neouter";

const params = extractParams("/user/:id/:tab", "/user/123/profile");
// => { id: "123", tab: "profile" }
```

| Argument      | Type     | Required | Description                               |
| ------------- | -------- | -------- | ----------------------------------------- |
| `pathPattern` | `string` | Yes      | Path pattern containing `:param` segments |
| `actualPath`  | `string` | Yes      | Actual path                               |

**Return value:** `Record<Params, string>` — An object with parameter names as keys and matched path segments as values.

---

### `getMatchedPath`

Returns the matching pattern from route definitions for the current path.

```tsx
import { getMatchedPath } from "neouter";

const matched = getMatchedPath(routes, "/user/123");
// => "/user/:id"
```

| Argument | Type     | Required | Description                                       |
| -------- | -------- | -------- | ------------------------------------------------- |
| `routes` | `Routes` | Yes      | Route definition object                           |
| `path`   | `string` | Yes      | Path to match against (may include query strings) |

**Return value:** `string | null` — The matched path pattern, or `null` if no match.

- Trailing slashes are automatically removed
- Query strings are stripped before matching
- Regular expressions are cached

---

## Type definitions

### `Routes`

```typescript
type Routes = Record<Path, Route>;
```

Route definition object. Keys are path patterns, values are `Route`.

### `Route`

```typescript
type Route = {
  component: React.ComponentType;
  options?: RouteOptions;
};
```

### `Path`

```typescript
type Path = string;
```

### `ParamsObject<Path>`

```typescript
type ParamsObject<Path extends string> = {
  [K in ExtractParams<Path>]: string;
};
```

An object type with parameters extracted at the type level from a path pattern.

### `ExtractParams<Path>`

```typescript
type ExtractParams<Path extends string> = /* ... */
```

A utility type that recursively extracts parameter names from a path string.

```typescript
ExtractParams<"/user/:id/:tab">; // => "id" | "tab"
```

### `QueryParamsValueType`

```typescript
type QueryParamsValueType = "string" | "number";
```

### `WithQueryAndHash<Path>`

```typescript
type WithQueryAndHash<Path extends string> =
  | Path
  | `${Path}?${string}`
  | `${Path}#${string}`;
```

A utility type that allows appending query strings or hashes to a path.

### `AssertPathType<R>`

```typescript
type AssertPathType<R extends string> = ReplaceParams<R>;
```

A utility type that replaces `:param` segments in a path pattern with `string`.
