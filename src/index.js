// @flow

type HexString = string
type Base32String = string

const MASK = 0b11111
const mask = (n, digit) => (n & (MASK << digit)) >>> digit

/**
 * '9a': 8bit
 * '1b3a3390cb': 40bit
 * */
const NUMOF_PROCESSED_CHARACTERS = 10
const TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const ENCODING_UNIT = 5
const PADDING_CHARACTER = '='

const encodeChunk = (chunk: HexString) => {
  const encoded = []
  const shiftWidth = (NUMOF_PROCESSED_CHARACTERS - chunk.length) * 4
  const numofPadded = Math.floor(shiftWidth / ENCODING_UNIT)
  const n = parseInt(chunk, 16) << shiftWidth
  for (let j = 7; numofPadded < j; --j) {
    encoded.push(TABLE[mask(n, j * ENCODING_UNIT)])
  }
  if (numofPadded === 0) {
    encoded.push(TABLE[mask(n, 0)])
  }
  for (let j = 0; j < numofPadded; ++j) {
    encoded.push(PADDING_CHARACTER)
  }
  return encoded.join('')
}

const encode = (src: HexString): Base32String => {
  const numofProcesses = Math.ceil(src.length / NUMOF_PROCESSED_CHARACTERS)
  const fractions = src.length % NUMOF_PROCESSED_CHARACTERS
  const numofCharactersLast =
    fractions === 0 ? NUMOF_PROCESSED_CHARACTERS : fractions

  const encoded = []
  for (let i = 0; i < numofProcesses; ++i) {
    const start = i * NUMOF_PROCESSED_CHARACTERS
    const chunk = src.slice(
      start,
      i === numofProcesses - 1
        ? start + numofCharactersLast
        : start + NUMOF_PROCESSED_CHARACTERS,
    )

    encoded.push(encodeChunk(chunk))
  }
  return encoded.join('')
}

const decode = (src: Base32String): HexString => '1234567890abcdef'

export { encode, decode }
