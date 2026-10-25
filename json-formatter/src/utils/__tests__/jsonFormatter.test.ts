import { describe, it, expect } from 'vitest'
import { formatJSON, minifyJSON } from '../jsonFormatter'

describe('formatJSON', () => {
  it('should format simple JSON', () => {
    const input = '{"name":"test","age":30}'
    const result = formatJSON(input, 2)
    expect(result).toContain('\n')
    expect(result).toContain('"name"')
  })

  it('should format with custom indent', () => {
    const input = '{"a":1}'
    const result = formatJSON(input, 4)
    expect(result).toContain('    "a"')
  })

  it('should handle nested objects', () => {
    const input = '{"user":{"name":"test"}}'
    const result = formatJSON(input, 2)
    expect(result).toContain('\n  "user"')
  })

  it('should handle arrays', () => {
    const input = '[1,2,3]'
    const result = formatJSON(input, 2)
    expect(result).toContain('\n  1,')
  })

  it('should throw on invalid JSON', () => {
    expect(() => formatJSON('{invalid}', 2)).toThrow()
  })
})

describe('minifyJSON', () => {
  it('should remove whitespace', () => {
    const input = '{\n  "name": "test"\n}'
    const result = minifyJSON(input)
    expect(result).toBe('{"name":"test"}')
  })

  it('should throw on invalid JSON', () => {
    expect(() => minifyJSON('{invalid}')).toThrow()
  })
})
