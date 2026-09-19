---
id: SRC-013
title: "Software Architecture Meets LLMs: A Systematic Literature Review"
original_url: https://arxiv.org/abs/2505.16697
fetched_at: 2026-09-19
author: Larissa Schmid, Tobias Hey, Martin Armbruster, Sophie Corallo, Dominik Fuchß, Jan Keim, Haoyu Liu, Anne Koziolek (KIT)
date: 2025-05-22
source_type: arXiv systematic literature review
---

# 软件架构遇到 LLM：系统文献综述（摘要与结构提取）

## 范围与方法

系统文献综述（SLR）：LLM 在软件架构领域的使用。分析 18 篇研究文章，回答五个研究问题：
1. LLM 被用于哪些软件架构任务？
2. 它们提供多少自动化？
3. 用了哪些模型与技术？
4. 这些方法如何被评估？
5. 开放问题。

## 主要发现

- LLM 越来越广泛地应用于多种软件架构任务，且常常超过基线。
- **欠探索区域**：从架构设计生成源代码、云原生计算与架构、一致性检查（conformance checking）。
- 当前方法大多只用简单提示（simple prompting）；正在出现结合先进技术精化 LLM 方法的趋势。

## LLM 在架构中的任务类别（四类）

综述发现 LLM 在软件架构中的应用分四类主要任务：
1. 设计决策的分类（classification of design decisions）
2. 设计模式的检测（detection of design patterns）
3. 从需求生成软件架构设计（generation of software architecture design from requirements）
4. 其他架构任务

## 对本文档的意义

- 视角相反但互补：本文看"LLM 帮人做架构"（LLM 作为架构师助手），我们看"架构决策怎么为 LLM 系统做"（架构决定 LLM 在系统里的位置）。两篇合起来构成完整的双向图景。
- 它佐证生态里"纯提示即可"的做法很普遍（大家还在用简单提示），而"从架构设计生成源代码、一致性检查"欠探索。这为我们的模式语言留了位：把控制权、接口、状态位置做成一阶可执行的东西（描述符、契约、门、验证链），正是它说的"先进技术"方向，且 POMASA 已经实践。
- SLR 的对象是"用 LLM 做架构"，评价维度是自动化程度；没有触及"架构决策本身的分类学"。我们的四维坐标是它的未覆盖区。