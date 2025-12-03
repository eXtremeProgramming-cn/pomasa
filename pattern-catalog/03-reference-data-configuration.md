# Reference Data Configuration

**分类**：结构模式
**必要性**：推荐

## 问题

如何为Agent提供领域知识？

AI Agent需要领域知识来正确执行任务。如果将知识硬编码在Agent Blueprint中，会导致Blueprint冗长、知识分散、更新困难，且非程序员无法参与维护。领域知识持续演进，需要验证和审核，必须能够同时服务于AI、开发者和领域专家。

## 语境

该模式适用于以下场景：

- 系统涉及复杂且演化的领域知识
- 多个Agent需要共享同一套知识
- 希望领域专家能直接参与知识维护
- 需要对知识进行版本管理和审核

## 作用力

- **集中 vs 分散**：集中管理便于维护，但可能造成单点故障
- **结构化 vs 灵活性**：结构化便于机器处理，但限制表达自由度
- **完整性 vs 简洁性**：完整的知识库体积大，简洁的可能遗漏
- **通用性 vs 专用性**：通用知识适用范围广，专用知识更精确

## 解决方案

**将领域知识外置为独立的数据文件，与Agent Blueprint分离。Blueprint引用这些文件，Agent在执行时读取并应用知识。**

### 知识分层架构

```
参考数据层次：
├── 元数据层：处理对象的基本信息
│   └── 例：organizations.json（跟踪哪些组织）
│
├── 本体层：概念分类体系
│   └── 例：activity-types.json（活动类型分类）
│
├── 模式层：数据结构定义
│   └── 例：activity-record-template.json（记录格式）
│
└── 规范层：质量标准和写作规范
    └── 例：output-format-guide.md（报告格式指南）
```

### 标准目录结构

```
project/
├── agents/           # Agent蓝图（引用references）
│   └── ...
│
├── references/       # 参考数据（独立管理）
│   ├── research-overview.md      # 研究概述
│   ├── data-sources.md           # 数据来源指南
│   ├── analysis-methods.md       # 分析方法
│   ├── report-template.md        # 报告模板
│   ├── style-guide.md            # 写作风格指南
│   └── [domain-specific-files]   # 领域特定知识
│
└── data/             # 运行时数据
    └── ...
```

## 结果

### 收益

- **灵活性**：修改数据文件即可调整系统行为，无需改Blueprint
- **可维护性**：知识集中管理，变更有迹可循
- **协作友好**：领域专家可直接编辑数据文件
- **可扩展性**：易于添加新的处理对象
- **知识显式化**：隐性知识变为显式、可审核的文档

### 代价

- **性能开销**：每次执行都需读取和解析数据文件
- **验证复杂**：没有编译器检查数据文件正确性
- **依赖管理**：Blueprint与数据文件之间存在隐式依赖
- **表达力受限**：复杂逻辑难以用纯数据表达

## 实现指南

### 数据文件格式选择

| 格式 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| JSON | 结构化数据 | 机器可读、格式严格 | 不支持注释、可读性一般 |
| Markdown | 规范文档 | 人类可读、支持富文本 | 结构不严格 |
| YAML | 配置数据 | 可读性好、支持注释 | 缩进敏感 |

### Blueprint中的引用方式

```markdown
## 前置准备

在开始任务之前，你必须：

1. 阅读 `references/research-overview.md` 了解研究目标
2. 阅读 `references/data-sources.md` 了解数据来源指南
3. 阅读 `references/theoretical_framework.md` 了解理论框架

[注：明确列出需要阅读的参考文件，Agent执行时会先读取这些文件]
```

### 数据文件设计原则

1. **单一职责**：每个文件只包含一类知识
2. **自包含**：文件内容应能独立理解
3. **版本友好**：结构变更应考虑向后兼容
4. **人机兼顾**：既便于AI处理，也便于人类阅读

### 元数据文件示例

```json
// organizations.json - 元数据层
{
  "organizations": [
    {
      "id": "org_1",
      "name": "组织A",
      "official_website": "https://...",
      "category": "government",
      "priority": "high"
    },
    {
      "id": "org_2",
      "name": "组织B",
      ...
    }
  ]
}
```

### 规范文件示例

```markdown
# 报告格式指南

## 标题规范

- 一级标题：使用 # ，全文仅一个
- 二级标题：使用 ## ，用于主要章节
- 三级标题：使用 ### ，用于小节

## 引用规范

- 所有数据必须标注来源
- 引用格式：[来源名称](URL)
- 直接引用使用 > 引用块

## 语言风格

- 使用客观、中性的学术语言
- 避免主观评价词汇
- 保持前后术语一致
```

## 示例

### 来自 industry_assessment 系统

**references目录结构**：
```
references/
├── research-overview.md              # 研究概述
├── data-sources.md                   # 数据来源指南
├── analysis-methods.md               # 分析方法指南
├── report-template.md                # 报告模板
├── theoretical_framework_explained.md     # ESSCC理论框架详解
└── theoretical_framework_literature_review.md  # 文献综述
```

**theoretical_framework_explained.md（节选）**：
```markdown
# ESSCC理论框架详解

## 维度一：所有制结构

### 特征1：公有制主体地位

**定义**：公有制经济在国民经济中占主体地位...

**功能项**：

#### 1.1 控制战略领域
- **含义**：国有经济在关系国民经济命脉的重要行业
  和关键领域保持控制力
- **表现形式**：国有企业在能源、电信、铁路等领域
  的主导地位
- **评估要点**：控制程度、覆盖范围、效率表现

#### 1.2 提供公共产品
...
```

这种设计使得：
- 理论框架可以独立于Agent逻辑演进
- 领域专家可以直接修改理论说明
- 多个Agent可以共享同一套理论框架

## 相关模式

- **[Prompt-Defined Agent](./01-prompt-defined-agent.md)**：Blueprint引用Reference Data
- **[Filesystem Data Bus](./04-filesystem-data-bus.md)**：Reference Data通过文件系统提供给Agent
- **[Embedded Quality Standards](./09-embedded-quality-standards.md)**：规范类Reference Data包含质量标准

## 变体

### 动态Reference Data
某些Reference Data可能需要动态更新（如组织列表），可以设计自动更新机制。

### 分层Reference Data
大型系统可能需要多层Reference Data：全局共享、领域特定、项目特定。

### 外部Reference Data
Reference Data可以从外部系统获取（如API），而非静态文件。
