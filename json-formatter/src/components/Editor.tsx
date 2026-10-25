import { useState, useCallback, useEffect } from 'react'
import { validateJSON, JSONError } from '../utils/jsonValidator'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  onError: (error: JSONError | null) => void
}

export default function Editor({ value, onChange, onError }: EditorProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
    
    const result = validateJSON(newValue)
    onError(result.error || null)
  }, [onChange, onError])

  return (
    <div className="flex-1 p-2">
      <textarea
        className="w-full h-full p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        value={localValue}
        onChange={handleChange}
        placeholder="在此输入JSON..."
        spellCheck={false}
      />
    </div>
  )
}
