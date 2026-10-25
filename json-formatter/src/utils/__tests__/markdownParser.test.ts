import { describe, it, expect } from 'vitest'
import { parseMarkdown } from '../markdownParser'

describe('parseMarkdown', () => {
  it('should parse headings', () => {
    expect(parseMarkdown('# Title')).toContain('<h1>Title</h1>')
    expect(parseMarkdown('## Section')).toContain('<h2>Section</h2>')
    expect(parseMarkdown('### Subsection')).toContain('<h3>Subsection</h3>')
  })

  it('should parse bold text', () => {
    expect(parseMarkdown('**bold**')).toContain('<strong>bold</strong>')
    expect(parseMarkdown('__bold__')).toContain('<strong>bold</strong>')
  })

  it('should parse italic text', () => {
    expect(parseMarkdown('*italic*')).toContain('<em>italic</em>')
    expect(parseMarkdown('_italic_')).toContain('<em>italic</em>')
  })

  it('should parse inline code', () => {
    expect(parseMarkdown('`code`')).toContain('<code>code</code>')
  })

  it('should parse code blocks', () => {
    const result = parseMarkdown('```\ncode\n```')
    expect(result).toContain('<pre><code>')
  })

  it('should parse links', () => {
    expect(parseMarkdown('[link](https://example.com)'))
      .toContain('<a href="https://example.com" target="_blank">link</a>')
  })

  it('should parse lists', () => {
    expect(parseMarkdown('- item')).toContain('<li>item</li>')
    expect(parseMarkdown('1. item')).toContain('<li>item</li>')
  })

  it('should handle empty input', () => {
    expect(parseMarkdown('')).toBe('')
  })
})
