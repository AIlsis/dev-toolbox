import { useState, useCallback } from 'react'
import Editor from './components/Editor'
import Output from './components/Output'
import Toolbar from './components/Toolbar'
import ErrorMessage from './components/ErrorMessage'
import { formatJSON, minifyJSON } from './utils/jsonFormatter'
import { escapeJSON, unescapeJSON } from './utils/jsonEscape'
import { JSONError } from './utils/jsonValidator'

export default function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<JSONError | null>(null)

  const handleFormat = useCallback(() => {
    if (!input.trim()) return
    try {
      setOutput(formatJSON(input, 2))
    } catch {
      // Error handled by validator
    }
  }, [input])

  const handleMinify = useCallback(() => {
    if (!input.trim()) return
    try {
      setOutput(minifyJSON(input))
    } catch {
      // Error handled by validator
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setError(null)
  }, [])

  const handleEscape = useCallback(() => {
    if (!input.trim()) return
    setOutput(escapeJSON(input))
  }, [input])

  const handleUnescape = useCallback(() => {
    if (!input.trim()) return
    setOutput(unescapeJSON(input))
  }, [input])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow min-h-[400px]">
          <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h2 className="text-sm font-semibold text-gray-600">输入</h2>
          </div>
          <Editor value={input} onChange={setInput} onError={setError} />
          <ErrorMessage error={error} />
        </div>
        
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow min-h-[400px]">
          <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h2 className="text-sm font-semibold text-gray-600">输出</h2>
          </div>
          <Output value={output} onCopy={() => {}} />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow">
        <button onClick={handleFormat} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">
          格式化
        </button>
        <button onClick={handleMinify} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">
          压缩
        </button>
        <button onClick={handleEscape} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium">
          转义
        </button>
        <button onClick={handleUnescape} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium">
          反转义
        </button>
        <button onClick={handleClear} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium">
          清空
        </button>
      </div>
    </div>
  )
}
