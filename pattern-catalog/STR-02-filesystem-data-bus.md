# Filesystem Data Bus

**分类**：结构模式
**必要性**：推荐

## 问题

Agent之间如何传递数据？

多Agent系统中，Agent之间需要交换数据。传统方案（API调用、消息队列、共享数据库）需要额外基础设施、复杂配置和网络编程。AI多Agent系统需要一种与运行时自然契合、完全可追溯、人类可读可编辑、部署简单的方案。

## 语境

该模式适用于以下场景：

- 批量处理任务（非实时系统）
- 需要完全可追溯和可审计
- 希望人类能直接查看和编辑中间结果
- 运行时环境提供良好的文件系统工具支持
- 数据量中等，不需要复杂查询

## 作用力

- **简单性 vs 功能性**：文件系统简单，但缺少事务、查询等高级功能
- **透明性 vs 性能**：所有数据可见带来透明，但I/O开销较大
- **松耦合 vs 实时性**：通过文件松耦合，但难以支持实时通信
- **人类可读 vs 机器效率**：文本格式人类友好，但处理效率较低

## 解决方案

**使用文件系统作为数据传递媒介。Agent通过约定的文件路径读写JSON和Markdown文件，不直接通信。**

### 目录结构反映数据流

```
data/
├── {TIME_PERIOD}/           # 按时间周期分区
│   ├── 01.materials/        # 阶段一输出：原始数据
│   │   ├── {entity_1}/      # 按处理实体分区
│   │   ├── {entity_2}/
│   │   └── ...
│   │
│   ├── 02.analysis/         # 阶段二输出：分析结果
│   │   └── ...
│   │
│   └── 03.reports/          # 阶段三输出：最终报告
│       └── ...
```

### 核心设计原则

1. **目录结构即数据流**
   - 目录层级反映处理阶段
   - 子目录反映数据分区

2. **文件格式约定**
   - 结构化数据使用JSON
   - 文本内容使用Markdown
   - 元信息使用YAML front matter

3. **路径约定**
   - 使用一致的命名规范
   - 路径可从参数推导，无需显式配置

4. **数据不可变性**
   - 每阶段产出新数据，不修改前序数据
   - 保留完整数据演化历史

## 结果

### 收益

- **极致简单**：不需要中间件，零配置
- **完全可审查**：所有数据可见、可追溯
- **人类可读**：JSON和Markdown格式直接可读
- **AI运行时友好**：自然契合Claude Code的文件工具
- **版本控制友好**：可用Git管理数据版本
- **零配置协作**：通过目录约定而非显式配置实现协作

### 代价

- **并发控制弱**：无锁机制，需通过设计避免冲突
- **查询能力有限**：无法像数据库那样复杂查询
- **性能较低**：文件I/O比内存操作慢
- **事务性差**：无法保证原子性操作
- **实时性受限**：不适合需要即时通信的场景

## 实现指南

### 目录命名约定

```
# 阶段目录：数字前缀表示顺序
01.materials/     # 阶段一
02.analysis/      # 阶段二
03.reports/       # 阶段三

# 实体目录：使用ID或规范化名称
org_1/            # 组织1的数据
org_2/            # 组织2的数据

# 特殊目录
wip/              # 工作进度记录
references/       # 参考数据（不属于数据流）
```

### 文件命名约定

```
# 主数据文件：描述性名称
activities.json       # 活动数据
basic_profile.md      # 基本概况

# 来源清单：统一命名
source_list.md        # 该目录数据的来源清单

# 检查报告：统一命名
quality_check_report.md   # 质量检查报告

# 最终产出：统一命名
final_report.md       # 最终报告
executive_summary.md  # 执行摘要
```

### Blueprint中的路径引用

```markdown
## 输出要求

**输出位置**：`data/{INDUSTRY_ID}/01.materials/01.industry_overview/`

**输出格式**：
```
data/{INDUSTRY_ID}/01.materials/01.industry_overview/
├── basic_profile.md          # 产业基本概况
├── ownership_structure.md    # 所有制结构概况
├── policy_environment.md     # 政策环境概况
├── development_history.md    # 发展历程概况
└── source_list.md            # 来源清单
```

[注：路径使用参数占位符，执行时替换为实际值]
```

### 避免写入冲突

通过数据分区避免多Agent同时写入同一文件：

```
# 并行执行时，每个Agent写入不同目录
Agent_1 → data/2025-09/raw/org_1/
Agent_2 → data/2025-09/raw/org_2/
Agent_3 → data/2025-09/raw/org_3/
...
```

### 双文件模式

对于重要数据，可采用"双文件"模式：

```
{entity}/
├── data.json       # 机器可读的结构化数据
└── sources.md      # 人类可读的来源说明
```

## 示例

### 来自 industry_assessment 系统

**数据目录结构**：
```
data/
└── evtol/                           # 产业ID
    ├── 01.materials/                # 原始材料
    │   ├── 01.industry_overview/    # 产业概况
    │   │   ├── basic_profile.md
    │   │   ├── ownership_structure.md
    │   │   └── source_list.md
    │   │
    │   ├── 02.question_list/        # 问题清单
    │   │   ├── overview.md
    │   │   ├── dimension_1_ownership.md
    │   │   └── ...
    │   │
    │   └── 03.deep_research/        # 深度调研
    │       ├── 1.1_control_strategic_sectors/
    │       │   ├── policies.md
    │       │   ├── statistics.md
    │       │   ├── cases.md
    │       │   └── source_list.md
    │       └── ...
    │
    ├── 02.analysis/                 # 分析结果
    │   ├── functions/               # 功能项分析
    │   ├── features/                # 特征综合
    │   ├── dimensions/              # 维度综合
    │   └── overall_synthesis.md
    │
    └── 03.reports/                  # 最终报告
        ├── final_report.md
        └── executive_summary.md
```

**数据流转**：
```
Initial Scanner → 01.materials/01.industry_overview/
                → 01.materials/02.question_list/

Deep Researcher → 01.materials/03.deep_research/

Analyzer        → 02.analysis/functions/
                → 02.analysis/features/
                → 02.analysis/dimensions/
                → 02.analysis/overall_synthesis.md

Reporter        → 03.reports/final_report.md
                → 03.reports/executive_summary.md
```

## 相关模式

- **[Reference Data Configuration](./STR-01-reference-data-configuration.md)**：Reference Data也存储在文件系统中，但位于`references/`而非`data/`
- **[Workspace Isolation](./STR-03-workspace-isolation.md)**：限制Agent只能访问特定目录
- **[Progressive Data Refinement](./BHV-04-progressive-data-refinement.md)**：数据在目录间流转时逐步精炼
- **[Parallel Instance Execution](./BHV-03-parallel-instance-execution.md)**：通过目录分区支持并行写入

## 数据目录分区策略

### 分区维度的选择

**一级目录 = 运行实例的区分维度**

根据任务特性选择合适的一级分区：

| 任务类型 | 分区维度 | 示例 |
|----------|----------|------|
| 周期性任务 | 时间/日期 | `data/2025-12-03/` |
| 多实体任务 | 实体ID | `data/US/`、`data/CN/` |
| 一次性任务 | 无需一级分区 | 直接 `data/01.xxx/` |

**二级目录 = Agent产出的阶段划分**

无论采用何种一级分区，二级目录始终按Agent阶段编号：

```
data/{一级分区}/
├── 01.initial_scan/
├── 02.deep_research/
├── 03.analysis/
└── 04.reports/
```

### 时间分区

**适用场景**：周期性重复运行的任务

- 每周新闻期刊
- 每月市场报告
- 每日数据采集

**目录结构**：
```
data/
├── 2025-12-01/              # 周日期刊
│   ├── 01.news_collection/
│   ├── 02.analysis/
│   └── 03.digest/
├── 2025-12-08/              # 下周日期刊
│   ├── 01.news_collection/
│   └── ...
└── latest -> 2025-12-08/    # 可选：符号链接指向最新
```

**命名规范**：
- 日期格式：`YYYY-MM-DD`（便于排序）
- 月度任务：`YYYY-MM`
- 周度任务：`YYYY-Wxx` 或 `YYYY-MM-DD`（周起始日）

### 实体分区

**适用场景**：同一流程对多个独立实体分别运行

- 区域国别研究（每个国家一次运行）
- 多产业评估（每个产业一次运行）
- 多组织分析（每个组织一次运行）

**目录结构**：
```
data/
├── US/                      # 美国研究
│   ├── 01.data_collection/
│   ├── 02.analysis/
│   └── 03.report/
├── CN/                      # 中国研究
│   ├── 01.data_collection/
│   └── ...
└── JP/                      # 日本研究
    └── ...
```

**命名规范**：
- 使用标准化ID（ISO国家代码、行业代码等）
- 避免使用中文或特殊字符（跨平台兼容性）
- 保持简短但可识别

### 混合分区

**适用场景**：既有周期性，又有多实体

- 每月各国经济指标跟踪
- 每周多产业动态监测

**目录结构**：
```
data/
└── 2025-03/                 # 一级：时间
    ├── US/                  # 二级：实体
    │   ├── 01.collection/
    │   └── 02.report/
    ├── CN/
    └── JP/
```

**选择一级维度的原则**：
- 哪个维度更常作为"一次运行"的单位？→ 作为一级
- 时间周期固定、实体数量变化 → 时间在一级
- 实体固定、时间周期灵活 → 实体在一级

### 一次性任务

**适用场景**：只运行一次，不需要区分实例

**目录结构**：
```
data/
├── 01.initial_scan/
├── 02.deep_research/
├── 03.analysis/
└── 04.reports/
```

无需一级分区，阶段目录直接位于 `data/` 下。

### Blueprint中的参数化

**Orchestrator传递分区参数**：
```markdown
## 执行参数

本次运行的参数：
- INSTANCE_ID: {日期或实体ID，作为一级分区}
- 例如：`2025-12-03` 或 `US`

所有Agent的输出路径均以 `data/{INSTANCE_ID}/` 为根目录。
```

**Agent Blueprint使用参数**：
```markdown
## 输出位置

`data/{INSTANCE_ID}/02.analysis/`

其中 {INSTANCE_ID} 由Orchestrator传入。
```

### 历史数据的引用

当需要引用历史运行结果时：

```markdown
## 输入

**本期数据**：`data/{CURRENT_INSTANCE}/01.collection/`
**上期数据**：`data/{PREVIOUS_INSTANCE}/01.collection/`（如需对比）

Orchestrator在调用时需提供 PREVIOUS_INSTANCE 参数。
```

## 何时不使用此模式

- **实时系统**：需要毫秒级响应
- **高并发写入**：大量Agent同时写入同一数据
- **复杂查询需求**：需要SQL级别的查询能力
- **大数据量**：文件系统I/O成为瓶颈
- **需要事务保证**：必须保证原子性操作
