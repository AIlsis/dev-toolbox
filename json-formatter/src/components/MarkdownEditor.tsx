import { useState, useCallback, useMemo } from 'react'
import { parseMarkdown, downloadMarkdown } from '../utils/markdownParser'

export default function MarkdownEditor() {
  const [input, setInput] = useState('')
  const [preview, setPreview] = useState(false)

  const html = useMemo(() => {
    if (!input.trim()) return ''
    return parseMarkdown(input)
  }, [input])

  const handleDownload = useCallback(() => {
    if (input.trim()) {
      downloadMarkdown(input)
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
  }, [])

  const handleInsert = useCallback((text: string) => {
    setInput(prev => prev + text)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-indigo-600">
      <header className="text-center p-6 text-white">
        <h1 className="text-3xl font-bold">Markdown Editor</h1>
        <p className="mt-2 opacity-90">免费、快速、开源的Markdown编辑器</p>
      </header>
      
      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-xl min-h-[400px]">
          <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-600">编辑区</h2>
            <div className="flex gap-1">
              <button onClick={() => handleInsert('**')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">B</button>
              <button onClick={() => handleInsert('*')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">I</button>
              <button onClick={() => handleInsert('`')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">{"`"}</button>
              <button onClick={() => handleInsert('[text](url)')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">🔗</button>
            </div>
          </div>
          <div className="flex-1 p-2">
            <textarea
              className="w-full h-full p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在此输入Markdown..."
              spellCheck={false}
            />
          </div>
          <div className="p-4 border-t border-gray-200 flex gap-2">
            <button
              onClick={() => setPreview(!preview)}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              {preview ? '编辑模式' : '预览模式'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium"
            >
              下载 MD
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
            >
              清空
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-xl min-h-[400px]">
          <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h2 className="text-sm font-semibold text-gray-600">
              {preview ? '预览' : 'HTML输出'}
            </h2>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {preview ? (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: html || '<span class="text-gray-400">预览区域</span>' }}
              />
            ) : (
              <pre className="text-sm whitespace-pre-wrap break-all text-gray-700">
                {html || '输出区域'}
              </pre>
            )}
          </div>
        </div>
      </main>
      
      <footer className="text-center p-4 text-white opacity-80 text-sm">
        <p>开源免费 · 数据不上传 · 纯前端处理</p>
      </footer>
    </div>
  )
}
