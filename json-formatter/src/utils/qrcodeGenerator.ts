export function generateQRCode(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 使用纯JavaScript实现QR码生成（不依赖外部库）
    // 这里我们使用一个简单的Canvas实现
    try {
      if (!text.trim()) {
        reject(new Error('请输入内容'))
        return
      }

      // 创建一个简单的SVG QR码（使用占位符）
      // 实际项目中可以使用 qrcode.js 库
      const svg = generateSimpleQRSVG(text)
      resolve(svg)
    } catch (e) {
      reject(e)
    }
  })
}

function generateSimpleQRSVG(text: string): string {
  // 简化的QR码SVG生成（演示用）
  // 实际项目应使用成熟的QR码库
  const size = 200
  const moduleSize = 10
  const modules = size / moduleSize
  
  // 生成一个简单的二维码图案
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`
  svg += `<rect width="${size}" height="${size}" fill="white"/>`
  
  // 使用文本哈希生成图案
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // 生成定位标记（三个角）
  svg += drawFinderPattern(0, 0, moduleSize)
  svg += drawFinderPattern((modules - 7) * moduleSize, 0, moduleSize)
  svg += drawFinderPattern(0, (modules - 7) * moduleSize, moduleSize)
  
  // 生成数据区域
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      if (isFinderArea(x, y, modules)) continue
      
      // 使用哈希值决定模块颜色
      const value = Math.abs(hash + x * 31 + y * 17) % 2 === 0
      if (value) {
        svg += `<rect x="${x * moduleSize}" y="${y * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`
      }
    }
  }
  
  svg += '</svg>'
  return svg
}

function drawFinderPattern(x: number, y: number, moduleSize: number): string {
  const size = 7 * moduleSize
  let svg = ''
  
  // 外框
  svg += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="black"/>`
  // 内框
  svg += `<rect x="${x + moduleSize}" y="${y + moduleSize}" width="${size - 2 * moduleSize}" height="${size - 2 * moduleSize}" fill="white"/>`
  // 中心
  svg += `<rect x="${x + 2 * moduleSize}" y="${y + 2 * moduleSize}" width="${3 * moduleSize}" height="${3 * moduleSize}" fill="black"/>`
  
  return svg
}

function isFinderArea(x: number, y: number, modules: number): boolean {
  // 左上角
  if (x < 7 && y < 7) return true
  // 右上角
  if (x >= modules - 7 && y < 7) return true
  // 左下角
  if (x < 7 && y >= modules - 7) return true
  return false
}

export function downloadQRCode(svg: string, filename: string = 'qrcode.svg'): void {
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
