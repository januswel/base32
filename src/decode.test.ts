import { decode } from './decode'

describe('decode', () => {
  it('throws when non Base32 string', () => {
    expect(() => {
      decode('abcdefgh')
    }).toThrow()
    expect(() => {
      decode('A4')
    }).toThrow()
  })

  it('decodes 8 chracters Base32 string to 10 digits hex string', () => {
    expect(decode('CI2FM6EQ')).toBe('1234567890')
  })
  it('decodes 11 chracters Base32 string to 12 digits hex string', () => {
    expect(decode('CI2FM6EQVM======')).toBe('1234567890ab')
  })
  it('decodes 12 chracters Base32 string to 14 digits hex string', () => {
    expect(decode('CI2FM6EQVPGQ====')).toBe('1234567890abcd')
  })
  it('decodes 13 chracters Base32 string to 16 digits hex string', () => {
    expect(decode('CI2FM6EQVPG66===')).toBe('1234567890abcdef')
  })
  it('decodes 15 chracters Base32 string to 18 digits hex string', () => {
    expect(decode('CI2FM6EQVPG66EQ=')).toBe('1234567890abcdef12')
  })
})
