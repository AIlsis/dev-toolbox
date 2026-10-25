import { JSONError } from '../utils/jsonValidator'

interface ErrorMessageProps {
  error: JSONError | null
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null

  return (
    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded m-2">
      <span className="text-red-500 text-lg">⚠️</span>
      <span className="text-red-600 text-sm">
        第 {error.line} 行第 {error.column} 列：{error.message}
      </span>
    </div>
  )
}
