---
id: SRC-016
title: "A Model for Types and Levels of Human Interaction with Automation"
original_url: https://ieeexplore.ieee.org/document/844354
fetched_at: 2026-09-19
author: Raja Parasuraman, Thomas B. Sheridan, Christopher D. Wickens
date: 2000
source_type: 经典论文（IEEE SMC Part A）
---

# 人类与自动化交互的类型与等级模型（摘要与四阶段提取）

## 定位

人因工程（human factors）领域的经典模型，发表于 2000 年，被引 6000+。是"自动化等级"（Levels of Automation, LOA）研究的源头之一，为自动化设计提供框架和客观依据。

## 核心结构：两维模型

**等级（levels）** × **阶段（stages）**：

四个阶段（自动化可以在哪些环节介入）：
1. **信息获取（information acquisition）**：传感器、数据的采集与组织。
2. **信息分析（information analysis）**：数据的解读、推理、预测。
3. **决策选择（decision selection）**：在方案之间做选择。
4. **行动实施（action implementation）**：执行所选动作。

每个阶段有 10 级自动化（levels），从"人完全执行"到"机器完全自主"（Sheridan-Verplanck 谱系），中间各级是人与机器不同程度的配合（如机器建议人批准、机器执行人否决等）。

## 关键结论（人类绩效后果）

- 不同阶段、不同等级的自动化对**人的绩效影响**不同，且不一定都是增益。
- 高等级自动化（尤其信息分析与决策选择阶段）可能导致：**out-of-the-loop（OOTL）效应**，人脱离回路，情景意识下降、技能衰退、对意外的监控失灵。
- 设计选择应基于任务对人的需求、失误代价、自动化可靠性等做**客观评估**，而非盲目追求"更高自动化"。

## 对本文档的意义

- 这是"控制权光谱"在 AI 时代之前的正典表述：等级 × 阶段模型就是 D1（控制权）与"流程环节"的二维展开。
- 关键思想直接预先回应我们的 D1：自动化程度是一个**设计决策**（deliberate design decision），不是自动化的必然回报。这几乎逐字对应 MATTERS（SRC-011）的立场，也对应我们要写的模式语言立场。可见这条脉络从 2000 年绵延至今。
- OOTL 效应（人脱离回路导致情景意识与技能衰退）支持我们"人即门"模式里的"门疲劳、门虚设"误用条目，也为"人不在环"取值提供了风险警告：不是所有任务都适合把门撤掉，技能保持（deskilling）是真实代价。
- 缺口：它研究的是"单操作员 + 自动化系统"的人因绩效，没有处理多智能体、语义开放任务（LLM 生成）、契约与验证等新型问题。我们把它从"人因评估模型"推进为"可执行的模式语言"。