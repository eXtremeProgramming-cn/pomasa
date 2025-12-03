# Parallel Instance Execution

**分类**：行为模式
**必要性**：可选

## 问题

如何利用并行提高效率？

单个任务可能涉及处理多个独立的数据分区。串行处理耗时很长，但并非所有任务都能安全并行化。需要识别并行机会、实现并行执行、同步和聚合结果。

## 语境

该模式适用于以下场景：

- 任务可以按数据分区
- 分区之间完全独立，无需通信
- 任务是I/O密集型（网络请求、文件读写）
- 有足够的资源支持并行执行
- 可以接受独立失败的隔离

## 作用力

- **效率 vs 资源消耗**：并行提高效率，但消耗更多资源
- **简单性 vs 性能**：串行实现简单，并行增加复杂度
- **隔离性 vs 协调需求**：完全隔离便于并行，但可能需要协调
- **确定性 vs 速度**：并行执行的顺序不确定

## 解决方案

**当任务可按数据分区且分区完全独立时，为每个分区实例化一个Agent Instance，并行执行，等待全部完成后聚合结果。**

### 并行执行模型

```
Orchestrator
     │
     │ 识别并行机会
     │ (N个独立分区)
     │
     ├──→ Task: Agent Instance 1 (分区1) ──→ 输出1
     ├──→ Task: Agent Instance 2 (分区2) ──→ 输出2
     ├──→ Task: Agent Instance 3 (分区3) ──→ 输出3
     │    ...
     └──→ Task: Agent Instance N (分区N) ──→ 输出N
           │
           │ Barrier同步
           │ (等待所有完成)
           ▼
     [聚合/进入下一阶段]
```

### 核心机制

1. **数据分区识别**：
   - 读取配置数据确定分区（如组织列表）
   - 分区数量决定并行度

2. **批量Task启动**：
   - Orchestrator在同一消息中发起多个Task
   - 运行时自动识别并行机会

3. **独立执行**：
   - 每个Instance有独立上下文
   - 写入不同的输出目录

4. **Barrier同步**：
   - 等待所有Instance完成
   - 检查各分区输出完整性

## 结果

### 收益

- **显著性能提升**：接近线性加速（对于I/O密集任务）
- **充分利用等待时间**：网络请求并行等待
- **实现简单**：声明式并行（在同一消息中启动多个Task）
- **数据驱动的可扩展性**：分区数增加，并行度自动增加
- **良好的容错隔离**：单个Instance失败不影响其他Instance

### 代价

- **资源消耗增加**：更多并行请求，更多API调用
- **调试复杂度增加**：需要追踪多个并行执行
- **潜在资源竞争**：可能受限于外部API的并发限制
- **一致性挑战**：并行执行的顺序不确定
- **同步等待时间**：最慢的Instance决定整体时间

## 实现指南

### 识别并行机会

**可以并行的条件**：
- 各分区处理逻辑相同（同一Blueprint）
- 各分区输入数据独立
- 各分区输出目录不同
- 不需要分区间通信

**不能并行的情况**：
- 后续分区依赖前序分区的输出
- 需要全局视角的任务（如整合报告）
- 有共享状态需要同步

### 在Orchestrator中启动并行Task

```markdown
## 阶段一执行

**并行策略**：为每个组织启动独立的Research Agent

1. 读取 `references/organizations.json` 获取组织列表
2. 读取 `agents/01.research_agent.md` 获取Agent Blueprint
3. **在同一消息中**为每个组织启动Task：
   - Task 1: Research Agent for Organization A
   - Task 2: Research Agent for Organization B
   - Task 3: Research Agent for Organization C
   - ...
4. 等待所有Task完成
5. 验证各分区输出完整性
```

### 目录分区避免写冲突

```
data/2025-09/raw/
├── org_1/          # Instance 1 写入
│   ├── activities.json
│   └── sources.md
├── org_2/          # Instance 2 写入
│   ├── activities.json
│   └── sources.md
└── org_3/          # Instance 3 写入
    ├── activities.json
    └── sources.md
```

### 参数化Blueprint支持并行

```markdown
## 输入参数

- `{ORGANIZATION_ID}`：当前处理的组织ID
- `{ORGANIZATION_NAME}`：当前处理的组织名称

## 输出位置

`data/{PERIOD}/raw/{ORGANIZATION_ID}/`

[注：通过参数化，同一Blueprint可以实例化为多个
并行执行的Instance，每个写入不同目录]
```

### 处理部分失败

```markdown
## 异常处理

如果某个Organization的采集失败：
1. 记录失败信息到 `wip/notes.md`
2. 继续等待其他Organization完成
3. 在阶段总结中标记失败的分区
4. 决定是否重试或继续下一阶段
```

## 示例

### 来自 industry_assessment 系统

**阶段二：深度调研的并行执行**：

```markdown
## 深度调研执行策略

### 并行方案
- ESSCC框架有55个功能项
- 为每个功能项启动独立的Deep Researcher实例
- 最大55路并行

### 执行方式
1. 读取问题清单确定所有功能项
2. 对每个功能项 {FUNCTION_ID}：
   - 读取对应的问题列表
   - 启动 Deep Researcher Task
   - 参数：{INDUSTRY_ID}, {FUNCTION_ID}, {FUNCTION_NAME}
3. 等待所有Task完成

### 输出目录
data/{INDUSTRY_ID}/01.materials/03.deep_research/
├── 1.1_control_strategic_sectors/    # Instance 1
├── 1.2_provide_public_goods/         # Instance 2
├── 1.3_stabilize_macro_economy/      # Instance 3
...
└── 12.5_execute_national_strategic_will/  # Instance 55

### 效率分析
- 单个功能项调研：约10-15分钟
- 55个串行执行：约10-14小时
- 55个并行执行：约15-20分钟（受限于最慢的）
- 加速比：约30-40倍
```

**阶段三：分析的分层并行**：

```markdown
## 分析执行策略

### 第一层：功能项分析（55路并行）
- 55个功能项可完全并行分析
- 每个产出独立的功能项分析报告

### 第二层：特征综合（12路并行）
- 等待第一层完成
- 12个特征可并行综合（每个特征下的功能项分析已完成）

### 第三层：维度综合（4路并行）
- 等待第二层完成
- 4个维度可并行综合

### 第四层：整体综合（串行）
- 等待第三层完成
- 需要全局视角，必须串行
```

## 相关模式

- **[Orchestrated Agent Pipeline](./06-orchestrated-agent-pipeline.md)**：并行执行发生在Pipeline的各阶段内
- **[Filesystem Data Bus](./04-filesystem-data-bus.md)**：通过目录分区支持并行写入
- **[Prompt-Defined Agent](./01-prompt-defined-agent.md)**：同一Blueprint实例化为多个并行Instance

## 变体

### 批次并行
当分区数量很大时，分批并行执行：
```
第一批：Instance 1-10 并行
第二批：Instance 11-20 并行
...
```

### 优先级并行
重要分区先执行，次要分区后执行：
```
高优先级：Instance 1-3 并行
    ↓ 完成后
低优先级：Instance 4-10 并行
```

### 动态并行度
根据资源使用情况动态调整并行度。

## 何时不使用此模式

- **分区间有依赖**：后续分区需要前序分区的输出
- **需要全局协调**：分区间需要通信或共享状态
- **资源受限**：并行会导致资源竞争或超出限制
- **分区数很少**：只有1-2个分区，并行收益有限
- **CPU密集型任务**：并行收益主要来自I/O等待，CPU密集任务收益有限
