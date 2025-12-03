# Faithful Agent Instantiation

**分类**：行为模式
**必要性**：必要

## 问题

如何确保Agent被正确实例化和执行？

在多Agent系统中，Orchestrator需要调用其他Agent执行任务。常见的错误做法包括：

1. **摘要转述**：Orchestrator读取Agent B的Blueprint后，自己总结一个"摘要版"来启动subagent。这导致关键细节丢失，执行走样。

2. **任务打包**：批量执行时，把多个本应独立的任务打包到一个subagent调用中。这导致每个任务得不到应有的执行质量。

这些做法在短调用链中可能问题不大，但在长调用链或大批量任务中会导致严重的质量下降。

## 语境

该模式适用于以下场景：

- Orchestrator需要调用其他Agent
- 存在长调用链（A调用B，B调用C...）
- 需要批量执行同类任务
- 对执行质量有较高要求

## 作用力

- **效率 vs 质量**：摘要转述或任务打包可能更"高效"，但质量下降
- **简洁 vs 完整**：简洁的调用方式可能遗漏关键信息
- **灵活 vs 规范**：灵活的调用方式难以保证一致性

## 解决方案

**每个Agent实例都必须直接读取并执行完整的Blueprint，调用方只传递参数，不转述蓝图内容。每个独立任务对应一个独立的subagent调用。**

### 核心原则

1. **调用方只传参数，不转述蓝图**
   - Orchestrator告诉subagent去读取哪个Blueprint文件
   - subagent自己读取完整Blueprint并执行
   - 调用方不摘要、不简化、不转述

2. **一个任务实例 = 一个subagent调用**
   - 批量任务中，每个独立任务都启动单独的subagent
   - 每个subagent传入自己的参数
   - 不把多个任务打包到一个调用中

3. **Blueprint是执行的唯一依据**
   - subagent的行为完全由Blueprint决定
   - 不依赖调用方的"解释"或"指导"

## 结果

### 收益

- **执行不走样**：长调用链中每个环节都执行完整规范
- **批量任务质量一致**：每个任务都得到同等质量的执行
- **可预测性**：知道Blueprint就能预测执行结果
- **易于调试**：问题可以追溯到具体的Blueprint

### 代价

- **调用开销增加**：每个任务单独调用，次数增多
- **可能看起来"啰嗦"**：不能"聪明地"打包优化
- **依赖Blueprint完整性**：Blueprint本身必须足够完整

## 实现指南

### 正确的调用方式

**在Orchestrator中调用其他Agent**：

```markdown
## 阶段二：深度调研

针对每个功能项，启动独立的Deep Researcher：

对于每个功能项 {FUNCTION_ID}：
1. 启动一个新的subagent
2. 指示subagent：
   - 阅读 `agents/02.deep_researcher.md`
   - 严格按照Blueprint执行
   - 参数：INDUSTRY_ID={当前产业}, FUNCTION_ID={当前功能项}
3. 等待subagent完成

注意：
- 每个功能项启动独立的subagent
- 不要把多个功能项打包到一个subagent中
- 不要摘要或转述Blueprint内容
```

**调用时的标准措辞**：

```
请启动一个subagent，执行以下任务：
1. 阅读 agents/02.deep_researcher.md
2. 严格按照该Blueprint执行
3. 参数：
   - INDUSTRY_ID: xxx
   - FUNCTION_ID: xxx
```

### 错误的调用方式

**反例一：摘要转述**

```markdown
❌ 错误：
启动subagent，执行深度调研任务：
- 搜索关于该功能项的政策文件
- 搜索相关统计数据
- 整理成markdown格式
（这是Orchestrator自己总结的，不是完整Blueprint）
```

**反例二：任务打包**

```markdown
❌ 错误：
启动一个subagent，完成以下5个功能项的调研：
- 功能项1.1
- 功能项1.2
- 功能项1.3
- 功能项1.4
- 功能项1.5
（应该每个功能项启动独立的subagent）
```

### 批量任务的正确处理

**串行执行**：
```markdown
依次对每个功能项：
1. 启动subagent，阅读并执行 agents/02.deep_researcher.md
2. 等待完成
3. 处理下一个功能项
```

**并行执行**：
```markdown
同时为所有功能项启动subagent：
- subagent 1: 执行 agents/02.deep_researcher.md，参数 FUNCTION_ID=1.1
- subagent 2: 执行 agents/02.deep_researcher.md，参数 FUNCTION_ID=1.2
- subagent 3: 执行 agents/02.deep_researcher.md，参数 FUNCTION_ID=1.3
...
等待所有subagent完成
```

### 在Blueprint中强调此要求

**Orchestrator Blueprint应包含明确指示**：

```markdown
## 重要：Agent调用规范

在调用其他Agent时，必须遵循以下规范：

1. **不要摘要或转述Blueprint**
   - 让被调用的subagent自己读取完整的Blueprint文件
   - 你只传递参数，不传递Blueprint内容

2. **每个独立任务启动独立的subagent**
   - 批量任务时，每个任务单独启动一个subagent
   - 不要把多个任务打包到一个subagent调用中

3. **标准调用方式**
   启动subagent时，使用以下格式：
   "请阅读 agents/XX.xxx.md 并严格按照该Blueprint执行，参数：..."
```

## 示例

### 正确示例：Orchestrator调用Deep Researcher

```markdown
## 阶段二执行

### 2.1 准备工作
读取 `data/{INDUSTRY_ID}/01.materials/02.question_list/` 获取所有功能项清单。

### 2.2 启动深度调研
对于问题清单中的每个功能项，启动独立的调研任务：

**调用方式**（针对每个功能项重复）：

启动一个subagent，指示如下：
> 请阅读 `agents/02.deep_researcher.md` 并严格按照该Blueprint执行。
>
> 参数：
> - INDUSTRY_ID: {当前产业ID}
> - FUNCTION_ID: {当前功能项编号}
> - FUNCTION_NAME: {当前功能项名称}

**重要**：
- 55个功能项 = 55个独立的subagent调用
- 可以并行启动以提高效率
- 不要把多个功能项合并到一个调用中
```

### 错误示例对比

| 做法 | 问题 |
|------|------|
| "帮我调研1.1到1.5这五个功能项" | 任务打包，每个功能项得不到充分执行 |
| "按照deep_researcher的思路去搜索政策和数据" | 摘要转述，丢失Blueprint中的完整规范 |
| "参考deep_researcher做类似的事情" | 模糊指示，执行可能严重走样 |

## 相关模式

- **[Prompt-Defined Agent](./COR-01-prompt-defined-agent.md)**：Blueprint是执行的唯一依据
- **[Orchestrated Agent Pipeline](./BHV-01-orchestrated-agent-pipeline.md)**：Orchestrator协调时必须正确调用
- **[Parallel Instance Execution](./BHV-03-parallel-instance-execution.md)**：并行执行时每个实例独立调用
- **[Business-Driven Agent Design](./STR-04-business-driven-agent-design.md)**：每个Agent有明确的Blueprint

## 检查清单

在设计Orchestrator时，检查以下要点：

- [ ] 调用其他Agent时，是否让subagent自己读取Blueprint？
- [ ] 是否避免了摘要或转述Blueprint内容？
- [ ] 批量任务是否每个任务独立启动subagent？
- [ ] 调用指令中是否明确了Blueprint文件路径？
- [ ] 调用指令中是否正确传递了参数？
