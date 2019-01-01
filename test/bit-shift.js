// @flow

import assert from 'assert'
const AssertionError = assert.AssertionError

import { shiftLeft, shiftRight } from '../src/bit-shift'

describe('shiftLeft', () => {
  it('throws when digits is larger or equal than 64', () => {
    assert.throws(() => shiftLeft(1, 100), AssertionError)
  })
  it('returns left shifted numbers', () => {
    assert(2 === shiftLeft(1, 1))
    assert(4 === shiftLeft(1, 2))
    assert(5636096 === shiftLeft(43, 17))
  })
})

describe('shiftRight', () => {
  it('throws when digits is larger or equal than 64', () => {
    assert.throws(() => shiftRight(1, 100), AssertionError)
  })
  it('returns right shifted numbers', () => {
    assert(0 === shiftRight(1, 1))
    assert(1 === shiftRight(2, 1))
    assert(150543 === shiftRight(38539203, 8))
  })
})
