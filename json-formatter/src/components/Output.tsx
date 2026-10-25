import { useState, useCallback } from 'react'

interface OutputProps {
  value: string
  onCopy: () => void
}

export default function Output({ value, onCopy }: OutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    onCopy()
  }, [value, onCopy])

  return (
    <div className="flex-1 p-2">
      <div className="flex justify-end p-2 border-b border-gray-200">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
        >
          {copied ? '已复制 ✓' : '复制'}
        </button>
      </div>
      <pre className="p-4 h-[calc(100%-48px)] overflow-auto font-mono text-sm whitespace-pre-wrap break-all bg-gray-50">
        <code>{value || '输出区域'}</code>
      </pre>
    </div>
  )
}
