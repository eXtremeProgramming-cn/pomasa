---
id: SRC-017
title: "Meaningful Human Control Over Autonomous Systems: A Philosophical Account"
original_url: https://research.tudelft.nl/en/publications/meaningful-human-control-over-autonomous-systems-a-philosophical- （PMC 版 https://pmc.ncbi.nlm.nih.gov/articles/PMC7806098/）
fetched_at: 2026-09-19
author: Filippo Santoni de Sio, Jeroen van den Hoven (TU Delft)
date: 2018
source_type: 哲学论文（Frontiers in Robotics and AI, DOI 10.3389/frobt.2018.00015, 被引 900+）
---

# Meaningful Human Control：哲学进路（摘要与核心结构）

## 问题背景

自主武器系统辩论中引入"有意义的人类控制"（meaningful human control, MHC）原则：根据该原则，**最终应由人而不是计算机及其算法对（致命）军事行动的相关决策保持控制，并因此承担道德责任**。政策制定者与设计者缺乏对 MHC 具体含义的详细理论。

## 方法

基于自由意志与道德责任哲学辩论中的"引导控制"（guidance control）概念，遵循"负责任创新"（Responsible Innovation）与"价值敏感设计"（Value-sensitive Design）理想，把 MHC 表述为**设计需求**（design requirements）形式。

## 两个必要条件

1. **跟踪条件（tracking condition）**：系统应能回应两件事：设计并部署系统的人的相关道德理由（moral reasons），以及系统运行环境中的相关事实（relevant facts in the environment）。
2. **追溯条件（tracing condition）**：系统应被设计为总能把运行结果追溯回设计链与运行链上的**至少一个具体的人**（grant the possibility to always trace back the outcome of its operations to at least one human along the chain）。

## 延伸

论文最后开始探索该框架对非军事自主系统（如自动驾驶）设计与使用的影响。

## 对本文档的意义

- 这是"人在环/控制权"哲学层面的正典文献，我们论文的锚点之一（已在调研计划中）。
- tracking + tracing 两条件可以工程化映射到我们的模式语言：
  - tracking（系统回应设计者的道德理由与环境事实）对应"契约"与"检索锚定"：契约把人的理由写下来约束系统，锚定让系统回应环境事实而非自由发挥。
  - tracing（结果可追溯回具体的人）对应"人即门"与"血缘"：门的放行记录、产物的引用与来源，把责任落回具体的人。Deep Research 带引用、POMASA 的 QUA-03 血缘、Auctor 的文件事实都是 traceability 的工程实现。
- 与 D1 的关系：MHC 认为控制权无论自主性多高都必须最终能追溯回人。这支持我们光谱的连续性立场：自治循环不等于无人负责，自治与问责是正交的两个轴（对应我们 D1 与 D3 的部分独立）。
- 缺口：这是哲学与伦理层面的设计需求，没有给出工程模式；我们要做的是把它落成可执行的模式语言（这正是"哲学立场 → 工程模式"的桥）。