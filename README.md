# POMASA

**Pattern-Oriented Multi-Agent System Architecture**

## 项目用途

POMASA是一套用于构建声明式多智能体系统（Declarative Multi-Agent System）的模式语言和生成工具。

它的核心价值是：**让AI能够根据模式指导，快速构建新的MAS系统**。

## 总体思路

### 问题

构建多智能体系统时，每个团队都在用自己的方式搭建系统、用自己的术语描述架构。缺乏共同的模式语言使得：
- 知识难以传播
- 经验难以复用
- 问题难以讨论清楚

### 方案

POMASA采用"模式语言+生成器"的方式：

1. **模式目录**（`pattern-catalog/`）：从实际系统中提炼的可复用架构模式，每个模式描述一个特定问题及其解决方案
2. **生成器**（`generator.md`）：引导AI根据模式构建新系统的prompt

### 核心理念

- **模式是知识载体**：将隐性的架构经验显式化为可传播的模式
- **模式有必要性分级**：必要、推荐、可选——系统可以灵活组合
- **AI是执行者**：AI阅读模式文档，理解设计原则，生成符合模式的系统
- **持续演进**：随着实践积累，不断补充新模式

## 目录结构

```
pomasa/
├── README.md                # 本文件
├── generator.md             # MAS生成器prompt
├── user_input_template.md   # 用户输入模板
├── pattern-catalog/         # 模式目录
│   ├── README.md            # 模式一览和使用说明
│   ├── COR-01-prompt-defined-agent.md
│   ├── COR-02-intelligent-runtime.md
│   ├── STR-01-...
│   ├── BHV-01-...
│   ├── QUA-01-...
│   └── ...
└── references/              # 参考资料
    ├── declarative-multi-agent-architecture-part1-en.md
    └── declarative-multi-agent-architecture-part2-en.md
```

## 如何使用Generator

### 场景一：构建新的研究型MAS

**第一步**：复制 `user_input_template.md` 到你的工作目录，填写研究项目信息

**第二步**：向Claude Code发出指令：

```
请阅读 pomasa/generator.md，然后根据 [你的user_input文件路径] 生成多智能体研究系统。
```

Generator会引导AI：
1. 阅读你填写的user_input
2. 阅读pattern-catalog中的相关模式
3. 根据你的需求选择合适的模式组合
4. 生成完整的系统文件

### 场景二：理解或改进现有系统

```
请阅读 pomasa/pattern-catalog/README.md，然后分析 [某系统目录] 使用了哪些模式，有哪些可以改进的地方。
```

### 场景三：学习MAS架构

直接阅读 `pattern-catalog/` 下的模式文档，了解声明式MAS的设计原则和最佳实践。

## 模式概览

详见 [pattern-catalog/README.md](./pattern-catalog/README.md)

## 来源

这些模式提炼自实际运行的多智能体系统，包括：
- industry_assessment：基于ESSCC理论框架的产业分析系统

理论基础见 `references/` 目录下的架构分析文章。

## 演进计划

POMASA是一个持续演进的项目：

- 随着更多系统的构建和运行，提炼新的模式
- 根据实践反馈，完善现有模式的描述
- 探索模式在不同领域的变体和适配
