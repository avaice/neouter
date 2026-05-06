/*
 * Test for normalizePathname function
 *
 * Tests:
 * 1. normalizePathname should return the path as-is when no normalization is needed
 * 2. Should remove trailing slashes
 * 3. Should preserve the root path
 * 4. Should remove query strings
 * 5. Should remove trailing slashes together with query strings
 * 6. Should return null for empty paths
 */

import { expect, test } from '@rstest/core'
import { normalizePathname } from './normalizePathname'

test('normalizePathname should return the path as-is when no normalization is needed', () => {
  const result = normalizePathname('/about')

  expect(result).toBe('/about')
})

test('normalizePathname should remove a trailing slash', () => {
  const result = normalizePathname('/about/')

  expect(result).toBe('/about')
})

test('normalizePathname should preserve the root path', () => {
  const result = normalizePathname('/')

  expect(result).toBe('/')
})

test('normalizePathname should remove the query string', () => {
  const result = normalizePathname('/user/123?tab=profile&sort=name')

  expect(result).toBe('/user/123')
})

test('normalizePathname should remove a trailing slash together with the query string', () => {
  const result = normalizePathname('/about/?page=1')

  expect(result).toBe('/about')
})

test('normalizePathname should return null for an empty path string', () => {
  const result = normalizePathname('')

  expect(result).toBeNull()
})
