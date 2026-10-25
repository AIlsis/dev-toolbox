import { useState, useCallback } from 'react'
import { generateQRCode, downloadQRCode } from '../utils/qrcodeGenerator'

export default function QRCodeGenerator() {
  const [input, setInput] = useState('')
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) {
      setError('请输入内容')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const result = await generateQRCode(input)
      setSvg(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败')
    } finally {
      setLoading(false)
    }
  }, [input])

  const handleDownload = useCallback(() => {
    if (svg) {
      downloadQRCode(svg)
    }
  }, [svg])

  const handleClear = useCallback(() => {
    setInput('')
    setSvg(null)
    setError(null)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-500 to-emerald-600">
      <header className="text-center p-6 text-white">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <p className="mt-2 opacity-90">免费、快速、开源的二维码生成器</p>
      </header>
      
      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-xl min-h-[400px]">
          <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h2 className="text-sm font-semibold text-gray-600">输入内容</h2>
          </div>
          <div className="flex-1 p-4">
            <textarea
              className="w-full h-40 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在此输入要生成二维码的内容（URL、文本等）..."
              spellCheck={false}
            />
            {error && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                ⚠️ {error}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {loading ? '生成中...' : '生成二维码'}
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              清空
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-xl min-h-[400px]">
          <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h2 className="text-sm font-semibold text-gray-600">二维码预览</h2>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            {svg ? (
              <div 
                className="p-4 border-2 border-gray-200 rounded-lg"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ) : (
              <div className="text-gray-400 text-center">
                <div className="text-6xl mb-4">📱</div>
                <p>生成后在此显示二维码</p>
              </div>
            )}
          </div>
          {svg && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleDownload}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                下载 SVG
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="text-center p-4 text-white opacity-80 text-sm">
        <p>开源免费 · 数据不上传 · 纯前端处理</p>
      </footer>
    </div>
  )
}
