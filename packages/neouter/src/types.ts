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

type ExtractParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never

type ParamsObject<Path extends string> = {
  [K in ExtractParams<Path>]?: string
}

type QueryParamsValueType = 'string' | 'number'

export type { Routes, Path, ParamsObject, ExtractParams, QueryParamsValueType }
