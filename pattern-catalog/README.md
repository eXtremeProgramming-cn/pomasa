# POMASA 模式目录

**Pattern-Oriented Multi-Agent System Architecture**

本目录收录声明式多智能体系统（Declarative Multi-Agent System）的架构模式。这些模式源自对实际运行系统的分析和提炼，可用于指导新的MAS系统建设。

## 模式语言说明

### 格式约定

每个模式采用以下结构描述：

```
# 模式名称

**分类**：[核心/结构/行为/质量]
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

### 模式分类与编号

模式按类别分组，使用三字母前缀标识：

| 前缀 | 类别 | 说明 |
|------|------|------|
| **COR** | Core (核心) | 定义系统基本特征的模式，通常是必要的 |
| **STR** | Structure (结构) | 组织系统静态结构的模式 |
| **BHV** | Behavior (行为) | 定义系统动态行为的模式 |
| **QUA** | Quality (质量) | 保障系统质量的模式 |

### 必要性级别

- **必要**：构建声明式MAS系统必须采用的模式
- **推荐**：强烈建议采用，除非有明确的理由不用
- **可选**：根据具体场景选择是否采用

## 模式一览

### COR - 核心模式

| 编号 | 模式 | 必要性 | 说明 |
|------|------|--------|------|
| COR-01 | [Prompt-Defined Agent](./COR-01-prompt-defined-agent.md) | 必要 | 用自然语言蓝图定义Agent行为 |
| COR-02 | [Intelligent Runtime](./COR-02-intelligent-runtime.md) | 必要 | 具有理解和决策能力的运行时环境 |

### STR - 结构模式

| 编号 | 模式 | 必要性 | 说明 |
|------|------|--------|------|
| STR-01 | [Reference Data Configuration](./STR-01-reference-data-configuration.md) | 推荐 | 领域知识外置为独立配置 |
| STR-02 | [Filesystem Data Bus](./STR-02-filesystem-data-bus.md) | 推荐 | 用文件系统作为Agent间数据传递机制 |
| STR-03 | [Workspace Isolation](./STR-03-workspace-isolation.md) | 推荐 | 限制Agent只能在指定目录内工作 |
| STR-04 | [Business-Driven Agent Design](./STR-04-business-driven-agent-design.md) | 推荐 | Agent划分跟随业务流程，按执行顺序编号 |
| STR-05 | [Composable Document Assembly](./STR-05-composable-document-assembly.md) | 推荐 | 长文档分章节生成，格式规范，机械拼接 |

### BHV - 行为模式

| 编号 | 模式 | 必要性 | 说明 |
|------|------|--------|------|
| BHV-01 | [Orchestrated Agent Pipeline](./BHV-01-orchestrated-agent-pipeline.md) | 推荐 | 编排多Agent按阶段顺序执行 |
| BHV-02 | [Faithful Agent Instantiation](./BHV-02-faithful-agent-instantiation.md) | 必要 | 调用Agent时必须让其读取完整Blueprint，每个任务独立调用 |
| BHV-03 | [Parallel Instance Execution](./BHV-03-parallel-instance-execution.md) | 可选 | 并行启动多个Agent实例处理独立任务 |
| BHV-04 | [Progressive Data Refinement](./BHV-04-progressive-data-refinement.md) | 可选 | 数据经多阶段逐步精炼 |

### QUA - 质量模式

| 编号 | 模式 | 必要性 | 说明 |
|------|------|--------|------|
| QUA-01 | [Embedded Quality Standards](./QUA-01-embedded-quality-standards.md) | 推荐 | 在Agent蓝图中嵌入质量标准 |
| QUA-02 | [Layered Quality Assurance](./QUA-02-layered-quality-assurance.md) | 可选 | 多层次的质量保障机制 |
| QUA-03 | [Verifiable Data Lineage](./QUA-03-verifiable-data-lineage.md) | 必要 | 全链路可验证的数据血缘，防范AI幻觉 |

## 模式关系图

```
                    ┌─────────────────────┐
                    │  COR-02             │
                    │  Intelligent        │
                    │  Runtime            │
                    └─────────┬───────────┘
                              │ 支撑
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  COR-01                                  │
│                  Prompt-Defined Agent                    │
│                     (核心基础)                           │
└────────────┬────────────────────────────┬───────────────┘
             │                            │
     ┌───────▼───────┐            ┌───────▼───────┐
     │  STR-01       │            │  QUA-01       │
     │  Reference    │            │  Embedded     │
     │  Data Config  │            │  Quality      │
     └───────┬───────┘            └───────┬───────┘
             │                            │
             ▼                            ▼
┌────────────────────┐          ┌─────────────────────┐
│ BHV-01             │◄─────────│ QUA-02              │
│ Orchestrated Agent │          │ Layered Quality     │
│ Pipeline           │          │ Assurance           │
└────────┬───────────┘          └─────────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐  ┌──────────────────┐
│BHV-03 │  │BHV-04            │
│Parallel│  │Progressive Data │
│Instance│  │Refinement       │
└───┬───┘  └────────┬─────────┘
    │               │
    └───────┬───────┘
            ▼
    ┌───────────────┐
    │ STR-02        │
    │ Filesystem    │
    │ Data Bus      │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ STR-03        │
    │ Workspace     │
    │ Isolation     │
    └───────────────┘
```

## 如何使用本目录

### 构建新系统

1. **必要模式**：首先确保采用所有标记为"必要"的模式
   - COR-01, COR-02（核心）
   - BHV-02（行为）
   - QUA-03（质量）
2. **评估推荐模式**：根据系统需求评估每个"推荐"模式是否适用
3. **选择可选模式**：根据具体场景选择合适的"可选"模式
4. **组合应用**：参考模式关系图，确保相关模式配合使用

### 理解现有系统

1. **识别模式**：对照模式目录，识别系统中使用了哪些模式
2. **理解变体**：注意系统可能使用了模式的变体形式
3. **发现缺失**：识别可能遗漏的有价值模式

## 版本历史

- **v0.2** (2025-12): 重构模式编号，按类别分组（COR/STR/BHV/QUA）
- **v0.1** (2025-12): 初始版本，提炼自 industry_assessment 系统

## 参考资料

- [声明式多智能体系统架构剖析（第一部分）](../references/declarative-multi-agent-architecture-part1-en.md)
- [声明式多智能体系统架构剖析（第二部分）](../references/declarative-multi-agent-architecture-part2-en.md)
