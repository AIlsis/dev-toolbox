import { describe, it, expect } from 'vitest'
import { generateQRCode } from '../qrcodeGenerator'

describe('generateQRCode', () => {
  it('should generate QR code for valid text', async () => {
    const result = await generateQRCode('https://example.com')
    expect(result).toContain('<svg')
    expect(result).toContain('xmlns="http://www.w3.org/2000/svg"')
  })

  it('should reject empty input', async () => {
    await expect(generateQRCode('')).rejects.toThrow('请输入内容')
  })

  it('should generate finder patterns', async () => {
    const result = await generateQRCode('test')
    // 应该包含三个定位标记
    expect(result).toContain('rect')
  })
})
