/*
 * Test for getMatchedPath function
 *
 * Tests:
 * 1. Should match exact routes
 * 2. Should match routes with single / multiple path parameters
 * 3. Should match parameters containing any non-slash URL characters
 *    (hyphens, dots, percent-encoded, multibyte, sub-delims, etc.)
 * 4. Should return null for non-matching paths
 * 5. Should pick the route whose pattern actually matches the path
 *
 * Note: pathname normalization (trailing slash / query string / empty path)
 * is the responsibility of normalizePathname and is covered by its own tests.
 */

import { expect, test } from '@rstest/core'
import type { Routes } from '..'
import { getMatchedPath } from './getMatchedPath'

test('getMatchedPath should match an exact root path', () => {
  const routes = {
    '/': { component: () => null },
  } as const

  const result = getMatchedPath(routes, '/')

  expect(result).toBe('/')
})

test('getMatchedPath should match an exact non-root path', () => {
  const routes: Routes = {
    '/about': { component: () => null },
  } as const

  const result = getMatchedPath(routes, '/about')

  expect(result).toBe('/about')
})

test('getMatchedPath should match paths with a single parameter', () => {
  const routes: Routes = {
    '/user/:id': { component: () => null },
  } as const

  const result = getMatchedPath(routes, '/user/123')

  expect(result).toBe('/user/:id')
})

test('getMatchedPath should match paths with multiple parameters', () => {
  const routes: Routes = {
    '/user/:id/post/:postId': { component: () => null },
  } as const

  const result = getMatchedPath(routes, '/user/456/post/789')

  expect(result).toBe('/user/:id/post/:postId')
})

test('getMatchedPath should match parameters containing any non-slash URL characters', () => {
  const routes: Routes = {
    '/post/:slug': { component: () => null },
  } as const

  const cases = [
    '/post/hello-world',
    '/post/report.v2.pdf',
    '/post/%E3%81%82%E3%81%84',
    '/post/日本語',
    '/post/a+b,c(d)~e@f',
  ]

  for (const path of cases) {
    expect(getMatchedPath(routes, path)).toBe('/post/:slug')
  }
})

test('getMatchedPath should not let a parameter span multiple segments', () => {
  const routes: Routes = {
    '/post/:slug': { component: () => null },
  } as const

  const result = getMatchedPath(routes, '/post/foo/bar')

  expect(result).toBeNull()
})

test('getMatchedPath should return null for non-matching paths', () => {
  const routes: Routes = {
    '/about': { component: () => null },
  } as const

  const result = getMatchedPath(routes, '/nonexistent')

  expect(result).toBeNull()
})

test('getMatchedPath should pick the route whose pattern actually matches the path', () => {
  const routes: Routes = {
    '/user/:id': { component: () => null },
    '/user/:id/post': { component: () => null },
  } as const

  const result = getMatchedPath(routes, '/user/123/post')

  expect(result).toBe('/user/:id/post')
})
