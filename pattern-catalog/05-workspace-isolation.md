# Workspace Isolation

**分类**：结构模式
**必要性**：推荐

## 问题

如何防止Agent访问或修改不该访问的文件？

AI Agent具有读写文件系统的能力，如果不加限制，可能：
- 意外读取其他项目的文件，造成上下文污染
- 意外修改系统文件或其他项目的数据
- 导致不同项目之间的干扰
- 使系统行为依赖于项目外部的状态

## 语境

该模式适用于以下场景：

- 同一环境中存在多个独立项目
- Agent有文件系统访问能力
- 需要确保系统行为的可重复性
- 需要清晰的数据依赖边界

## 作用力

- **安全性 vs 便利性**：限制访问增加安全性，但可能增加不便
- **隔离性 vs 共享需求**：完全隔离可能阻碍合理的资源共享
- **显式约束 vs 隐式假设**：显式约束更可靠，但增加配置负担

## 解决方案

**在每个Agent Blueprint的开头明确声明工作空间边界，禁止读写指定目录之外的任何文件。**

### 标准约束声明

```markdown
## 工作空间隔离要求

**重要**：你必须且只能在项目目录 `{PROJECT_PATH}/` 内工作。
- 你**禁止**读取该目录之外的任何文件
- 你**禁止**写入该目录之外的任何文件
- 你使用的所有文件路径必须是该项目根目录的相对路径或该目录内的绝对路径
- 这一约束确保系统隔离，防止上下文污染
```

### 放置位置

约束声明应放在Agent Blueprint的**最开头**（仅次于标题），确保：
1. 最先被Agent读取
2. 强调其重要性
3. 在任何具体任务之前建立边界

## 结果

### 收益

- **防止上下文污染**：Agent不会意外读取其他项目的文件
- **确保可重复性**：系统行为只依赖于项目内的文件
- **支持并行项目**：多个研究项目可以安全共存
- **清晰的依赖边界**：所有数据依赖都在项目目录内可见
- **便于项目迁移**：整个项目目录可以独立移动

### 代价

- **灵活性受限**：无法访问项目外的公共资源
- **可能需要复制**：共享资源可能需要复制到每个项目
- **依赖约定而非技术强制**：运行时可能无法技术上阻止越界访问

## 实现指南

### Blueprint模板

```markdown
# Agent名称

## 工作空间隔离要求

**重要**：你必须且只能在项目目录 `industry_assessment/` 内工作。
- 你**禁止**读取该目录之外的任何文件
- 你**禁止**写入该目录之外的任何文件
- 你使用的所有文件路径必须是该项目根目录的相对路径或该目录内的绝对路径
- 这一约束确保系统隔离，防止上下文污染

---

## 你的角色
[后续内容...]
```

### 路径使用规范

**推荐**：使用项目相对路径
```markdown
## 输出位置
`data/{INDUSTRY_ID}/01.materials/`
```

**可接受**：使用项目内的绝对路径
```markdown
## 输出位置
`/full/path/to/project/data/{INDUSTRY_ID}/01.materials/`
```

**禁止**：引用项目外路径
```markdown
## 参考资料
阅读 `/etc/config` 或 `../other-project/data/`  # 禁止！
```

### 处理共享资源

如果多个项目确实需要共享某些资源：

1. **复制到项目内**：将共享资源复制到每个项目的`references/`目录
2. **符号链接**：在技术允许的情况下使用符号链接（需在文档中说明）
3. **外部获取**：通过网络获取公共资源，而非访问本地其他位置

### 验证隔离性

项目应能够通过以下测试：
1. 将项目目录移动到另一位置
2. 重新执行系统
3. 应能正常运行，产生相同结果

## 示例

### 来自 industry_assessment 系统

每个Agent Blueprint都包含工作空间隔离声明：

**01.initial_scanner.md**：
```markdown
# 初步感知器 (Initial Scanner)

## 工作空间隔离要求

**重要**：你必须且只能在项目目录 `industry_assessment/` 内工作。
- 你**禁止**读取该目录之外的任何文件
- 你**禁止**写入该目录之外的任何文件
- 你使用的所有文件路径必须是该项目根目录的相对路径或该目录内的绝对路径
- 这一约束确保系统隔离，防止上下文污染

---

## 你的角色
...
```

**generator.md中的要求**：
```markdown
**CRITICAL WORKSPACE ISOLATION REQUIREMENT**:

Every agent blueprint MUST include explicit instructions at the
beginning that enforce workspace isolation:

```
IMPORTANT: You must work ONLY within the project directory: {PROJECT_ID}/
- You MUST NOT read any files outside this directory
- You MUST NOT write any files outside this directory
- All file paths you use must be relative to this project root
- This constraint prevents context pollution and ensures system isolation
```

This workspace boundary constraint must be emphasized in all agent blueprints.
```

## 相关模式

- **[Prompt-Defined Agent](./01-prompt-defined-agent.md)**：工作空间约束是Blueprint的一部分
- **[Filesystem Data Bus](./04-filesystem-data-bus.md)**：数据总线限定在工作空间内
- **[Reference Data Configuration](./03-reference-data-configuration.md)**：参考数据应位于工作空间内

## 变体

### 多级工作空间
对于大型系统，可能需要多级工作空间：
```
organization/
├── shared/           # 组织级共享资源
├── project_a/        # 项目A工作空间
└── project_b/        # 项目B工作空间
```
Agent可访问`shared/`和自己的项目目录。

### 只读外部访问
某些场景允许只读访问项目外资源：
```markdown
- 你可以读取 `../shared-references/` 中的文件
- 你**禁止**写入任何项目目录外的文件
```

### 临时目录例外
允许访问系统临时目录用于中间处理：
```markdown
- 你可以使用系统临时目录进行中间处理
- 最终输出必须写入项目目录内
```
