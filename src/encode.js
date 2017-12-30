// @flow

import assert from 'assert'

const BIT_MASK = 0b11111
const mask = (n, digit) => (n & (BIT_MASK << digit)) >>> digit

/**
 * '9a': 8bit
 * '1b3a3390cb': 40bit
 * */
const CHUNK_SIZE = 10
const TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const ENCODING_UNIT = CHUNK_SIZE / 2
const PADDING_CHARACTER = '='

const encodeChunk = (chunk: HexString) => {
  const encoded = []
  const leftShiftWidth = (CHUNK_SIZE - chunk.length) * 4
  const numofPadded = Math.floor(leftShiftWidth / ENCODING_UNIT)
  const n = parseInt(chunk, 16) * Math.pow(2, leftShiftWidth)
  for (let i = 7; numofPadded <= i; --i) {
    const rightShiftWidth = i * ENCODING_UNIT
    let shifted = n
    for (let j = 0; j < rightShiftWidth; ++j) {
      shifted = Math.floor(shifted / 2)
    }
    encoded.push(TABLE[shifted & BIT_MASK])
  }
  for (let i = 0; i < numofPadded; ++i) {
    encoded.push(PADDING_CHARACTER)
  }
  return encoded.join('')
}

const encode = (src: HexString): Base32String => {
  assert(
    src.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(src),
    'src must be a hex string',
  )

  const numofChunks = Math.ceil(src.length / CHUNK_SIZE)
  const fractions = src.length % CHUNK_SIZE
  const numofCharactersLast = fractions === 0 ? CHUNK_SIZE : fractions

  const encoded = []
  for (let i = 0; i < numofChunks; ++i) {
    const start = i * CHUNK_SIZE
    const chunk = src.slice(
      start,
      i === numofChunks - 1 ? start + numofCharactersLast : start + CHUNK_SIZE,
    )

    encoded.push(encodeChunk(chunk))
  }
  return encoded.join('')
}

export default encode
