// biome-ignore lint/suspicious/noEmptyInterface: TODO
export interface Register {}

type RegisteredRoutes = Register extends { pathPatterns: infer R } ? R : string

type PathPattern = RegisteredRoutes

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

type Routes = Record<PathPattern, Route>

type ExtractParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never

type ParamsObject<Path extends string> = {
  [K in ExtractParams<Path>]: string
}

type QueryParamsValueType = 'string' | 'number'

type WithQueryAndHash<Path extends string> =
  | Path
  | `${Path}?${string}`
  | `${Path}#${string}`

type PathChar =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '-'
  | '_'
  | '%'

type ReplaceParams<Path extends string> =
  Path extends `${infer Start}:${string}/${infer Rest}`
    ? `${Start}${PathChar}${string}/${ReplaceParams<Rest>}`
    : Path extends `${infer Start}:${string}`
      ? `${Start}${PathChar}${string}`
      : Path

type AssertPathType<R extends string> = ReplaceParams<R>

type Path = WithQueryAndHash<AssertPathType<PathPattern>>

export type {
  Routes,
  Path,
  PathPattern,
  ParamsObject,
  ExtractParams,
  QueryParamsValueType,
  AssertPathType,
  WithQueryAndHash,
}
