/*
 * Test for extractParams function
 *
 * Tests:
 * 1. extractParams should extract parameters from a path pattern and actual path
 * 2. Parameters should be correctly identified and mapped to their values
 * 3. Multiple parameters in a single path should be extracted
 * 4. Should throw an error when a required parameter value is missing
 * 5. Should handle paths without any parameters
 */

import { expect, test } from '@rstest/core'
import { extractParams } from './extractParams'

test('extractParams should extract a single parameter from a path', () => {
  const result = extractParams('/user/:id', '/user/123')

  expect(result).toEqual({ id: '123' })
})

test('extractParams should extract multiple parameters from a path', () => {
  const result = extractParams('/user/:id/post/:postId', '/user/123/post/456')

  expect(result).toEqual({ id: '123', postId: '456' })
})

test('extractParams should extract parameters with various names', () => {
  const result = extractParams('/organization/:orgId/team/:teamName', '/organization/acme/team/engineers')

  expect(result).toEqual({ orgId: 'acme', teamName: 'engineers' })
})

test('extractParams should return an empty object when there are no parameters', () => {
  const result = extractParams('/about/contact', '/about/contact')

  expect(result).toEqual({})
})

test('extractParams should handle alphanumeric parameter values', () => {
  const result = extractParams('/item/:itemId', '/item/abc123def')

  expect(result).toEqual({ itemId: 'abc123def' })
})

test('extractParams should throw an error when a parameter value is missing', () => {
  expect(() => {
    extractParams('/user/:id/post/:postId', '/user/123')
  }).toThrow('value is nullish')
})

test('extractParams should throw an error when attempting to extract from an incomplete path', () => {
  expect(() => {
    extractParams('/a/:x/b/:y/c/:z', '/a/1/b/2')
  }).toThrow('value is nullish')
})
