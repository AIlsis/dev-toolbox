# JSON 格式化工具设计文档

**日期：** 2026-10-26  
**版本：** v1.0  
**状态：** 草案

---

## 1. 项目概述

### 1.1 背景
开发者在日常工作中频繁需要格式化、校验JSON数据。现有工具多为国外网站，访问慢或功能受限。

### 1.2 目标
做一个**免费、开源、快速**的JSON格式化工具，吸引开发者用户，建立技术影响力。

### 1.3 成功标准
- 上线1个月内获得50+ GitHub Star
- 月活用户1000+
- 收到至少3个外包咨询

---

## 2. 功能需求

### 2.1 核心功能

| 功能 | 优先级 | 说明 |
|------|--------|------|
| JSON格式化 | P0 | 输入JSON，格式化输出 |
| JSON校验 | P0 | 检测JSON语法错误，高亮错误位置 |
| JSON压缩 | P0 | 去除空格、换行，压缩为单行 |
| JSON转义 | P1 | 转义/反转义JSON字符串 |

### 2.2 增强功能

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 复制按钮 | P0 | 一键复制格式化结果 |
| 清空按钮 | P0 | 快速清空输入 |
| 错误提示 | P0 | 友好的错误信息 |
| 深色模式 | P1 | 支持深色主题 |
| 历史记录 | P2 | 本地存储最近编辑 |

### 2.3 用户交互
- 左侧输入区，右侧输出区
- 实时格式化（输入即格式化）
- 错误时显示错误行号

---

## 3. 技术架构

### 3.1 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | React 18 + TypeScript | 类型安全 |
| 样式 | Tailwind CSS | 快速开发 |
| 构建 | Vite | 快速打包 |
| 部署 | GitHub Pages | 免费托管 |

### 3.2 项目结构

```
json-formatter/
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── Editor.tsx       # 输入编辑器
│   │   ├── Output.tsx       # 输出展示
│   │   ├── ErrorMessage.tsx # 错误提示
│   │   └── Toolbar.tsx      # 工具栏
│   ├── utils/
│   │   ├── jsonFormatter.ts # 格式化核心
│   │   ├── jsonValidator.ts # 校验核心
│   │   └── clipboard.ts     # 复制功能
│   └── styles/
│       └── globals.css
├── public/
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 3.3 核心模块

#### jsonFormatter.ts
```typescript
export function formatJSON(input: string, indent: number = 2): string
export function minifyJSON(input: string): string
export function escapeJSON(input: string): string
export function unescapeJSON(input: string): string
```

#### jsonValidator.ts
```typescript
export interface ValidationResult {
  valid: boolean;
  error?: {
    message: string;
    line: number;
    column: number;
  };
}

export function validateJSON(input: string): ValidationResult
```

---

## 4. UI/UX 设计

### 4.1 布局设计

```
┌─────────────────────────────────────────────────┐
│  JSON Formatter                      [深色] [🔍] │
├─────────────────────┬───────────────────────────┤
│  输入区             │  输出区                    │
│  ┌─────────────┐    │  ┌─────────────────────┐  │
│  │             │    │  │                     │  │
│  │  原始JSON    │ →  │  格式化后的JSON        │  │
│  │             │    │  │                     │  │
│  └─────────────┘    │  └─────────────────────┘  │
│  [格式化] [清空]     │  [复制] [下载]           │
├─────────────────────┴───────────────────────────┤
│  错误提示：第5行第10列：Unexpected token        │
└─────────────────────────────────────────────────┘
```

### 4.2 配色方案
- 主色：#3B82F6（蓝色）
- 错误色：#EF4444（红色）
- 成功色：#10B981（绿色）
- 背景色：#F9FAFB / #1F2937（深色）

### 4.3 响应式设计
- 桌面端：左右分栏
- 移动端：上下堆叠

---

## 5. 数据流

```
用户输入 → onChange事件 → validateJSON()
                  ↓
         valid? ────→ formatJSON()
                  ↓                    ↓
         显示错误 ←────────────── 更新输出区
```

---

## 6. 错误处理

### 6.1 错误类型

| 错误类型 | 处理方式 |
|----------|----------|
| JSON语法错误 | 高亮错误位置，显示行号 |
| 输入为空 | 显示提示文字 |
| 输入过大 | 提示限制（1MB） |

### 6.2 错误展示
- 在输入区下方显示错误信息
- 错误行号可点击跳转

---

## 7. 测试计划

### 7.1 单元测试
- 格式化功能测试
- 校验功能测试
- 压缩功能测试

### 7.2 集成测试
- 用户交互流程测试
- 复制功能测试

### 7.3 浏览器兼容
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 8. 部署方案

### 8.1 GitHub Pages
```bash
npm run build
npm run deploy
```

### 8.2 域名
- 免费：`yourname.github.io/json-formatter`
- 可选自定义域名

### 8.3 CI/CD
- GitHub Actions 自动部署
- 推送到 main 分支自动构建

---

## 9. 后续迭代

### Phase 2（2周后）
- 添加二维码生成器
- 添加Markdown编辑器

### Phase 3（1月后）
- 添加用户反馈
- 优化SEO

---

## 10. 风险与缓解

| 风险 | 缓解措施 |
|------|----------|
| 大文件处理慢 | 添加文件大小限制 |
| 浏览器兼容性 | 使用Babel转译 |
| 用户量少 | 优化SEO，分享到技术社区 |

---

## 附录

### A. 竞品分析
- jsonformatter.org - 功能全，访问慢
- jsonlint.com - 简洁，广告多
- json.cn - 中文，功能单一

### B. 参考资料
- [JSON规范](https://www.json.org/json-zh.html)
- [React文档](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
