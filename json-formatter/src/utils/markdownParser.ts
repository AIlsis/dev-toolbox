export function parseMarkdown(markdown: string): string {
  if (!markdown.trim()) return ''
  
  let html = escapeHtml(markdown)
  
  // 代码块（优先处理）
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  
  // 标题
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>')
  
  // 粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>')
  
  // 斜体
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.*?)_/g, '<em>$1</em>')
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
  
  // 列表
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>')
  html = html.replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
  
  // 段落
  html = html.replace(/\n\n/g, '</p><p>')
  html = html.replace(/^(?!<[hlo])(.*$)/gm, '<p>$1</p>')
  
  // 清理多余的段落标签
  html = html.replace(/<p><(h[1-6])>/g, '<$1>')
  html = html.replace(/<\/(h[1-6])><\/p>/g, '</$1>')
  html = html.replace(/<p><li>/g, '<li>')
  html = html.replace(/<\/li><\/p>/g, '</li>')
  html = html.replace(/<p><pre>/g, '<pre>')
  html = html.replace(/<\/pre><\/p>/g, '</pre>')
  
  // 换行
  html = html.replace(/\n/g, '<br>')
  
  return html
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function downloadMarkdown(markdown: string, filename: string = 'document.md'): void {
  const blob = new Blob([markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
