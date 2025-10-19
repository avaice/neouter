type Path = string

enum PreloadType {
  hover,
  view,
  off,
}

type RouteOptions = {
  preload?: PreloadType
}

type Route = {
  component: React.ComponentType
  options?: RouteOptions
}

type Routes = Record<Path, Route>

export type { Routes }
