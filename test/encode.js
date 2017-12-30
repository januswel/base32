// @flow

import { describe, it } from 'kocha'
import assert from 'assert'
const AssertionError = assert.AssertionError

import encode from '../src/encode'

describe('encode', () => {
  it('throws when non hex string', () => {
    assert.throws(() => encode('td'), AssertionError)
    assert.throws(() => encode('4ac'), AssertionError)
  })
  it('encodes 10 digits hex string to 8 chracters Base32 string', () => {
    assert('CI2FM6EQ' === encode('1234567890'))
  })
  it('encodes 12 digits hex string to 16 chracters Base32 string', () => {
    assert('CI2FM6EQVM======' === encode('1234567890ab'))
  })
  it('encodes 14 digits hex string to 16 chracters Base32 string', () => {
    assert('CI2FM6EQVPGQ====' === encode('1234567890abcd'))
  })
  it('encodes 16 digits hex string to 16 chracters Base32 string', () => {
    assert('CI2FM6EQVPG66===' === encode('1234567890abcdef'))
  })
  it('encodes 18 digits hex string to 16 chracters Base32 string', () => {
    assert('CI2FM6EQVPG66EQ=' === encode('1234567890abcdef12'))
  })
})