# POMASA Web界面 - 技术选型与研发计划

## 技术选型

### 架构模式
**本地Web服务器架构**
```
┌──────────────────────────────────────────┐
│  浏览器 (localhost:5173)                  │
│  ┌─────────────────────────────────────┐ │
│  │  React + TypeScript 前端             │ │
│  └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘
                    ↕ HTTP/WebSocket
┌──────────────────────────────────────────┐
│  Node.js 后端 (Express)                   │
│  ├─ 文件系统操作 (读取/写入MAS)            │
│  ├─ Claude Code 进程管理                  │
│  └─ WebSocket 实时输出                    │
└──────────────────────────────────────────┘
                    ↕
┌──────────────────────────────────────────┐
│  本地文件系统                             │
│  └─ MAS目录 (agents/, references/, data/) │
└──────────────────────────────────────────┘
```

### 技术栈选择

| 层次 | 技术选择 | 理由 |
|------|---------|------|
| **前端框架** | React 18 + TypeScript | 生态丰富，Claude理解好 |
| **构建工具** | Vite | 快速开发体验 |
| **CSS框架** | Tailwind CSS | 快速开发 |
| **后端框架** | Express.js + TypeScript | 简单稳定 |
| **Markdown渲染** | react-markdown + remark-gfm | 支持GFM格式 |
| **图标** | lucide-react | 轻量美观 |
| **终端输出** | xterm.js | 显示Claude Code输出（待实现） |
| **进程管理** | Node child_process | 调用Claude Code |

### Claude Code调用方案

**核心原则**：本地单用户，继承系统已有认证，完全自动化执行

```
Web后端 (Node.js)
    │
    ├─ child_process.spawn('claude', [...args])
    │   - 直接调用系统安装的 claude 命令
    │   - 自动继承 ~/.claude/ 下的认证信息
    │   - 无需额外配置API Key
    │   - 使用 --dangerously-skip-permissions 跳过所有确认
    │
    ├─ 创建MAS时的调用：
    │   claude --dangerously-skip-permissions -p "
    │     请阅读 {POMASA_PATH}/generator.md 了解如何创建MAS。
    │     POMASA框架位于: {POMASA_PATH}
    │     用户输入如下:
    │     {USER_INPUT}
    │     请在 {TARGET_DIR} 目录下创建MAS。
    │   " --cwd /目标目录
    │
    └─ 运行MAS时的调用：
        claude --dangerously-skip-permissions -p "执行这个MAS的orchestrator" --cwd /mas目录
```

**关键参数**：
- `--dangerously-skip-permissions`：跳过所有权限确认，完全自动化执行
- `--print` 或 `-p`：非交互模式，直接执行prompt
- `--cwd`：指定工作目录
- `--output-format stream-json`：获取结构化的流式输出（方便解析进度）

**创建MAS时传递的信息**：
- `POMASA_PATH`：web/data/ 目录的绝对路径（包含 generator.md、patterns/ 等）
- `USER_INPUT`：用户在表单中填写的内容
- `TARGET_DIR`：用户选择的MAS创建目标目录

### 路径约定

```
pomasa/
├── generator.md                 # MAS生成器prompt
├── user_input_template.md       # 用户输入模板
├── pattern-catalog/             # 模式目录（源文件）
└── web/                         # Web应用目录（自包含）
    ├── data/                    # 打包进来的框架数据
    │   ├── patterns/            # 从 pattern-catalog/ 复制
    │   ├── generator.md         # 从上级复制
    │   └── user_input_template.md
    └── ...
```

**框架信息获取**（Web应用自包含，不向上访问父目录）：
- 构建时：通过脚本将 `pattern-catalog/`、`generator.md`、`user_input_template.md` 复制到 `web/data/`
- 运行时：后端只访问 `web/data/` 目录下的文件
- `GET /api/framework/patterns` - 读取 `web/data/patterns/`
- `GET /api/framework/template` - 读取 `web/data/user_input_template.md`
- `GET /api/framework/generator` - 读取 `web/data/generator.md`

**同步脚本**（`npm run sync-data`）：
```bash
# 将pomasa框架文件同步到web/data/
cp -r ../pattern-catalog ./data/patterns
cp ../generator.md ./data/
cp ../user_input_template.md ./data/
```

---

## 已实现功能

### 第一阶段：查看已有MAS ✅

1. **首页**
   - 两个大按钮：「查看已有MAS」和「新建MAS」
   - 点击「查看已有MAS」打开系统文件夹选择对话框

2. **MAS查看器** (`/view?path=xxx`)
   - 左侧：目录树（支持展开/折叠）
   - 右侧：文件内容预览
   - Markdown文件渲染（支持GFM）
   - 其他文件显示原始内容

3. **后端API**
   - `POST /api/dialog/select-folder` - 打开macOS文件夹选择对话框
   - `GET /api/mas/info?path=xxx` - 获取MAS目录结构
   - `GET /api/mas/file?path=xxx` - 读取文件内容

---

## 待实现功能

### 第二阶段：创建新MAS（暂不实现）

### 第三阶段：运行MAS（暂不实现）

---

## 启动命令

```bash
cd pomasa/web
npm install
npm run dev  # 同时启动前后端
```

- 前端：http://localhost:5173/
- 后端：http://localhost:3001
