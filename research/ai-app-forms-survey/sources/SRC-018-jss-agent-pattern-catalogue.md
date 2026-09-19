---
id: SRC-018
title: "Agent design pattern catalogue: A collection of architectural patterns for foundation model based agents"
original_url: https://www.sciencedirect.com/science/article/pii/S0164121224003224
fetched_at: 2026-09-19
author: Yue Liu, Sin Kit Lo, Qinghua Lu, Liming Zhu, Dehai Zhao, Xiwei Xu, Stefan Harrer, Jon Whittle
date: 2024-11（JSS Volume 220, 2025, 112278, DOI 10.1016/j.jss.2024.112278）
source_type: 期刊论文（Journal of Systems and Software），被引 89
---

# Agent 设计模式目录：基座模型智能体的架构模式集（全文提取）

## 定位

这篇是与我们的工作目标最接近的既有研究之一：用系统文献综述（SLR，57 篇论文）+ 灰色文献 + 真实应用审查，提取 18 个面向基座模型（FM）智能体的架构模式，每个模式分析 context / forces / trade-offs / known uses / 与其它模式的关系，并提出决策模型供架构师选择模式。模式模板采用 Meszaros & Doble (1997) 的扩展模式模板，与我们用的 POMASA/PLoP 模板同源。

## 问题背景（他们看到的挑战）

- 缺系统化知识来指导实践者设计智能体：目标追寻（产生工具性目标与计划）、基座模型的幻觉、推理过程的可解释性、复杂问责（accountability）等。
- Agents 的两个含义：(i) 代表他人行动的 AI；(ii) 能主动行动产生效果以达成用户目标的 AI。本文聚焦后者。
- 多智能体系统还需要额外考虑智能体间协调（串通 collusion、相关性故障 correlated failures）。

## 18 个模式清单（完整）

| 模式 | 一页摘要 | 质量属性 |
|---|---|---|
| Passive goal creator | 通过对话界面分析用户明示的提示词 | 交互性、目标追寻、效率 |
| Proactive goal creator | 通过工具捕获多模态上下文来预判用户目标 | 交互性、目标追寻、可及性 |
| Prompt/response optimiser | 按期望的输入输出内容与格式优化提示词/响应 | 标准化、目标对齐、互操作、适应性 |
| Retrieval augmented generation | 增强知识可更新性，保持本地数据隐私 | 知识可更新性、数据隐私 |
| One-shot model querying | 单次访问基座模型生成全部计划步骤 | 成本效率、简单性 |
| Incremental model querying | 计划生成每步都访问基座模型 | 补充上下文、推理确定性、可解释性 |
| Single-path plan generator | 编排通向目标的中间步骤序列 | 推理确定性、连贯性、效率 |
| Multi-path plan generator | 每步允许多个选择多路径 | 推理确定性、连贯性、人对偏好对齐、包容性 |
| Self-reflection | 智能体自我生成反馈精化计划 | 推理确定性、可解释性、持续改进、效率 |
| Cross-reflection | 用其它智能体/模型提供反馈 | 推理确定性、可解释性、包容性、可扩展性 |
| Human reflection | 收集人类反馈精化计划 | 人对偏好对齐、可争议性、有效性 |
| Voting-based cooperation | 多智能体投票达成共识 | 公平、问责、集体智能 |
| Role-based cooperation | 分配角色分层协作 | 分工、容错、可扩展、问责 |
| Debate-based cooperation | 多智能体辩论直至共识 | 适应性、可解释性、批判性思维 |
| Multimodal guardrails | 控制基座模型输入输出符合要求 | 鲁棒性、安全、标准对齐、适应性 |
| Tool/agent registry | 统一的工具/智能体注册发现源 | 可发现性、效率、工具恰当性、可扩展性 |
| Agent adapter | 连接智能体与外部工具的接口 | 互操作、适应性、降低开发成本 |
| Agent evaluator | 按需求与指标测试评估智能体 | 功能适合性、适应性、灵活性 |

## 生态图（Fig. 2）揭示的组件关系

用户交互 → (passive/proactive goal creator) 形式化目标 → prompt/response optimiser 精化提示 → RAG 取上下文 → (single/multi-path plan generator) 分解计划 → (one-shot/incremental model querying) 查询模型 → (self/cross/human reflection) 审阅计划 → (tool/agent registry + agent adapter) 调工具/子智能体 → (voting/role/debate) 多智能体协作 → (multimodal guardrails) 管控 I/O → agent evaluator 设计时与运行时评估。

## 对本文档的意义

- 这是主流学术文献里最接近"AI 应用形态模式语言"的先行者：模式格式、trade-off 分析、known uses、决策模型，都是我们想做的。**区别在视角**：它的一切模式都发生在"智能体内部部件"层面，模式服务于"如何造一个更好的智能体"；我们不谈智能体内部，我们谈"AI、人、确定性软件三者在一个完整信息系统中的分工与接口"，粒度完全不同（系统级而非智能体内部）。
- 它的决策模型基于软件质量属性（quality attributes）：每个模式关联一组质量属性权衡。我们的四维坐标（D1 控制权、D2 接合、D3 人的位置、D4 状态位置）可作为它的顶层决策轴：先定四维坐标，再在智能体内部选它的 18 个模式。
- 它明确把"human reflection"只当作精化计划的反馈机制之一（三选一），没有"门"的系统概念、没有验证阶梯、没有专门的确定性软件职责。我们的「人即门」「确定性机制工作清单」是它未覆盖的层。
- 现实定位：这篇是 2024 年完成的、以 2024 年前生态为素材。此后一年（2024-11 到 2026 初）的演化（AI-native 框架、MCP 生态、agent 终端规模化、企业编排层）不在它的视野内，恰是我们素材库覆盖的增量。
- 论文最后提到用「决策模型」帮架构师选择模式，并分享研究项目中的模式应用经验。我们要跟踪：他们的模式在真实项目里的检验结果如何（这是 PLoP 论文常被诘问的点）。