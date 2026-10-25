export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-indigo-600">
      <header className="text-center p-6 text-white">
        <h1 className="text-3xl font-bold">关于开发者工具箱</h1>
        <p className="mt-2 opacity-90">开源免费、纯前端处理、数据不上传</p>
      </header>
      
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">项目介绍</h2>
          <p className="text-gray-600 mb-4">
            开发者工具箱是一个免费开源的工具集合，包括JSON格式化、二维码生成、Markdown编辑等功能。
          </p>
          <p className="text-gray-600 mb-6">
            所有功能都在浏览器本地处理，不会上传任何数据到服务器，保证数据安全。
          </p>
          
          <h2 className="text-xl font-bold text-gray-900 mb-4">联系方式</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-sm text-gray-500">邮箱</p>
                <p className="font-medium text-gray-900">3180667760@qq.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-sm text-gray-500">微信</p>
                <p className="font-medium text-gray-900">w168518hq</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">开源协议</h2>
          <p className="text-gray-600">
            本项目基于 MIT 协议开源，您可以自由使用、修改和分发。
          </p>
        </div>
      </main>
      
      <footer className="text-center p-4 text-white opacity-80 text-sm">
        <p>© 2026 开发者工具箱 · 开源免费</p>
      </footer>
    </div>
  )
}
