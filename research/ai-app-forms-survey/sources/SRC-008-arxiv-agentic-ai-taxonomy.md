---
id: SRC-008
title: "Agentic Artificial Intelligence (AI): Architectures, Taxonomies, and Evaluation of Large Language Model Agents"
original_url: https://arxiv.org/abs/2601.12560
fetched_at: 2026-09-19
author: Arunkumar V, Gangadharan G.R., Rajkumar Buyya
date: 2026-01-18
source_type: arXiv 综述
---

# Agentic AI 综述（摘要提取）

## 主张

AI 从只生成文本走向 Agentic AI：系统作为自主实体，可感知、推理、规划、行动。LLM 不再是被动知识引擎，而是认知控制器（cognitive controllers），组合记忆、工具使用与环境反馈以追求扩展目标。

## 统一分类法（六维）

将 agent 分解为六个模块化维度：**Perception（感知）、Brain（大脑）、Planning（规划）、Action（行动）、Tool Use（工具使用）、Collaboration（协作）**。

用它描述三个转变：
- 从线性推理流程到原生推理时推理模型（reasoning models）。
- 从固定 API 调用到开放标准（MCP）与 Native Computer Use。
- 环境分组：数字操作系统、具身机器人、其他专门领域。

## 开放挑战

行动中的幻觉（hallucination in action）、死循环（infinite loops）、提示注入（prompt injection）。

## 对本文档的意义

- 学术界对 agent 的分类以"内部组件"（感知/大脑/规划/行动/工具/协作）为轴，回答"agent 由什么构成"；与我们的问题"应用形态中三者在哪、接口什么样"互补但不同。
- 它的三个转变（推理模型、MCP/Computer Use、环境）支持我们的判断：AI 与确定性世界的接口正在标准化（MCP）与"界面化"（Computer Use）。
- 综述里"从固定 API 到 MCP 与 Native Computer Use"是接口形态演化的证据链。