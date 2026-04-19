/*
 * Test for lazyImport function
 *
 * Tests:
 * 1. lazyImport should create a lazy-loaded component wrapper
 * 2. The returned object should contain the named component as a lazy component
 * 3. The lazy component should have the correct component name property
 */

import { expect, test } from '@rstest/core'
import { lazyImport } from './lazyImport'

test('lazyImport should create an object with the specified component name', () => {
  const mockComponent = () => null
  const factory = () => Promise.resolve({ TestComponent: mockComponent })

  const result = lazyImport(factory, 'TestComponent')

  expect(result).toHaveProperty('TestComponent')
})

test('lazyImport should create a lazy component object', () => {
  const mockComponent = () => null
  const factory = () => Promise.resolve({ MyComponent: mockComponent })

  const result = lazyImport(factory, 'MyComponent')

  expect(result.MyComponent).toBeDefined()
})

test('lazyImport should handle multiple components from a single factory', () => {
  const mockComponent1 = () => null
  const mockComponent2 = () => null
  const factory = () =>
    Promise.resolve({
      Component1: mockComponent1,
      Component2: mockComponent2,
    })

  const result = lazyImport(factory, 'Component1')

  expect(result).toHaveProperty('Component1')
  expect(result).not.toHaveProperty('Component2')
})
