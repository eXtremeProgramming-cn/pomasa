# POMASA 模式目录

**Pattern-Oriented Multi-Agent System Architecture**

本目录收录声明式多智能体系统（Declarative Multi-Agent System）的架构模式。这些模式源自对实际运行系统的分析和提炼，可用于指导新的MAS系统建设。

## 模式语言说明

### 格式约定

每个模式采用以下结构描述：

```
# 模式名称

**分类**：[核心/结构/行为/协作/质量]
**必要性**：[必要/推荐/可选]

## 问题

描述该模式要解决的问题。

## 语境

描述该模式适用的场景和前提条件。

## 作用力

列出影响解决方案选择的各种因素（forces），这些因素往往相互制约。

## 解决方案

描述模式的核心解决方案。

## 结果

### 收益
应用该模式带来的好处。

### 代价
应用该模式需要付出的代价。

## 实现指南

具体实现时的建议和注意事项。

## 示例

来自实际系统的示例。

## 相关模式

与其他模式的关系（依赖、互补、替代等）。
```

### 模式分类

- **核心模式**：定义系统基本特征的模式，通常是必要的
- **结构模式**：组织系统静态结构的模式
- **行为模式**：定义系统动态行为的模式
- **协作模式**：协调多Agent协作的模式
- **质量模式**：保障系统质量的模式

### 必要性级别

- **必要**：构建声明式MAS系统必须采用的模式
- **推荐**：强烈建议采用，除非有明确的理由不用
- **可选**：根据具体场景选择是否采用

## 模式一览

### 核心模式

| 模式 | 必要性 | 说明 |
|------|--------|------|
| [Prompt-Defined Agent](./01-prompt-defined-agent.md) | 必要 | 用自然语言蓝图定义Agent行为 |
| [Intelligent Runtime](./02-intelligent-runtime.md) | 必要 | 具有理解和决策能力的运行时环境 |

### 结构模式

| 模式 | 必要性 | 说明 |
|------|--------|------|
| [Reference Data Configuration](./03-reference-data-configuration.md) | 推荐 | 领域知识外置为独立配置 |
| [Filesystem Data Bus](./04-filesystem-data-bus.md) | 推荐 | 用文件系统作为Agent间数据传递机制 |
| [Workspace Isolation](./05-workspace-isolation.md) | 推荐 | 限制Agent只能在指定目录内工作 |

### 行为模式

| 模式 | 必要性 | 说明 |
|------|--------|------|
| [Orchestrated Agent Pipeline](./06-orchestrated-agent-pipeline.md) | 推荐 | 编排多Agent按阶段顺序执行 |
| [Parallel Instance Execution](./07-parallel-instance-execution.md) | 可选 | 并行启动多个Agent实例处理独立任务 |
| [Progressive Data Refinement](./08-progressive-data-refinement.md) | 可选 | 数据经多阶段逐步精炼 |

### 质量模式

| 模式 | 必要性 | 说明 |
|------|--------|------|
| [Embedded Quality Standards](./09-embedded-quality-standards.md) | 推荐 | 在Agent蓝图中嵌入质量标准 |
| [Layered Quality Assurance](./10-layered-quality-assurance.md) | 可选 | 多层次的质量保障机制 |

## 模式关系图

```
                    ┌─────────────────────┐
                    │  Intelligent        │
                    │  Runtime            │
                    └─────────┬───────────┘
                              │ 支撑
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  Prompt-Defined Agent                    │
│                     (核心基础)                           │
└────────────┬────────────────────────────┬───────────────┘
             │                            │
     ┌───────▼───────┐            ┌───────▼───────┐
     │  Reference    │            │  Embedded     │
     │  Data Config  │            │  Quality      │
     └───────┬───────┘            └───────┬───────┘
             │                            │
             ▼                            ▼
┌────────────────────┐          ┌─────────────────────┐
│ Orchestrated Agent │◄─────────│ Layered Quality     │
│ Pipeline           │          │ Assurance           │
└────────┬───────────┘          └─────────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐  ┌──────────────────┐
│Parallel│  │Progressive Data │
│Instance│  │Refinement       │
└───┬───┘  └────────┬─────────┘
    │               │
    └───────┬───────┘
            ▼
    ┌───────────────┐
    │ Filesystem    │
    │ Data Bus      │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ Workspace     │
    │ Isolation     │
    └───────────────┘
```

## 如何使用本目录

### 构建新系统

1. **必要模式**：首先确保采用所有标记为"必要"的模式
2. **评估推荐模式**：根据系统需求评估每个"推荐"模式是否适用
3. **选择可选模式**：根据具体场景选择合适的"可选"模式
4. **组合应用**：参考模式关系图，确保相关模式配合使用

### 理解现有系统

1. **识别模式**：对照模式目录，识别系统中使用了哪些模式
2. **理解变体**：注意系统可能使用了模式的变体形式
3. **发现缺失**：识别可能遗漏的有价值模式

## 版本历史

- **v0.1** (2025-12): 初始版本，提炼自 industry_assessment 系统

## 参考资料

- [声明式多智能体系统架构剖析（第一部分）](../references/declarative-multi-agent-architecture-part1-en.md)
- [声明式多智能体系统架构剖析（第二部分）](../references/declarative-multi-agent-architecture-part2-en.md)
