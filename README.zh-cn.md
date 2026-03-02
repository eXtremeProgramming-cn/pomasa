# POMASA

**面向模式的多智能体系统架构（Pattern-Oriented Multi-Agent System Architecture）**

[ [EN](./README.md) | 中文 ]

## 极简使用教程

```bash
npx add-skill eXtremeProgramming-cn/pomasa
```

然后只需告诉你的 AI 客户端（例如 Claude Code 或 Codex）:

```
帮我创建一个用于分析医疗保健领域 AI 趋势的多智能体研究系统。
```

就这样。智能体会引导你完成其余步骤。

## 目的

POMASA 是一个用于构建声明式多智能体系统的模式语言和生成工具包。

其核心价值主张：**使 AI 能够在模式指导下快速构建新的 MAS 系统**。

## 整体方法

### 问题

在构建多智能体系统时，每个团队都使用自己的方法来构建系统，并使用自己的术语来描述架构。缺乏通用的模式语言导致难以：
- 传播知识
- 重用经验
- 清晰地讨论问题

### 解决方案

POMASA 采用"模式语言 + 生成器"的方法：

1. **模式目录** (`skills/pomasa/pattern-catalog/`)：从真实系统中提取的可重用架构模式，每个模式描述一个特定问题及其解决方案
2. **生成器** (`skills/pomasa/SKILL.md`)：一个指导 AI 基于模式构建新系统的提示

### 架构概览

![POMASA 架构](./pomasa-explained.png)

POMASA 模式分为四个类别（如左侧所示），管理三个架构层：

- **定义层**：蓝图定义智能体行为；参考数据提供领域知识和方法论
- **执行层**：智能运行时执行蓝图；编排器通过阶段化管道协调工作者
- **数据层**：文件系统作为数据总线，数据从素材 → 草稿 → 最终输出逐步完善

### 核心原则

- **模式是知识载体**：将隐性的架构经验转化为显性的、可共享的模式
- **模式有必要性等级**：必需、推荐、可选——系统可以灵活组合
- **AI 是执行者**：AI 读取模式文档，理解设计原则，并生成符合模式的系统
- **持续演进**：随着实践积累添加新模式

## 目录结构

```
pomasa/
├── README.md                     # 本文件
├── skills/
│   └── pomasa/                   # POMASA 技能（可安装）
│       ├── SKILL.md              # 生成器指令
│       ├── user_input_template.md
│       └── pattern-catalog/      # 模式目录
│           ├── README.md
│           ├── COR-01-...
│           ├── STR-01-...
│           ├── BHV-01-...
│           └── QUA-01-...
└── references/                   # 背景阅读材料
    ├── declarative-multi-agent-architecture-part1-en.md
    └── declarative-multi-agent-architecture-part2-en.md
```

## 如何使用

### 方法一：作为技能安装（推荐）

为 Claude Code、Cursor、Cline 和其他兼容智能体安装 POMASA 作为智能体技能：

```bash
npx add-skill eXtremeProgramming-cn/pomasa
```

安装后，只需告诉智能体你想要什么：

```
帮我创建一个用于分析医疗保健领域 AI 趋势的多智能体研究系统。
```

智能体将自动激活 POMASA 技能并引导你完成流程。

### 方法二：直接使用（无需技能安装）

告诉你的 AI 智能体：

```
请阅读 skills/pomasa/SKILL.md，然后帮我创建一个多智能体系统。
```

智能体将：
1. 询问你的项目信息（或者你可以提前准备 `user_input_template.md`）
2. 阅读 pattern-catalog 中的相关模式
3. 根据你的需求选择合适的模式组合
4. 生成完整的系统文件

### 场景：理解或改进现有系统

```
请阅读 skills/pomasa/pattern-catalog/README.md，然后分析 [系统目录] 使用了哪些模式以及可以做出哪些改进。
```

### 场景：学习 MAS 架构

直接阅读 `skills/pomasa/pattern-catalog/` 下的模式文档，学习声明式 MAS 设计原则和最佳实践。

## 模式概览

参见 [skills/pomasa/pattern-catalog/README.md](./skills/pomasa/pattern-catalog/README.md)

## 工具兼容性

POMASA 模式主要使用 Claude Code 编写和测试。这些模式引用了以下常见工具能力：

| 工具类别 | 用途 | Claude Code 示例 |
|---------|------|------------------|
| **文件读取** | 读取文件内容 | `Read` |
| **文件写入** | 创建或覆盖文件 | `Write` |
| **文件编辑** | 修改现有文件 | `Edit` |
| **文件搜索** | 按模式查找文件 | `Glob` |
| **内容搜索** | 在文件中搜索文本 | `Grep` |
| **网络搜索** | 查找网页 | `WebSearch` |
| **网络获取** | 检索网页内容 | `WebFetch` |
| **命令执行** | 运行 shell 命令 | `Bash` |
| **子智能体启动** | 启动子智能体 | `Task` |

**对于其他运行时**（Cursor、Cline、Windsurf 等）：如果你的运行时使用不同的工具名称或没有特定工具，请在你的环境中找到等效工具。模式描述的是*需要什么*能力，而不是*使用哪个特定工具*。

**MCP 工具**：一些模式提到了命名格式为 `mcp__server__tool` 的 MCP（模型上下文协议）工具。这些是特定于支持 MCP 的运行时的。如果你的运行时不支持 MCP，请使用内置的等效工具（例如，使用 `WebSearch` 代替 MCP 搜索工具）。

## 演进计划

POMASA 是一个持续演进的项目：

- 随着更多系统的构建和运行，提取新模式
- 根据实际反馈改进现有模式描述
- 探索不同领域的模式变体和适配
