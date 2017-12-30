// @flow

import { describe, it } from 'kocha'
import assert from 'assert'

import { encode, decode } from '../src'

describe('encode', () => {
  it('encodes hex string to Base32 string', () => {
    assert('SA2FM6EQ' === encode('1234567890'))
  })
  it('encodes hex string to Base32 string', () => {
    assert('SA2FM6EQADG6===' === encode('1234567890abcdef'))
  })
})

describe('decode', () => {
  it('decodes Base32 string to hex string', () => {
    assert('1234567890abcdef' === decode('GEZDGNBVGY3TQOJQMFRGGZDFMY======'))
  })
})
