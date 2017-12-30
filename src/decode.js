// @flow

import assert from 'assert'
import { shiftLeft, shiftRight } from './bit-shift'
import type { HexString, Base32String } from './types.flow.js'

const CHUNK_SIZE = 8
const TABLE = (() => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('')
  const table = {}
  characters.forEach((character, index) => {
    table[character] = index
  })
  return table
})()
const PADDING_CHARACTER = '='

const decodeChunk = (chunk: Base32String) => {
  let numofPaddingCharacters = 0
  const n = chunk.split('').reduce((sum, character, index) => {
    if (character === PADDING_CHARACTER) {
      ++numofPaddingCharacters
      return sum
    }
    const current = TABLE[character]
    sum += shiftLeft(current, (7 - index) * 5)
    return sum
  }, 0)

  /**
   * bit  | number of padding characters
   * -----|-----------------------------
   *  8   | 6
   * 16   | 4
   * 24   | 3
   * 32   | 1
   * */
  const digits = Math.floor((40 - numofPaddingCharacters * 5) / 8)
  return n.toString(16).slice(0, digits * 2)
}

const decode = (src: Base32String): HexString => {
  assert(
    src.length % 8 === 0 && /^[2-7A-Z]+=*$/.test(src),
    'src must be a Base32 string',
  )

  const numofChunks = src.length / CHUNK_SIZE

  const decoded = []
  for (let i = 0; i < numofChunks; ++i) {
    const start = i * CHUNK_SIZE
    const chunk = src.slice(start, start + CHUNK_SIZE)

    decoded.push(decodeChunk(chunk))
  }
  return decoded.join('')
}
export default decode
