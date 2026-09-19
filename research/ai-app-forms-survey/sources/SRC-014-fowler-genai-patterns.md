---
id: SRC-014
title: "Emerging Patterns in Building GenAI Products（Fowler 的 GenAI 模式）"
original_url: https://martinfowler.com/articles/gen-ai-patterns/
fetched_at: 2026-09-19
author: Bharani Subramaniam, Martin Fowler (Thoughtworks)
date: 2025-02-25（分批发文，2025 年 1-2 月）
source_type: 业界模式集
---

# Building GenAI Products 中的浮现模式（全文提取）

## 核心论点

从 POC 到生产系统的迁移是 GenAI 产品最大的工程挑战。困难根源：大家把这类产品当作传统事务/分析系统的简单扩展。实际上它们引入了全新问题：幻觉（hallucination）、无界数据访问（unbounded data access）、非确定性（non-determinism）。Thoughtworks 团队用一组反复出现的模式应对这些问题。作者强调：模式没有金标准，何时使用比如何使用更重要。

## 模式清单

1. **Direct Prompting（直接提示）**：最快的起点，把任务直接交给 LLM。约束：LLM 知识是静态训练集、有幻觉、非确定。需要其他模式补足。
2. **Evals（评估）**：是非确定性系统保持在合理边界的核心手段。**Scoring and Judging** 用评判打分（可以是另一个 LLM 或用例测试）；**Example**（few-shot 样例）；**Running the Evals**；Evals 与 Benchmarking 的区分：benchmark 面向模型研发者，evals 面向应用，评估真实世界的性能。
3. **Embeddings（嵌入）**：把文本转成向量用于检索。
4. **Retrieval Augmented Generation (RAG)**：给 LLM 提供训练集之外的信息。**RAG Template（RAG 模板）**：检索相关片段注入提示词。
5. **RAG in Practice**：基础 RAG 的局限，需要一组辅助模式。
6. **Hybrid Retriever（混合检索器）**：向量检索只适合语义相似，结合关键词/结构化检索提升精度。
7. **Query Rewriting（查询重写）**：用户的原始问题往往不是最优检索查询，先重写。可拆分为 HyDE（生成假设答案再检索）与 Multi-Query（一条问题生成多条检索）。
8. **Reranker（重排序）**：初检宽、精排准，用专门的排序模型重新排序。
9. **Guardrails（护栏）**：约束输入输出。三类：LLM 护栏（用另一个 LLM 检查）、嵌入护栏、规则护栏。
10. **Fine Tuning（微调）**：RAG 不足时才值得做；微调模型行为 vs 检索事实的区别（微调学行为不学事实）。

## 对本文档的意义

- 业界（Thoughtworks）对 GenAI 产品的模式化整理，五步演进：Direct Prompting → RAG → (Hybrid Retriever / Query Rewriting / Reranker) → Guardrails → Fine Tuning。
- 它的模式聚焦"如何让 LLM 在确定性边界内干活"（检索、评估、护栏），即我们 D2 接合模式的「管道」「工具」「契约」和「验证」那侧。Guardrails 与我们的「人即门」「检索锚定」同族，Evals 与验证阶梯同族。
- 缺口：完全以"AI 为中心"展开，没有"人"的位置、没有"确定性软件整体架构"的控制权维度。它的模式回答"AI 侧的管道怎么调"，不回答"整个系统控制权放哪"。
- 佐证：非确定性、幻觉、无界访问是需要被约束的核心张力，我们三机制框架里的"验证阶梯"正是回应。