import { shiftLeft, shiftRight } from './bit-shift'

describe('shiftLeft', () => {
  it('throws when digits is larger or equal than 64', () => {
    expect(() => {
      shiftLeft(1, 100)
    }).toThrow()
  })
  it('returns left shifted numbers', () => {
    expect(shiftLeft(1, 1)).toBe(2)
    expect(shiftLeft(1, 2)).toBe(4)
    expect(shiftLeft(43, 17)).toBe(5636096)
  })
})

describe('shiftRight', () => {
  it('throws when digits is larger or equal than 64', () => {
    expect(() => {
      shiftRight(1, 100)
    }).toThrow()
  })
  it('returns right shifted numbers', () => {
    expect(shiftRight(1, 1)).toBe(0)
    expect(shiftRight(2, 1)).toBe(1)
    expect(shiftRight(38539203, 8)).toBe(150543)
  })
})
