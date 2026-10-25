import { describe, it, expect } from 'vitest'
import { escapeJSON, unescapeJSON } from '../jsonEscape'

describe('escapeJSON', () => {
  it('should escape quotes', () => {
    const input = '"hello"'
    const result = escapeJSON(input)
    expect(result).toContain('\\"')
  })

  it('should escape newlines', () => {
    const input = 'line1\nline2'
    const result = escapeJSON(input)
    expect(result).toContain('\\n')
  })

  it('should handle empty string', () => {
    expect(escapeJSON('')).toBe('')
  })
})

describe('unescapeJSON', () => {
  it('should unescape quotes', () => {
    const input = '\\"hello\\"'
    const result = unescapeJSON(input)
    expect(result).toContain('"')
  })

  it('should be reversible', () => {
    const original = '{"name":"test"}'
    const escaped = escapeJSON(original)
    const unescaped = unescapeJSON(escaped)
    expect(unescaped).toBe(original)
  })
})
