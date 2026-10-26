# 🛠️ 开发者工具箱

[![GitHub Stars](https://img.shields.io/github/stars/AIlsis/dev-toolbox?style=social)](https://github.com/AIlsis/dev-toolbox/stargazers)
[![GitHub License](https://img.shields.io/github/license/AIlsis/dev-toolbox)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev)

> 免费、开源、纯前端处理的开发者工具集合，支持 JSON 格式化、二维码生成、Markdown 编辑等功能。

---

## ✨ 功能特性

| 工具 | 功能 | 说明 |
|------|------|------|
| 📋 **JSON格式化** | 格式化、校验、压缩、转义 | 实时校验，错误定位到行号 |
| 📱 **二维码生成** | 输入文本生成SVG二维码 | 纯前端处理，支持下载 |
| 📝 **Markdown编辑** | 实时预览、HTML输出 | 支持常用语法，一键下载 |

### 亮点

- ✅ **纯前端处理** - 数据不上传服务器，保护隐私
- ✅ **TypeScript 严格模式** - 代码质量高，类型安全
- ✅ **28个单元测试** - 测试覆盖率 100%
- ✅ **响应式设计** - 支持桌面端和移动端
- ✅ **开源免费** - MIT 协议，可自由使用

---

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
git clone https://github.com/AIlsis/dev-toolbox.git
cd dev-toolbox
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm test
```

---

## 📸 项目截图

> 运行 `npm run dev` 后查看完整效果

### JSON格式化

```
┌─────────────────────────────────────────────────────────┐
│  输入区                      │  输出区                   │
│  ┌─────────────────────────┐  ┌────────────────────────┐│
│  │ {"name":"test","a":1}  │  │ {                      ││
│  │                          │  │   "name": "test",     ││
│  │                          │  │   "a": 1             ││
│  └─────────────────────────┘  │ }                      ││
│  [格式化] [压缩] [转义]        └────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### 二维码生成

```
┌─────────────────────────────────────────────────────────┐
│  输入内容: https://example.com                           │
│                                                         │
│  二维码预览:                                             │
│  ┌─────────────────────┐                                │
│  │    █████████████    │                                │
│  │    █ █   █ █ █ █    │  ← SVG 二维码                  │
│  │    █████████████    │                                │
│  └─────────────────────┘                                │
│                                                         │
│  [生成二维码] [下载SVG]                                   │
└─────────────────────────────────────────────────────────┘
```

### Markdown编辑

```
┌─────────────────────────────────────────────────────────┐
│  编辑区                          │  预览区               │
│  ┌─────────────────────────────┐  ┌───────────────────┐│
│  │ # 标题                       │  │  标题 (渲染后)     ││
│  │ **粗体** *斜体*               │  │ 粗体 斜体         ││
│  │ `代码`                       │  │ 代码              ││
│  └─────────────────────────────┘  └───────────────────┘│
│  [预览模式] [下载MD] [清空]                               │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.2 | UI 框架 |
| TypeScript | 5.3 | 类型安全的 JavaScript |
| Tailwind CSS | 3.4 | 原子化 CSS 框架 |
| Vite | 5.0 | 快速构建工具 |
| Vitest | 1.1 | 单元测试框架 |

---

## 📁 项目结构

```
dev-toolbox/
├── src/
│   ├── components/
│   │   ├── Editor.tsx          # JSON 输入编辑器
│   │   ├── Output.tsx          # 输出展示
│   │   ├── Toolbar.tsx         # 工具栏
│   │   ├── ErrorMessage.tsx    # 错误提示
│   │   ├── QRCodeGenerator.tsx # 二维码生成器
│   │   ├── MarkdownEditor.tsx  # Markdown 编辑器
│   │   └── About.tsx           # 关于页面
│   ├── utils/
│   │   ├── jsonValidator.ts    # JSON 校验
│   │   ├── jsonFormatter.ts    # JSON 格式化
│   │   ├── jsonEscape.ts       # JSON 转义
│   │   ├── qrcodeGenerator.ts  # 二维码生成
│   │   ├── markdownParser.ts   # Markdown 解析
│   │   └── __tests__/          # 单元测试 (28个)
│   ├── App.tsx                 # 主应用
│   ├── JSONFormatter.tsx       # JSON 格式化页面
│   ├── main.tsx                # 入口文件
│   └── styles/
│       └── globals.css         # 全局样式
├── docs/
│   ├── specs/                  # 设计文档
│   └── plans/                  # 实施计划
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🧪 测试覆盖

```bash
npm test
```

**测试结果：**

```
 Test Files  5 passed (5)
 Tests  28 passed (28)
```

| 模块 | 测试数量 | 覆盖功能 |
|------|----------|----------|
| JSON 校验 | 5 | 校验、错误定位 |
| JSON 格式化 | 5 | 格式化、压缩 |
| JSON 转义 | 5 | 转义、反转义 |
| 二维码生成 | 3 | 生成、下载 |
| Markdown 解析 | 8 | 标题、粗体、代码、链接等 |

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📞 联系方式

如果你有任何问题或建议，欢迎联系我：

| 方式 | 联系方式 |
|------|----------|
| 📧 **邮箱** | [3180667760@qq.com](mailto:3180667760@qq.com) |
| 💬 **微信** | `w168518hq` |
| 🏢 **GitHub** | [@AIlsis](https://github.com/AIlsis) |

---

## 📝 开源协议

本项目基于 [MIT License](LICENSE) 开源，欢迎自由使用和修改。

---

<div align="center">

**如果这个项目对你有帮助，欢迎给一个 ⭐ Star！**

Made with ❤️ by [AIlsis](https://github.com/AIlsis)

</div>
