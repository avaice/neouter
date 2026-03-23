# neouter

neouter($/njuːtər/$, ニョーター) is type-safe router for minimalists!

## Installation

```bash
npm i neouter
```

## Usage

See the [API Reference](./API.md) for details.

### Defining Routes

```tsx
import { useCreateRoutes } from "neouter";

const routes = {
  "/": {
    component: () => <div>Hello!</div>,
  },
  "/about": {
    component: () => <div>About</div>,
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

### Link

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

#### Creating a Type-Safe Link

Combine `BaseLink` with type utilities to create a `Link` component that only accepts registered routes for `href`.

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

`AssertPathType` replaces `:param` segments in the path with `string`, and `WithQueryAndHash` allows appending query strings and hashes.

```tsx
<Link href="/about" />            // OK
<Link href="/about?tab=1" />      // OK
<Link href="/users/123" />        // OK
<Link href="/nonexistent" />      // NG
```



### Title
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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
