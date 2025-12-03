# Business-Driven Agent Design

**分类**：结构模式
**必要性**：推荐

## 问题

应该有几个Agent？每个Agent负责什么？

一个常见的错误是按技术角色划分Agent，比如"一个Data Collector、一个Analyzer、一个Reporter"。这种粗粒度划分忽略了业务流程的实际复杂性。例如，用户可能要求数据采集分三步进行：先形成总体感知，再细化问题清单，最后深入采集——这三步有不同的输入输出和执行策略，如果都塞进一个"Data Collector"里，Agent会变得臃肿、难以维护、中间产物不可见。

## 语境

该模式适用于以下场景：

- 业务流程有明确的步骤划分
- 不同步骤有不同的输入、输出、执行策略
- 需要保留和审查各步骤的中间产物
- 希望系统结构清晰、易于理解和维护

## 作用力

- **粒度细 vs 协调成本**：Agent越细，职责越清晰，但协调成本越高
- **业务对齐 vs 技术复用**：紧贴业务可能导致Agent难以复用
- **中间产物 vs 执行效率**：保留中间产物增加I/O，但提高可审查性
- **显式结构 vs 灵活性**：固定的Agent结构清晰，但可能不够灵活

## 解决方案

**Agent的数量和职责划分应跟随业务流程的自然边界，而非技术层面的粗粒度分类。每个业务步骤对应一个Agent，每个Agent有独立的产出目录。**

### 核心原则

1. **一个业务步骤 = 一个Agent**
   - 用户描述的每个有独立目标的步骤，应该是一个独立的Agent
   - 避免"大而全"的通用Agent

2. **每个Agent有明确的单一职责**
   - 输入明确：从哪里读取数据
   - 输出明确：产出什么、写到哪里
   - 职责明确：完成什么任务

3. **每个Agent的产出独立存储**
   - 目录结构反映Agent结构
   - 中间产物可独立审查和复用

### Agent编号规范

**一组Agent = 一个独立目标的完整流程**

每组Agent有自己的Orchestrator和执行序列，组与组之间目标独立、执行时机独立，仅通过数据目录传递中间结果。

**第一组（00-09）**：
```
agents/
├── 00.orchestrator.md      # 第一组的编排器
├── 01.initial_scanner.md   # 按执行顺序编号
├── 02.question_designer.md
├── 03.deep_researcher.md
├── 04.analyzer.md
├── 05.reporter.md
└── 06.quality_checker.md   # 质检是流程的一部分，在主序列中
```

**第二组（10-19）**：目标完全独立的另一套流程
```
agents/
├── 10.orchestrator.md      # 第二组的编排器
├── 11.paper_outliner.md    # 第二组的Agent，按执行顺序编号
├── 12.section_writer.md
└── 13.paper_integrator.md
```

**编号原则**：
- `00`、`10`、`20`...：各组的Orchestrator
- `01-09`、`11-19`、`21-29`...：各组内的Agent，按执行顺序编号
- 每组是一个独立的、完整的流程，有自己的目标
- 组与组之间通过数据目录传递结果，但执行时机和频率独立

**何时需要分组**：
- 两套流程的目标本质不同（如"生成评估报告" vs "撰写学术论文"）
- 执行时机不同（如评估报告每月生成，论文按需撰写）
- 执行频率不同
- 可以独立运行，不需要总是连在一起执行

### 目录结构对应

Agent编号与数据目录对应：

```
data/
├── 01.initial_scan/        # 对应 01.initial_scanner.md 的产出
├── 02.question_list/       # 对应 02.question_designer.md 的产出
├── 03.deep_research/       # 对应 03.deep_researcher.md 的产出
├── 04.analysis/            # 对应 04.analyzer.md 的产出
└── 05.reports/             # 对应 05.reporter.md 的产出
```

## 结果

### 收益

- **结构清晰**：系统结构直接反映业务流程
- **职责明确**：每个Agent做什么一目了然
- **中间产物可见**：每个步骤的产出都可独立审查
- **便于调试**：问题容易定位到具体Agent
- **易于维护**：修改某个步骤只需改对应的Agent
- **支持渐进开发**：可以逐个Agent开发和测试

### 代价

- **Agent数量增加**：可能有较多Agent文件
- **协调复杂度**：Orchestrator需要协调更多Agent
- **可能过度拆分**：简单任务不需要过细的拆分

## 实现指南

### 从用户需求推导Agent结构

**用户输入示例**：
```markdown
**数据采集过程设计**:

分三阶段进行：
1. 采集目标行业基本信息，形成初步总体感知
2. 细化各个功能对应的问题清单
3. 针对每个功能项，展开全面深入的信息采集

所有资料采集完以后，要单独启动一个质检进程。
```

**推导出的Agent结构**：
```
agents/
├── 00.orchestrator.md       # 编排整个流程
├── 01.initial_scanner.md    # 步骤1：初步感知
├── 02.question_designer.md  # 步骤2：问题清单
├── 03.deep_researcher.md    # 步骤3：深入采集
├── 04.analyzer.md           # 分析（用户另有描述）
├── 05.reporter.md           # 报告（用户另有描述）
└── 10.quality_checker.md    # 质检（独立流程，用10号段）
```

### 判断是否需要拆分

**应该拆分为独立Agent的信号**：
- 用户明确描述了多个步骤
- 步骤之间有明确的先后依赖
- 步骤的输出是下一步骤的输入
- 步骤的产出有独立审查价值
- 步骤可能需要独立重跑

**不需要拆分的情况**：
- 步骤非常简单，几行指令就能完成
- 步骤之间紧密耦合，无法独立存在
- 中间产物没有独立价值

### Blueprint命名规范

```
{序号}.{职责描述}.md

示例：
01.initial_scanner.md      # 初步扫描器
02.question_designer.md    # 问题设计器
03.deep_researcher.md      # 深度调研器
10.quality_checker.md      # 质量检查器
```

命名应体现Agent的业务职责，而非技术角色。

## 示例

### 示例一：单组Agent（industry_assessment）

**用户需求**：
- 数据采集分三阶段：初步感知 → 问题清单 → 深入采集
- 采集后要质检
- 然后分析
- 最后生成报告

**Agent结构**（单组，00-09）：
```
agents/
├── 00.orchestrator.md        # 编排器
├── 01.initial_scanner.md     # 阶段1：产业概况 + 问题清单
├── 02.deep_researcher.md     # 阶段2：深度调研
├── 03.analyzer.md            # 阶段3：分析
├── 04.reporter.md            # 阶段4：报告生成
└── 05.quality_checker.md     # 阶段5：质量检查（流程的一部分）
```

### 示例二：多组Agent（评估+论文撰写）

**场景**：
- 第一组：区域国别评估，每月运行，产出评估报告
- 第二组：学术论文撰写，按需运行，基于评估报告撰写论文

**Agent结构**（两组独立流程）：
```
agents/
# 第一组：区域评估（00-09）
├── 00.orchestrator.md        # 第一组编排器
├── 01.data_collector.md      # 数据采集
├── 02.indicator_analyzer.md  # 指标分析
├── 03.report_generator.md    # 报告生成
│
# 第二组：论文撰写（10-19）
├── 10.orchestrator.md        # 第二组编排器
├── 11.paper_outliner.md      # 论文大纲
├── 12.section_writer.md      # 章节撰写
└── 13.paper_integrator.md    # 论文整合
```

**数据传递**：
```
data/
├── 03.reports/              # 第一组产出：评估报告
│   └── assessment_202503.md
└── 13.paper/                # 第二组产出：学术论文
    └── paper_draft.md       # 基于评估报告撰写
```

两组独立运行：
- 运行第一组：`请使用 agents/00.orchestrator.md 执行区域评估`
- 运行第二组：`请使用 agents/10.orchestrator.md 撰写学术论文`

### 反例：过于粗粒度的设计

**不推荐**：
```
agents/
├── 00.orchestrator.md
├── 01.data_collector.md    # 把三个采集阶段都塞在一起
├── 02.analyzer.md
└── 03.reporter.md
```

**问题**：
- data_collector职责过重
- 初步感知、问题清单、深入采集的中间产物不可见
- 某个阶段出问题需要重跑整个采集
- 难以理解和维护

## 相关模式

- **[Prompt-Defined Agent](./COR-01-prompt-defined-agent.md)**：每个Agent用Blueprint定义
- **[Orchestrated Agent Pipeline](./BHV-01-orchestrated-agent-pipeline.md)**：Agent之间的执行顺序由Pipeline编排
- **[Filesystem Data Bus](./STR-02-filesystem-data-bus.md)**：每个Agent的产出存储在对应目录
- **[Progressive Data Refinement](./BHV-04-progressive-data-refinement.md)**：数据在Agent之间逐步精炼

## 何时不使用此模式

- **极简任务**：只需要一两个步骤的简单任务
- **高度动态的流程**：流程步骤在运行时才能确定
- **紧密耦合的步骤**：步骤之间无法清晰切分
