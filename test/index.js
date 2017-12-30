// @flow

import { describe, it } from 'kocha'
import assert from 'assert'
const AssertionError = assert.AssertionError

import { encode, decode } from '../src'

describe('decode', () => {
  it('decodes Base32 string to hex string', () => {
    assert('1234567890abcdef' === decode('GEZDGNBVGY3TQOJQMFRGGZDFMY======'))
  })
})
