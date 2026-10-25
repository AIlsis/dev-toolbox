import { describe, it, expect } from 'vitest'
import { validateJSON } from '../jsonValidator'

describe('validateJSON', () => {
  it('should validate valid JSON', () => {
    const result = validateJSON('{"name": "test"}')
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('should detect invalid JSON', () => {
    const result = validateJSON('{name: test}')
    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
    expect(result.error!.line).toBeGreaterThan(0)
  })

  it('should detect missing closing brace', () => {
    const result = validateJSON('{"name": "test"')
    expect(result.valid).toBe(false)
  })

  it('should handle empty input', () => {
    const result = validateJSON('')
    expect(result.valid).toBe(false)
  })

  it('should report correct line number', () => {
    const input = '{\n  "name": "test",\n  "age": 30,\n  invalid\n}'
    const result = validateJSON(input)
    expect(result.valid).toBe(false)
    expect(result.error!.line).toBe(4)
  })
})
