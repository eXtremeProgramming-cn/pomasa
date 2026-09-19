---
id: SRC-004
title: "MCP (Model Context Protocol) 官方简介"
original_url: https://modelcontextprotocol.io/introduction
fetched_at: 2026-09-19
author: MCP 官方
date: 2026
source_type: 协议官方文档
---

# MCP 官方介绍（全文提取）

## 定义

MCP 是连接 AI 应用到外部系统的开源标准。通过 MCP，AI 应用（Claude、ChatGPT 等）可连接数据源（本地文件、数据库）、工具（搜索引擎、计算器）和工作流（专用提示词）。类比：MCP 是 AI 应用的 USB-C 接口。

## 能做什么

- Agent 访问 Google Calendar 与 Notion，成为更个人化的助手。
- Claude Code 用 Figma 设计生成整个 Web 应用。
- 企业聊天机器人连接组织内多个数据库，用户用聊天做数据分析。
- AI 模型在 Blender 中创建设计并交给 3D 打印机。

## 为什么重要

- 开发者：减少构建或集成 AI 应用/agent 的开发时间与复杂度。
- AI 应用/agent：获得数据源、工具与应用生态，增强能力。
- 终端用户：能力更强的 AI 应用，在必要时代表用户访问数据与执行动作。

## 生态

Claude、ChatGPT、VS Code、Cursor 等广泛支持。构建三类：MCP Servers（暴露数据与工具）、MCP Clients（连接 servers 的应用）、MCP Apps（在 AI 客户端内运行的交互式应用）。

## 对本文档的意义

- MCP 定义了"概率智能访问确定性世界"的标准接口形状：服务器暴露、客户端连接、协议中立。它在上一轮讨论的三机制接口图里是"AIs 对确定性机制"这条接口的标准化形态，且已成为产业事实标准（MaxKB、Deep Research 更新、Manus 生态、dsh 的 MCP 配置全部围绕它）。
- "MCP Apps"是区别于 servers/clients 的第三类产品形态：在 AI 客户端内部运行的交互式应用。这与 dsh 插件形态（Pictor/Auctor/POMASA Studio 是 dsh 上的面板应用）高度类似，值得在分类学中对应。