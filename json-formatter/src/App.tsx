import { useState } from 'react'
import JSONFormatter from './JSONFormatter'
import QRCodeGenerator from './components/QRCodeGenerator'
import MarkdownEditor from './components/MarkdownEditor'
import About from './components/About'

type Tab = 'json' | 'qrcode' | 'markdown' | 'about'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('json')

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'json', label: 'JSON格式化', icon: '📋' },
    { id: 'qrcode', label: '二维码生成', icon: '📱' },
    { id: 'markdown', label: 'Markdown编辑', icon: '📝' },
    { id: 'about', label: '关于', icon: 'ℹ️' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">开发者工具箱</h1>
          <p className="text-gray-500 text-sm">免费、开源、纯前端处理</p>
        </div>
      </header>
      
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'json' && <JSONFormatter />}
        {activeTab === 'qrcode' && <QRCodeGenerator />}
        {activeTab === 'markdown' && <MarkdownEditor />}
        {activeTab === 'about' && <About />}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          <p>© 2026 开发者工具箱 · 开源免费 · 数据不上传</p>
        </div>
      </footer>
    </div>
  )
}
