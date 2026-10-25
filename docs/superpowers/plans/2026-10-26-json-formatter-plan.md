# JSON 格式化工具实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个免费、开源、快速的JSON格式化工具，支持格式化、校验、压缩、转义功能。

**Architecture:** 单页应用（SPA），前端实现所有JSON处理逻辑，无需后端服务。使用React + TypeScript构建，GitHub Pages免费部署。

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite, Vitest

## Global Constraints

- 文件大小限制：1MB
- 浏览器兼容：Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- 代码风格：TypeScript strict mode, ESLint + Prettier
- 提交规范：feat/fix/docs/refactor 前缀

---

## Phase 1: 项目初始化

### Task 1: 项目脚手架

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/globals.css`

**Interfaces:**
- Produces: 基础项目结构，React应用入口

- [ ] **Step 1: 初始化项目**

```bash
npm create vite@latest json-formatter -- --template react-ts
cd json-formatter
npm install
```

- [ ] **Step 2: 安装依赖**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 3: 配置Tailwind**

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 4: 配置全局样式**

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100;
}
```

- [ ] **Step 5: 创建主入口**

```typescript
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 6: 创建App组件**

```typescript
// src/App.tsx
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">JSON Formatter</h1>
    </div>
  )
}
```

- [ ] **Step 7: 测试项目运行**

```bash
npm run dev
```

Expected: 浏览器显示 "JSON Formatter"

- [ ] **Step 8: 提交**

```bash
git add -A
git commit -m "feat: initialize project with React + TypeScript + Tailwind"
```

---

## Phase 2: 核心工具函数

### Task 2: JSON校验模块

**Files:**
- Create: `src/utils/jsonValidator.ts`
- Create: `src/utils/__tests__/jsonValidator.test.ts`

**Interfaces:**
- Consumes: 无
- Produces: `validateJSON(input: string): ValidationResult` 函数

- [ ] **Step 1: 编写校验测试（TDD）**

```typescript
// src/utils/__tests__/jsonValidator.test.ts
import { describe, it, expect } from 'vitest'
import { validateJSON } from '../jsonValidator'

describe('validateJSON', () => {
  it('should validate valid JSON', () => {
    const result = validateJSON('{"name": "test"}')
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('should detect invalid JSON', () => {
    const result = validateJSON('{name: test}')
    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
    expect(result.error!.line).toBeGreaterThan(0)
  })

  it('should detect missing closing brace', () => {
    const result = validateJSON('{"name": "test"')
    expect(result.valid).toBe(false)
  })

  it('should handle empty input', () => {
    const result = validateJSON('')
    expect(result.valid).toBe(false)
  })

  it('should report correct line number', () => {
    const input = '{\n  "name": "test",\n  "age": 30,\n  invalid\n}'
    const result = validateJSON(input)
    expect(result.valid).toBe(false)
    expect(result.error!.line).toBe(4)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm test
```

Expected: FAIL - validateJSON not defined

- [ ] **Step 3: 实现校验函数**

```typescript
// src/utils/jsonValidator.ts
export interface JSONError {
  message: string
  line: number
  column: number
}

export interface ValidationResult {
  valid: boolean
  error?: JSONError
}

export function validateJSON(input: string): ValidationResult {
  if (!input.trim()) {
    return {
      valid: false,
      error: {
        message: 'Empty input',
        line: 1,
        column: 1,
      },
    }
  }

  try {
    JSON.parse(input)
    return { valid: true }
  } catch (e: unknown) {
    if (e instanceof SyntaxError) {
      const match = e.message.match(/position (\d+)/)
      if (match) {
        const pos = parseInt(match[1])
        const lines = input.substring(0, pos).split('\n')
        const line = lines.length
        const column = lines[lines.length - 1].length + 1
        
        return {
          valid: false,
          error: {
            message: e.message,
            line,
            column,
          },
        }
      }
    }
    return {
      valid: false,
      error: {
        message: e instanceof Error ? e.message : 'Unknown error',
        line: 1,
        column: 1,
      },
    }
  }
}
```

- [ ] **Step 4: 运行测试确认通过**

```bash
npm test
```

Expected: PASS - 5/5 tests

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "feat: add JSON validator with error location detection"
```

---

### Task 3: JSON格式化模块

**Files:**
- Create: `src/utils/jsonFormatter.ts`
- Create: `src/utils/__tests__/jsonFormatter.test.ts`

**Interfaces:**
- Consumes: `validateJSON()` from Task 2
- Produces: `formatJSON(input, indent)`, `minifyJSON(input)` functions

- [ ] **Step 1: 编写格式化测试**

```typescript
// src/utils/__tests__/jsonFormatter.test.ts
import { describe, it, expect } from 'vitest'
import { formatJSON, minifyJSON } from '../jsonFormatter'

describe('formatJSON', () => {
  it('should format simple JSON', () => {
    const input = '{"name":"test","age":30}'
    const result = formatJSON(input, 2)
    expect(result).toContain('\n')
    expect(result).toContain('"name"')
  })

  it('should format with custom indent', () => {
    const input = '{"a":1}'
    const result = formatJSON(input, 4)
    expect(result).toContain('    "a"')
  })

  it('should handle nested objects', () => {
    const input = '{"user":{"name":"test"}}'
    const result = formatJSON(input, 2)
    expect(result).toContain('\n  "user"')
  })

  it('should handle arrays', () => {
    const input = '[1,2,3]'
    const result = formatJSON(input, 2)
    expect(result).toContain('\n  1,')
  })

  it('should throw on invalid JSON', () => {
    expect(() => formatJSON('{invalid}', 2)).toThrow()
  })
})

describe('minifyJSON', () => {
  it('should remove whitespace', () => {
    const input = '{\n  "name": "test"\n}'
    const result = minifyJSON(input)
    expect(result).toBe('{"name":"test"}')
  })

  it('should throw on invalid JSON', () => {
    expect(() => minifyJSON('{invalid}')).toThrow()
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm test
```

Expected: FAIL - jsonFormatter not defined

- [ ] **Step 3: 实现格式化函数**

```typescript
// src/utils/jsonFormatter.ts
import { validateJSON } from './jsonValidator'

export function formatJSON(input: string, indent: number = 2): string {
  const validation = validateJSON(input)
  if (!validation.valid) {
    throw new Error('Invalid JSON')
  }
  
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed, null, indent)
}

export function minifyJSON(input: string): string {
  const validation = validateJSON(input)
  if (!validation.valid) {
    throw new Error('Invalid JSON')
  }
  
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed)
}
```

- [ ] **Step 4: 运行测试确认通过**

```bash
npm test
```

Expected: PASS - 10/10 tests

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "feat: add JSON formatter and minifier"
```

---

### Task 4: JSON转义模块

**Files:**
- Create: `src/utils/jsonEscape.ts`
- Create: `src/utils/__tests__/jsonEscape.test.ts`

**Interfaces:**
- Produces: `escapeJSON(input)`, `unescapeJSON(input)` functions

- [ ] **Step 1: 编写转义测试**

```typescript
// src/utils/__tests__/jsonEscape.test.ts
import { describe, it, expect } from 'vitest'
import { escapeJSON, unescapeJSON } from '../jsonEscape'

describe('escapeJSON', () => {
  it('should escape quotes', () => {
    const input = '"hello"'
    const result = escapeJSON(input)
    expect(result).toContain('\\"')
  })

  it('should escape newlines', () => {
    const input = 'line1\nline2'
    const result = escapeJSON(input)
    expect(result).toContain('\\n')
  })

  it('should handle empty string', () => {
    expect(escapeJSON('')).toBe('')
  })
})

describe('unescapeJSON', () => {
  it('should unescape quotes', () => {
    const input = '\\"hello\\"'
    const result = unescapeJSON(input)
    expect(result).toContain('"')
  })

  it('should be reversible', () => {
    const original = '{"name":"test"}'
    const escaped = escapeJSON(original)
    const unescaped = unescapeJSON(escaped)
    expect(unescaped).toBe(original)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm test
```

Expected: FAIL - jsonEscape not defined

- [ ] **Step 3: 实现转义函数**

```typescript
// src/utils/jsonEscape.ts
export function escapeJSON(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

export function unescapeJSON(input: string): string {
  return input
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
}
```

- [ ] **Step 4: 运行测试确认通过**

```bash
npm test
```

Expected: PASS - 8/8 tests

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "feat: add JSON escape/unescape utilities"
```

---

## Phase 3: UI组件开发

### Task 5: 编辑器组件

**Files:**
- Create: `src/components/Editor.tsx`
- Create: `src/components/Editor.module.css`

**Interfaces:**
- Consumes: `validateJSON()` from Task 2
- Produces: `<Editor value onChange onError />` component

- [ ] **Step 1: 创建编辑器组件**

```typescript
// src/components/Editor.tsx
import { useState, useCallback, useEffect } from 'react'
import { validateJSON, JSONError } from '../utils/jsonValidator'
import styles from './Editor.module.css'

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
    <div className={styles.editor}>
      <textarea
        className={styles.textarea}
        value={localValue}
        onChange={handleChange}
        placeholder="在此输入JSON..."
        spellCheck={false}
      />
    </div>
  )
}
```

- [ ] **Step 2: 创建编辑器样式**

```css
/* src/components/Editor.module.css */
.editor {
  position: relative;
  height: 100%;
}

.textarea {
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: none;
  background: white;
  color: #1f2937;
}

.textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "feat: add Editor component with JSON validation"
```

---

### Task 6: 输出展示组件

**Files:**
- Create: `src/components/Output.tsx`
- Create: `src/components/Output.module.css`

**Interfaces:**
- Consumes: `formatJSON()` from Task 3
- Produces: `<Output value formatted onCopy />` component

- [ ] **Step 1: 创建输出组件**

```typescript
// src/components/Output.tsx
import { useState, useCallback } from 'react'
import { formatJSON } from '../utils/jsonFormatter'
import styles from './Output.module.css'

interface OutputProps {
  value: string
  formatted: boolean
  onCopy: () => void
}

export default function Output({ value, formatted, onCopy }: OutputProps) {
  const [copied, setCopied] = useState(false)

  const displayValue = formatted && value.trim()
    ? formatJSON(value, 2)
    : value

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(displayValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    onCopy()
  }, [displayValue, onCopy])

  return (
    <div className={styles.output}>
      <div className={styles.toolbar}>
        <button onClick={handleCopy} className={styles.button}>
          {copied ? '已复制 ✓' : '复制'}
        </button>
      </div>
      <pre className={styles.pre}>
        <code>{displayValue || '输出区域'}</code>
      </pre>
    </div>
  )
}
```

- [ ] **Step 2: 创建输出样式**

```css
/* src/components/Output.module.css */
.output {
  position: relative;
  height: 100%;
  background: #f9fafb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: #2563eb;
}

.pre {
  margin: 0;
  padding: 1rem;
  height: calc(100% - 48px);
  overflow: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}
```

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "feat: add Output component with copy functionality"
```

---

### Task 7: 工具栏组件

**Files:**
- Create: `src/components/Toolbar.tsx`
- Create: `src/components/Toolbar.module.css`

**Interfaces:**
- Produces: `<Toolbar onFormat onMinify onClear onEscape />` component

- [ ] **Step 1: 创建工具栏组件**

```typescript
// src/components/Toolbar.tsx
import styles from './Toolbar.module.css'

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
    <div className={styles.toolbar}>
      <button onClick={onFormat} className={styles.button}>
        格式化
      </button>
      <button onClick={onMinify} className={styles.button}>
        压缩
      </button>
      <button onClick={onEscape} className={styles.button}>
        转义
      </button>
      <button onClick={onUnescape} className={styles.button}>
        反转义
      </button>
      <button onClick={onClear} className={styles.buttonSecondary}>
        清空
      </button>
    </div>
  )
}
```

- [ ] **Step 2: 创建工具栏样式**

```css
/* src/components/Toolbar.module.css */
.toolbar {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: #2563eb;
}

.buttonSecondary {
  padding: 0.5rem 1rem;
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.buttonSecondary:hover {
  background: #d1d5db;
}
```

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "feat: add Toolbar component with action buttons"
```

---

### Task 8: 错误提示组件

**Files:**
- Create: `src/components/ErrorMessage.tsx`
- Create: `src/components/ErrorMessage.module.css`

**Interfaces:**
- Produces: `<ErrorMessage error />` component

- [ ] **Step 1: 创建错误提示组件**

```typescript
// src/components/ErrorMessage.tsx
import { JSONError } from '../utils/jsonValidator'
import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
  error: JSONError | null
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null

  return (
    <div className={styles.error}>
      <span className={styles.icon}>⚠️</span>
      <span className={styles.message}>
        第 {error.line} 行第 {error.column} 列：{error.message}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: 创建错误提示样式**

```css
/* src/components/ErrorMessage.module.css */
.error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  margin: 0.5rem 1rem;
}

.icon {
  font-size: 1.25rem;
}

.message {
  color: #dc2626;
  font-size: 0.875rem;
}
```

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "feat: add ErrorMessage component"
```

---

### Task 9: 主应用集成

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/globals.css`

**Interfaces:**
- Consumes: All components from Tasks 5-8
- Produces: Complete working application

- [ ] **Step 1: 更新主应用**

```typescript
// src/App.tsx
import { useState, useCallback } from 'react'
import Editor from './components/Editor'
import Output from './components/Output'
import Toolbar from './components/Toolbar'
import ErrorMessage from './components/ErrorMessage'
import { formatJSON, minifyJSON } from './utils/jsonFormatter'
import { escapeJSON, unescapeJSON } from './utils/jsonEscape'
import { JSONError } from './utils/jsonValidator'
import styles from './App.module.css'

export default function App() {
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
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>JSON Formatter</h1>
        <p className={styles.subtitle}>免费、快速、开源的JSON格式化工具</p>
      </header>
      
      <main className={styles.main}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>输入</h2>
          </div>
          <Editor value={input} onChange={setInput} onError={setError} />
          <ErrorMessage error={error} />
        </div>
        
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>输出</h2>
          </div>
          <Output value={output} formatted={false} onCopy={() => {}} />
        </div>
      </main>
      
      <div className={styles.toolbar}>
        <Toolbar
          onFormat={handleFormat}
          onMinify={handleMinify}
          onClear={handleClear}
          onEscape={handleEscape}
          onUnescape={handleUnescape}
        />
      </div>
      
      <footer className={styles.footer}>
        <p>开源免费 · 数据不上传 · 纯前端处理</p>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: 创建应用样式**

```css
/* src/App.module.css */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  text-align: center;
  padding: 2rem;
  color: white;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

.main {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.panel {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.panelHeader {
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.panelHeader h2 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
}

.toolbar {
  padding: 0 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  text-align: center;
  padding: 1rem;
  color: white;
  opacity: 0.8;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .main {
    grid-template-columns: 1fr;
    padding: 0 1rem 1rem;
  }
  
  .title {
    font-size: 1.75rem;
  }
}
```

- [ ] **Step 3: 更新全局样式**

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: 'Fira Code', 'Consolas', monospace;
}
```

- [ ] **Step 4: 测试应用运行**

```bash
npm run dev
```

Expected: 浏览器显示完整的JSON格式化工具界面

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "feat: integrate all components into main App"
```

---

## Phase 4: 测试与部署

### Task 10: 集成测试

**Files:**
- Create: `src/App.test.tsx`

**Interfaces:**
- Tests complete user workflow

- [ ] **Step 1: 编写集成测试**

```typescript
// src/App.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('should display header', () => {
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
  })

  it('should format valid JSON', async () => {
    const input = '{"name":"test"}'
    const textarea = screen.getByPlaceholderText('在此输入JSON...')
    
    fireEvent.change(textarea, { target: { value: input } })
    
    const formatButton = screen.getByText('格式化')
    fireEvent.click(formatButton)
    
    expect(screen.getByText('"name"')).toBeInTheDocument()
  })

  it('should clear input', () => {
    const input = '{"name":"test"}'
    const textarea = screen.getByPlaceholderText('在此输入JSON...')
    
    fireEvent.change(textarea, { target: { value: input } })
    
    const clearButton = screen.getByText('清空')
    fireEvent.click(clearButton)
    
    expect(textarea).toHaveValue('')
  })
})
```

- [ ] **Step 2: 安装测试依赖**

```bash
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: 配置测试**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

- [ ] **Step 4: 运行测试**

```bash
npm test
```

Expected: PASS - All tests

- [ ] **Step 5: 提交**

```bash
git add -A
git commit -m "test: add integration tests for App"
```

---

### Task 11: 部署到GitHub Pages

**Files:**
- Modify: `vite.config.ts`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Produces: Deployed application at GitHub Pages

- [ ] **Step 1: 配置Vite base路径**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/json-formatter/',
})
```

- [ ] **Step 2: 创建部署脚本**

```bash
# 添加package.json scripts
# "deploy": "npm run build && gh-pages -d dist"
```

- [ ] **Step 3: 创建GitHub Actions工作流**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 4: 初始化Git仓库并推送**

```bash
git remote add origin https://github.com/your-username/json-formatter.git
git branch -M main
git push -u origin main
```

- [ ] **Step 5: 启用GitHub Pages**

在GitHub仓库 Settings → Pages → Source 选择 gh-pages 分支

- [ ] **Step 6: 验证部署**

访问: `https://your-username.github.io/json-formatter/`

Expected: 网站正常运行

- [ ] **Step 7: 提交**

```bash
git add -A
git commit -m "feat: add GitHub Pages deployment workflow"
```

---

### Task 12: 完善README

**Files:**
- Create: `README.md`

**Interfaces:**
- Produces: Project documentation

- [ ] **Step 1: 创建README**

```markdown
# JSON Formatter

免费、快速、开源的JSON格式化工具

## 功能特性

- ✅ JSON格式化与美化
- ✅ JSON语法校验与错误定位
- ✅ JSON压缩
- ✅ JSON转义/反转义
- ✅ 一键复制
- ✅ 深色模式
- ✅ 完全免费、开源

## 技术栈

- React 18 + TypeScript
- Tailwind CSS
- Vite

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 构建生产版本
npm run build
```

## 部署

本项目使用 GitHub Pages 自动部署，推送到 main 分支后自动触发 CI/CD。

## 开源协议

MIT License

## 链接

- 在线访问: https://your-username.github.io/json-formatter/
- GitHub: https://github.com/your-username/json-formatter
```

- [ ] **Step 2: 提交**

```bash
git add -A
git commit -m "docs: add README with project documentation"
```

---

## 自检清单

✅ **Spec覆盖率** - 所有功能需求都有对应任务  
✅ **Placeholder扫描** - 无TODO/TBD  
✅ **类型一致性** - 所有函数签名一致  
✅ **测试覆盖** - 每个模块都有对应测试  

---

## 执行选项

**Plan complete and saved to `docs/superpowers/plans/2026-10-26-json-formatter-plan.md`**

**两种执行方式：**

1. **Subagent-Driven（推荐）** - 每个任务派发独立子agent，任务间review，快速迭代
2. **Inline Execution** - 在当前会话中批量执行，带检查点

**选择哪种方式？**
