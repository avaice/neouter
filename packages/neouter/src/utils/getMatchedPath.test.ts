/*
 * Test for getMatchedPath function
 *
 * Tests:
 * 1. getMatchedPath should match exact routes
 * 2. Should match routes with path parameters
 * 3. Should remove trailing slashes before matching
 * 4. Should handle query strings by removing them
 * 5. Should return null for non-matching paths
 * 6. Should return null for empty paths
 */

import { expect, test } from '@rstest/core'
import type { Routes } from '..'
import { getMatchedPath } from './getMatchedPath'

test('getMatchedPath should match an exact root path', () => {
  const routes = {
    '/': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/')

  expect(result).toBe('/')
})

test('getMatchedPath should match an exact non-root path', () => {
  const routes: Routes = {
    '/about': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/about')

  expect(result).toBe('/about')
})

test('getMatchedPath should match paths with a single parameter', () => {
  const routes: Routes = {
    '/user/:id': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/user/123')

  expect(result).toBe('/user/:id')
})

test('getMatchedPath should match paths with multiple parameters', () => {
  const routes: Routes = {
    '/user/:id/post/:postId': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/user/456/post/789')

  expect(result).toBe('/user/:id/post/:postId')
})

test('getMatchedPath should match nested paths without parameters', () => {
  const routes: Routes = {
    '/admin/dashboard': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/admin/dashboard')

  expect(result).toBe('/admin/dashboard')
})

test('getMatchedPath should remove trailing slashes before matching', () => {
  const routes: Routes = {
    '/about': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/about/')

  expect(result).toBe('/about')
})

test('getMatchedPath should handle paths with query strings by ignoring them', () => {
  const routes: Routes = {
    '/user/:id': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/user/123?tab=profile&sort=name')

  expect(result).toBe('/user/:id')
})

test('getMatchedPath should remove trailing slash with query string', () => {
  const routes: Routes = {
    '/about': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/about/?page=1')

  expect(result).toBe('/about')
})

test('getMatchedPath should return null for non-matching paths', () => {
  const routes: Routes = {
    '/about': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/nonexistent')

  expect(result).toBeNull()
})

test('getMatchedPath should return null for empty path string', () => {
  const routes: Routes = {
    '/': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '')

  expect(result).toBeNull()
})

test('getMatchedPath should return null for paths that do not match any route', () => {
  const routes: Routes = {
    '/user/:id': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/users/list')

  expect(result).toBeNull()
})

test('getMatchedPath should prioritize longer matches when multiple patterns could match', () => {
  const routes: Routes = {
    '/user/:id': { component: () => null },
    '/user/:id/post': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/user/123/post')

  expect(result).toBe('/user/:id/post')
})

test('getMatchedPath should preserve the original path pattern in the returned value', () => {
  const routes: Routes = {
    '/user/:id': { component: () => null },
  } as Routes

  const result = getMatchedPath(routes, '/user/john')

  expect(result).toContain(':id')
})
