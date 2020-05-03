import { assert } from './assert'

export function shiftLeft(n: number, digits: number) {
  assert(digits < 64, 'digits must be less than 64')
  return n * Math.pow(2, digits)
}

export function shiftRight(n: number, digits: number) {
  assert(digits < 64, 'digits must be less than 64')
  let shifted = n
  for (let i = 0; i < digits; ++i) {
    shifted = Math.floor(shifted / 2)
  }
  return shifted
}
