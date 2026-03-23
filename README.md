Language: EN / [JA](./README.ja.md)

# neouter

neouter($/njuːtər/$, ニョーター) is type-assisted router for minimalists!

## Installation

```bash
npm i neouter
```

## Usage

See the [API Reference](./API.md) for details.

### Defining Routes

```tsx
import { useCreateRoutes } from "neouter";

type PathPatterns =
  | '/'
  | '/about'

const routes: Record<PathPatterns, { component: () => JSX.Element }> = {
  "/": {
    component: () => <div>Hello!</div>,
  },
  "/about": {
    component: () => <div>About</div>,
  },
};

declare module 'neouter' {
  interface Register {
    pathPatterns: PathPatterns
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
