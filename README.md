# neouter

A type-safe router for minimalists! (になる予定)

**This project is still under development and may be unstable. PLEASE DO NOT USE IT IN PRODUCTION ENVIRONMENTS!!**

## Installation

```bash
npm i neouter
```

## Usage

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
  const { Router } = useCreateRoutes({ routes });
  return <Router />;
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

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
