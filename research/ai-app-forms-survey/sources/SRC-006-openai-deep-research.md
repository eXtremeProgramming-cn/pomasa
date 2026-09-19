---
id: SRC-006
title: "Introducing deep research"
original_url: https://openai.com/index/introducing-deep-research/
fetched_at: 2026-09-19
author: OpenAI
date: 2025-02-02（含 2025-2026 更新）
source_type: 官方发布
---

# OpenAI Deep Research（全文提取）

## 定义

ChatGPT 中的 agentic 能力：多步骤网络研究，几分钟完成人类几小时的活。给一个 prompt，ChatGPT 找到、分析并综合数百个在线来源，产出研究分析师水平的综合报告。由 o3 的浏览与数据分析优化版驱动（推理模型 + 浏览器 + Python 工具，端到端强化学习训练）。

## 使用形态

- ChatGPT 消息输入框选择 deep research，可附文件。
- 运行 5-30 分钟，侧栏显示步骤与来源；期间可离开，完成后通知。
- 输出为带引用与思考摘要的报告（每项产出有完整文档、清晰引用）。
- 2026-02 更新：可连接任意 MCP 或 app，可限制只搜索可信站点；实时追踪进度并可中断后用追问精化；2025-07 更新：ChatGPT agent 的一部分，"agent mode"输入查询，visual browser。

## 与传统对比（GPT-4o vs deep research）

同 prompt 对比：GPT-4o 给一人份的薄回答；deep research 给两张跨 20 国的数据表、来源标注与可用的市场建议。比"quick summary"更强的是"well-documented, verified answer，可作为工作产品使用（usable as a work product）"。

## 局限性（官方自述）

可能幻觉、可能把谣言当权威、置信度校准弱、格式错误。

## 对本文档的意义

- Deep Research 是"异步研究 agent"形态的代表：人给目标与标准，AI 独立长时运行，产物是带引用的报告，人验收。与 POMASA 的"研究型 MAS"相似，但以对话为入口、无显式蓝图。
- "Every output is fully documented, with clear citations"对应 QUA-03 可验证血缘；"interrupt to refine"对应人类门。
- 2026 更新后接 MCP，进一步支持"确定性工具作为 AI 的手"。