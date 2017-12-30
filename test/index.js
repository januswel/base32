// @flow

import { describe, it } from 'kocha'
import assert from 'assert'

import { encode, decode } from '../src'

describe('encode', () => {
  it('encodes hex string to Base32 string', () => {
    assert('GEZDGNBVGY3TQOJQMFRGGZDFMY======' === encode('1234567890abcdef'))
  })
})

describe('decode', () => {
  it('decodes Base32 string to hex string', () => {
    assert('1234567890abcdef' === decode('GEZDGNBVGY3TQOJQMFRGGZDFMY======'))
  })
})
