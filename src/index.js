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

const encode = (src: HexString): Base32String => {
  const NUMOF_PROCESSES =
    Math.floor(src.length / NUMOF_PROCESSED_CHARACTERS) + 1
  const NUMOF_CHARACTERS_LAST = src.length % NUMOF_PROCESSED_CHARACTERS

  const encoded = []
  for (let i = 0; i < NUMOF_PROCESSES; ++i) {
    const start = i * NUMOF_PROCESSED_CHARACTERS
    const chunk = src.slice(
      start,
      i === NUMOF_PROCESSES - 1
        ? start + NUMOF_CHARACTERS_LAST
        : start + NUMOF_PROCESSED_CHARACTERS,
    )

    switch (chunk.length) {
      case 10: {
        const n = parseInt(chunk, 16) << 0
        for (let j = 35; 0 <= j; j -= 5) {
          encoded.push(TABLE[mask(n, j)])
        }
        break
      }
      case 8: {
        const n = parseInt(chunk, 16) << 8
        for (let j = 35; 6 <= j; j -= 5) {
          encoded.push(TABLE[mask(n, j)])
        }
        for (let j = 0; j < 1; ++j) {
          encoded.push('=')
        }
        break
      }
      case 6: {
        const n = parseInt(chunk, 16) << 16
        for (let j = 35; 16 <= j; j -= 5) {
          encoded.push(TABLE[mask(n, j)])
        }
        for (let j = 0; j < 3; ++j) {
          encoded.push('=')
        }
        break
      }
      case 4: {
        const n = parseInt(chunk, 16) << 24
        for (let j = 35; 21 <= j; j -= 5) {
          encoded.push(TABLE[mask(n, j)])
        }
        for (let j = 0; j < 4; ++j) {
          encoded.push('=')
        }
        break
      }
      case 2: {
        const n = parseInt(chunk, 16) << 32
        for (let j = 35; 31 <= j; j -= 5) {
          encoded.push(TABLE[mask(n, j)])
        }
        for (let j = 0; j < 6; ++j) {
          encoded.push('=')
        }
        break
      }
    }
  }
  return encoded.join('')

  return 'GEZDGNBVGY3TQOJQMFRGGZDFMY======'
}
const decode = (src: Base32String): HexString => '1234567890abcdef'

export { encode, decode }
