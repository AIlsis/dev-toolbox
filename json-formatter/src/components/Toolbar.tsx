interface ToolbarProps {
  onFormat: () => void
  onMinify: () => void
  onClear: () => void
  onEscape: () => void
  onUnescape: () => void
}

export default function Toolbar({
  onFormat,
  onMinify,
  onClear,
  onEscape,
  onUnescape,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white border-t border-gray-200">
      <button onClick={onFormat} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">
        格式化
      </button>
      <button onClick={onMinify} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium">
        压缩
      </button>
      <button onClick={onEscape} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium">
        转义
      </button>
      <button onClick={onUnescape} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium">
        反转义
      </button>
      <button onClick={onClear} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium">
        清空
      </button>
    </div>
  )
}
