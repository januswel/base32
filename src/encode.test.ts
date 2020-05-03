import { encode } from './encode'

describe('encode', () => {
  it('throws when non hex string', () => {
    expect(() => {
      encode('td')
    }).toThrow()
    expect(() => {
      encode('4ac')
    }).toThrow()
  })

  it('encodes 10 digits hex string to 8 chracters Base32 string', () => {
    expect(encode('1234567890')).toBe('CI2FM6EQ')
  })
  it('encodes 12 digits hex string to 16 chracters Base32 string', () => {
    expect(encode('1234567890ab')).toBe('CI2FM6EQVM======')
  })
  it('encodes 14 digits hex string to 16 chracters Base32 string', () => {
    expect(encode('1234567890abcd')).toBe('CI2FM6EQVPGQ====')
  })
  it('encodes 16 digits hex string to 16 chracters Base32 string', () => {
    expect(encode('1234567890abcdef')).toBe('CI2FM6EQVPG66===')
  })
  it('encodes 18 digits hex string to 16 chracters Base32 string', () => {
    expect(encode('1234567890abcdef12')).toBe('CI2FM6EQVPG66EQ=')
  })
})
