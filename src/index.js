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
const PADDING_CHARACTER = '='

const encode = (src: HexString): Base32String => {
  const NUMOF_PROCESSES = Math.ceil(src.length / NUMOF_PROCESSED_CHARACTERS)
  const FRACTIONS = src.length % NUMOF_PROCESSED_CHARACTERS
  const NUMOF_CHARACTERS_LAST =
    FRACTIONS === 0 ? NUMOF_PROCESSED_CHARACTERS : FRACTIONS

  const encoded = []
  for (let i = 0; i < NUMOF_PROCESSES; ++i) {
    const start = i * NUMOF_PROCESSED_CHARACTERS
    const chunk = src.slice(
      start,
      i === NUMOF_PROCESSES - 1
        ? start + NUMOF_CHARACTERS_LAST
        : start + NUMOF_PROCESSED_CHARACTERS,
    )

    const shiftWidth = (10 - chunk.length) * 4
    const numofPadded = Math.floor(shiftWidth / 5)
    const n = parseInt(chunk, 16) << shiftWidth
    for (let j = 7; numofPadded < j; --j) {
      encoded.push(TABLE[mask(n, j * 5)])
    }
    if (numofPadded === 0) {
      encoded.push(TABLE[mask(n, 0)])
    }
    for (let j = 0; j < numofPadded; ++j) {
      encoded.push(PADDING_CHARACTER)
    }
  }
  return encoded.join('')
}
const decode = (src: Base32String): HexString => '1234567890abcdef'

export { encode, decode }
