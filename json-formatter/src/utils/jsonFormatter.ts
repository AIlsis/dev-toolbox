import { validateJSON } from './jsonValidator'

export function formatJSON(input: string, indent: number = 2): string {
  const validation = validateJSON(input)
  if (!validation.valid) {
    throw new Error('Invalid JSON')
  }
  
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed, null, indent)
}

export function minifyJSON(input: string): string {
  const validation = validateJSON(input)
  if (!validation.valid) {
    throw new Error('Invalid JSON')
  }
  
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed)
}
