---
id: SRC-009
title: "Introducing Agent Skills"
original_url: https://www.anthropic.com/news/skills
fetched_at: 2026-09-19
author: Anthropic
date: 2025-10-16（2025-12-18 更新）
source_type: 官方发布
---

# Claude Agent Skills（全文提取）

## 定义

Skills 是包含指令、脚本和资源的文件夹，Claude 在需要时加载。Claude 只在任务相关时访问 skill，用于 Excel、品牌规范等专门任务。跨 Claude apps、Claude Code 与 API 使用。

## 特性

- **Composable（可组合）**：skills 叠加，Claude 自动识别需要哪些并协调使用。
- **Portable（可移植）**：同一格式各处用，一次构建多处使用。
- **Efficient（高效）**：只加载需要的最小信息与文件。
- **Powerful（强大）**：skill 可含可执行代码，处理比 token 生成更可靠的编程任务。

## 工作原理

Claude 扫描可用 skills 找相关匹配；匹配时只加载最小信息。SKILL.md 定义。skill-creator skill 提供交互式引导（问工作流、生成目录结构、格式化 SKILL.md、打包资源），无需手动编辑文件。

## 更新（2025-12-18）

组织级管理、partner 目录、Agent Skills 作为开放标准跨平台可移植。

## Claude Code 中

通过插件从 anthropics/skills marketplace 安装；自动加载；可经版本控制分享；手动安装到 `~/.claude/skills`。

## 对本文档的意义

- 用户在工作中已经把 POMASA、stylistics 打包为 skill（见 skills-lock.json），Skills 是"能力打包/分发"形态的产业标准表达。
- skill 介于"对话形态"与"声明式 MAS"之间：它是给概率智能的可加载专长包，含指令+资源+可执行代码，让"确定性代码（脚本）"作为 skill 的一部分被概率智能按需调用。这是"AI 与确定性软件接口"的又一形态：把可执行代码装进自然语言包里。
- "Efficient：只加载需要的"与 dsh 插件免密钥 MCP 种子等"轻量优先"哲学一致。