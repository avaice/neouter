Language: EN / [JA](./README.ja.md)

# neouter

neouter($/njuːtər/$, ニョーター) is type-assisted router for minimalists!

Supports baseline browsers in 2026 (Chrome 123+, Firefox 147+, Safari 26.2+)
In earlier browsers, it works as hard navigation.

## Installation

```bash
npm i neouter
```

## Usage

See the [API Reference](./API.md) for details.

### Defining Routes

```tsx
import { useCreateRoutes } from "neouter";

type PathPatterns = "/" | "/about";

const routes: Record<PathPatterns, { component: () => JSX.Element }> = {
  "/": {
    component: () => <div>Hello!</div>,
  },
  "/about": {
    component: () => <div>About</div>,
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

### Title

You can use native the `<title>` tag anywhere in React.
https://react.dev/reference/react-dom/components/title

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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
