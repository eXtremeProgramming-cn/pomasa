---
id: SRC-015
title: "Humans and Agents in Software Engineering Loops（人在软件循环里的位置）"
original_url: https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html
fetched_at: 2026-09-19
author: Kief Morris (Thoughtworks)
date: 2026-03-04
source_type: 业界文章
---

# Humans and Agents in Software Engineering Loops（全文提取）

## 核心论点

人在 AI 辅助软件开发里不该"完全离开"也不该"逐行检查"，而应该**建设与管理工作循环本身（build and manage the working loop）**，作者称之为"on the loop"（在环上）。

## 循环模型

- **why loop（为什么循环）**：想法 → 工作软件。人在此循环迭代，因为人是产物的受益者。
- **how loop（怎么做循环）**：构建软件的过程，涉及中间产物（代码、测试、工具、基础设施、设计文档）。how loop 内部有多层：最外层特征规格交付，最内层生成与测试代码。

## 三种人在环模式

1. **人在环外（humans outside the loop）**：人只跑 why loop，how loop 全交给 agent（vibe coding、Spec Driven Development 的部分解读）。吸引力：外部质量（能用、不崩、合规、不泄露数据、成本可控）才是人真正关心的；但发现杂乱代码库让 agent 跑得更慢、螺旋更多，内部质量对外部结果有影响。
2. **人在环内（humans in the loop）**：人在最内层（代码生成）做 gatekeeper，逐行检查。问题：人成为瓶颈，agent 生成代码的速度远超人工审查；报告显示开发者花在审查与规格的时间可能超过 AI 节省的时间。
3. **人在环上（humans on the loop）**：人不检查产物，而是建设让 agent 少出错的**harness（马具/驾驶台）**：规格集合、质量检查、工作流指导。通过改进 harness 来改进产物，而不是直接改产物。这被称作 **Harness Engineering（马具工程）**，也即 "middle loop"（中间循环）。

## 三种模式的关键区别

不满意 agent 产出时怎么办：
- in the loop：直接修产物（自己改，或让 agent 改）。
- on the loop：改产生该产物的 harness，让产物自动变好。

## Agentic flywheel（代理飞轮）

下一层：human 指示 agent 管理与改进 harness 本身。给 agent 评估循环表现的信号（测试与评测起步，加入生产数据、用户旅程日志、商业结果扩展）。工作流中每步让 agent 审阅结果并推荐 harness 改进，这是"agent harness 生成改进自身的建议"。交互式起步，以后按风险评分自动批准。最终可能看起来像人完全不在环，但通过工程化的 harness 获得鲁棒甚至反脆弱的持续自改进系统。

## 对本文档的意义

- 这是对 **D3 人的位置** 最贴近的业界思考：on the loop 就是"人作为门的工程化"，harness 就是"蓝图执行/契约"的具体化（规格、质量检查、工作流指导 = 我们的描述符与契约），"改进 harness 而非产物"正是"人即门"审产物与改契约的分野。
- 与我们的模式语言映射：in the loop ≈ D3 全程对话偏监督；on the loop ≈ D3 建模/门（人写 harness、审契约）；outside ≈ D3 不在环。
- "门的退化"（human bottleneck、review theater）被业界明确讨论，与我们的"门会疲劳、门形同虚设"误用条目互证。
- Harness Engineering 这个概念可以收编进我们的模式语言：它就是"确定性软件一侧的工作清单"的实现版本，甚至可以作为我们论文里"确定性机制职责"的别名（我们叫验证阶梯，它叫 harness）。