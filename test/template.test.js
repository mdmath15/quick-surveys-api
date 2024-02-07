import { it, expect, describe } from '@jest/globals'

function sum(a, b) {
  return a + b
}

describe('Sum Suit', () => {
  it('sums two values', () => {
    expect(sum(1, 2)).toBe(3) 
  })
})
