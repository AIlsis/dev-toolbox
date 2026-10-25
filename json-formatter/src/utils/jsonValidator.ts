export interface JSONError {
  message: string
  line: number
  column: number
}

export interface ValidationResult {
  valid: boolean
  error?: JSONError
}

export function validateJSON(input: string): ValidationResult {
  if (!input.trim()) {
    return {
      valid: false,
      error: {
        message: 'Empty input',
        line: 1,
        column: 1,
      },
    }
  }

  try {
    JSON.parse(input)
    return { valid: true }
  } catch (e: unknown) {
    if (e instanceof SyntaxError) {
      const match = e.message.match(/position (\d+)/)
      if (match) {
        const pos = parseInt(match[1])
        const lines = input.substring(0, pos).split('\n')
        const line = lines.length
        const column = lines[lines.length - 1].length + 1
        
        return {
          valid: false,
          error: {
            message: e.message,
            line,
            column,
          },
        }
      }
    }
    return {
      valid: false,
      error: {
        message: e instanceof Error ? e.message : 'Unknown error',
        line: 1,
        column: 1,
      },
    }
  }
}
