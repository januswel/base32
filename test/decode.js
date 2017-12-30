// @flow

import { describe, it } from 'kocha'
import assert from 'assert'
const AssertionError = assert.AssertionError

import decode from '../src/decode'

describe('decode', () => {
  it('throws when non Base32 string', () => {
    assert.throws(() => decode('abcdefgh'), AssertionError)
    assert.throws(() => decode('A4'), AssertionError)
  })
  it('decodes 8 chracters Base32 string to 10 digits hex string', () => {
    assert('1234567890' === decode('CI2FM6EQ'))
  })
  it('decodes 11 chracters Base32 string to 12 digits hex string', () => {
    assert('1234567890ab' === decode('CI2FM6EQVM======'))
  })
  it('decodes 12 chracters Base32 string to 14 digits hex string', () => {
    assert('1234567890abcd' === decode('CI2FM6EQVPGQ===='))
  })
  it('decodes 13 chracters Base32 string to 16 digits hex string', () => {
    assert('1234567890abcdef' === decode('CI2FM6EQVPG66==='))
  })
  it('decodes 15 chracters Base32 string to 18 digits hex string', () => {
    assert('1234567890abcdef12' === decode('CI2FM6EQVPG66EQ='))
  })
})
