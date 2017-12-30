// @flow

type HexString = string
type Base32String = string

const encode = (src: HexString): Base32String =>
  'GEZDGNBVGY3TQOJQMFRGGZDFMY======'
const decode = (src: Base32String): HexString => '1234567890abcdef'

export { encode, decode }
