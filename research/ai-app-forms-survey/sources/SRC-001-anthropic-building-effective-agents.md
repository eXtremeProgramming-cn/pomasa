---
id: SRC-001
title: "Building effective agents"
original_url: https://www.anthropic.com/engineering/building-effective-agents
fetched_at: 2026-09-19
author: Erik S. and Barry Zhang (Anthropic)
date: 2024-12-19
source_type: engineering blog
---

# Building effective agents（全文提取）

## 核心分类：Workflows vs Agents

- **Workflows**：LLM 与工具通过预定代码路径编排的系统（LLM 由确定性代码调度）。
- **Agents**：LLM 动态引导自身流程与工具使用、控制如何完成任务的系统。

## 原始构建块：Augmented LLM

LLM 增强（augmentation）三类：检索（retrieval）、工具（tools）、记忆（memory）。实现增强的一种途径是 MCP（Model Context Protocol）。

## 五种 Workflow 模式

1. **Prompt chaining（提示链）**：任务分解为顺序步骤，每个 LLM 调用处理前一步输出，可在中间步骤加程序化检查（gate）。适用：任务可干净分解为固定子任务。
2. **Routing（路由）**：分类输入并导向专门的后续任务。适用：不同类别的输入宜分开处理。
3. **Parallelization（并行化）**：两种变体。Sectioning（切分，分解为独立子任务并行）与 Voting（投票，同任务多次运行取多样输出）。
4. **Orchestrator-workers（编排者-工作者）**：中央 LLM 动态分解任务、委派给 worker LLM、综合结果。与并行化关键区别是子任务不预定义。
5. **Evaluator-optimizer（评估者-优化者）**：一个 LLM 生成、另一个评估并反馈，循环迭代。

## Agents

开始于人的命令或与人的交互讨论；任务明确后独立计划与操作，可能回到人处获取信息或判断。执行中每步须从环境获取 ground truth（工具调用结果、代码执行）以评估进展。可在检查点或遇到阻碍时暂停等待人工反馈。

## 工具设计原则（ACI：Agent-Computer Interface）

- 与 HCI 投入同等精力设计 ACI。
- 工具定义要好到"junior developer 能直接用"：含示例用法、边界情况、输入格式要求、与其他工具的边界。
- 测试模型如何使用工具；poka-yoke 工具参数，使其更难出错。

## 对本文档的意义

- 确立了"workflow vs agent"的产业级二分法，可作为应用形态分类轴之一（按控制权在确定性代码还是 LLM 手中）。
- 五个 workflow 模式是"确定性软件在 agentic 系统中的编排队形"，正好落在"人与 AI 与确定性代码三者接口"的讨论里：gate、目录结构、编排者模式都定义了确定性代码与概率智能之间的接口形状。
- Agent 定义中的"回到人处（checkpoint 暂停）"与 POMASA 的 gated 状态高度同构。