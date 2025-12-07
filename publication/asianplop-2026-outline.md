# POMASA: A Pattern Language for AI-Executable Multi-Agent Systems

## AsianPLoP 2026 投稿论文大纲

### 论文定位

**POMASA is a Pattern Language for constructing Declarative Multi-Agent Systems.**

它既不是"框架"（没有强制的代码结构），也不是"工具"（generator只是一个应用方式）。它的本质就是一套**模式语言**——一组相互关联的设计模式，可以指导（人或AI）构建MAS系统。

### 核心贡献

1. 模式语言的分类体系（COR/STR/BHV/QUA四分法 + 必要性分级）
2. 18个模式的清单，以及核心模式如何组合形成可用的MAS
3. 关键洞察：对于AI运行时环境，模式语言本身就是可执行的

---

## 文章结构

### 1. Introduction

- **问题陈述**：当前MAS开发各自为政，缺乏共同的设计语言
- **AI带来的范式转变**：从"代码精确执行"到"自然语言指导执行"
- **论文贡献预告**：一套可执行的模式语言 + 核心洞察

### 2. Background: The Industry Analysis System

用一个产业分析系统作为贯穿全文的案例：

- 系统目标：基于特定理论框架的产业分析
- 系统规模：8个Agent、完整的数据流水线
- 为什么选择这个案例（复杂度适中、真实运行、可验证）

### 3. The Pattern Language Structure

**3.1 分类体系**

- 四分法：COR（核心）/ STR（结构）/ BHV（行为）/ QUA（质量）
- 必要性分级：必要 / 推荐 / 可选
- 分类矩阵图

**3.2 模式关系网络**

- 模式之间的依赖和增强关系
- 如何从核心模式逐步扩展

### 4. Essential Patterns

共介绍8个模式，按系统构建的逻辑顺序组织：**运行时基础 → Agent定义 → 知识组织 → 协作机制 → 数据流动 → 质量保障**

每个模式用PLoP标准格式：
- **Context** — 适用场景
- **Problem** — 要解决的问题
- **Forces** — 影响解决方案选择的各种因素
- **Solution** — 解决方案
- **Example** — 具体示例（来自产业分析系统）
- **Discussion** — 后果、局限、注意事项

**4.1 COR-02: Intelligent Runtime**
首先要有一个能理解自然语言的运行时（没有这个，后面都不成立）

**4.2 COR-01: Prompt-Defined Agent**
然后才能用自然语言定义Agent

**4.3 STR-01: Reference Data Configuration**
Agent需要的领域知识怎么组织

**4.4 BHV-01: Orchestrated Agent Pipeline**
多个Agent如何协作

**4.5 BHV-02: Faithful Agent Instantiation**
协作时如何正确调用每个Agent

**4.6 STR-02: Filesystem Data Bus**
Agent之间如何传递数据

**4.7 STR-03: Workspace Isolation**
数据传递的安全边界

**4.8 QUA-03: Verifiable Data Lineage**
贯穿全程的数据可信保障

### 5. Applying the Pattern Language

用产业分析系统展示模式的组合应用：

- 最小可用组合：4个必要模式
- 推荐组合：加入8个推荐模式
- 完整组合：产业分析系统的完整模式配置

### 6. The Key Insight: Executable Pattern Languages

**这是论文最核心的贡献，应该重点展开。**

**6.1 传统模式语言 vs 可执行模式语言**

- 传统：模式是设计指导，需要人工翻译成代码
- AI时代：模式本身就是可执行的指令

**6.2 Generator：模式语言的一种执行方式**

- Generator不是唯一的执行方式，只是一个范例
- 任何人拿着这套模式交给AI，都能生成符合这些模式的MAS

**6.3 对"开源"概念的重新定义**

- 传统开源：公开源代码
- AI时代：公开模式语言 = 开源
- 发表这篇论文 ≈ 开源POMASA

**6.4 与指令式生成工具的对比**

- 对比AgentForge v1（指令式）
- POMASA的优势：扩展性、可选择性、声明式

### 7. Discussion and Conclusion

- 适用范围："信息采集 → 信息处理 → 生成报告"类任务，可通过MCP扩展到确定性数据源
- 局限性和未来方向
- 总结三个核心贡献：分类体系 + 模式清单 + 可执行性洞察

---

## 待确认事项

1. **语言**：英文还是中文？PLoP接受两种，但英文可能有更广的读者群。

2. **篇幅**：常规论文通常多长？是否需要精选模式只讲3-5个核心的，还是尽量全面覆盖18个？

3. **案例展示**：是否有实际运行产出（比如一份完整的产业分析报告）可以作为附录或案例展示？

---

## 备选标题

1. POMASA: A Pattern Language for AI-Executable Multi-Agent Systems
2. Executable Pattern Languages: A New Paradigm for Multi-Agent System Architecture in the AI Era
3. From Patterns to Running Systems: A Pattern Language for Declarative Multi-Agent Systems
