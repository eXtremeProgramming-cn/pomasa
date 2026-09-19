# AI 应用形态调研：大模型普及后的新兴信息系统形态

> 版本：v3 · 2026-09-19 · 调研人：AI 助手（熊节工作区）
> 目的：为「AI、人、确定性软件三者在完整信息系统中的角色、位置与接口」这一研究问题建立全景基础。
> 素材落盘于 `sources/`（SRC-001…SRC-010）。
> v2 变更：废弃「十一形态族」的陈列式分类（不 MECE、有重叠、K 族甚至不是按机制组织的），改为以四维坐标系为主干；形态族保留为「案例图谱」参考。
> v3 变更：D2 从「确定性代码的位置」改为「接合模式」（三机制之间接口的形状）。理由：关注主体应是智能（AI 在信息系统中的定位），但「AI 定位」与 D1 控制权轴接近镜像；接口形状独立于控制权（同一自治循环可走界面式或总线式接口），故以接口形状刻画 D2，正好回答原问题中「彼此之间的接口应该是什么样的」。

## 0. 背景与问题

2022 年底 ChatGPT 出现后，信息系统的构成方式发生了分化。此前一个信息系统中只有两种机制：人（提需求、做判断）与确定性软件（执行）。大模型普及后出现第三种机制：概率智能（LLM/智能体），能在语义开放的任务上生成与适应，但不可靠、需要验证。

本调研不追求给产品贴标签（贴标签必然不 MECE），而是建立一套坐标系：每个系统可以用四维坐标描述，坐标之间可以自由组合。坐标系的完备性来自轴（观察角度），不来自类别清单。这避免了「还有没有第十一族」的伪问题。

## 1. 分类系统：四维坐标

### D1 流程控制权（谁决定流程的形状与走向）

取值为一条光谱，从完全静态到完全动态：

| 取值 | 流程形状由谁决定 | 特征 | 例子 |
|---|---|---|---|
| 确定性主导 | 预设在代码/配置里 | 节点顺序写死，可预测、可验证 | n8n 工作流、传统软件内嵌 LLM 调用（调研宝） |
| 蓝图执行（声明式） | 描述符定形状，运行时在形状内自主 | 阶段、门、产物契约静态；执行动态 | POMASA 系 MAS |
| 对话主导 | 人在对话里当刻决定 | 逐步决定，最灵活但最不固化 | ChatGPT 直接对话 |
| 自治循环（agentic loop） | 目标与当刻环境共同决定 | 流程形状本身在循环中涌现 | Deep Research、Manus、Claude Code agent 模式 |

需要解释两个易混点：

**蓝图执行 vs 自治循环**。两者运行时都是 LLM 自主，区别在约束与形状的来源。蓝图执行有一个预先写好的静态形状（哪些阶段、哪些人工门、产物契约、验证链），自主性发生在形状内部；自治循环没有预定形状，只有目标与工具集，路径本身当刻生成，最多有 checkpoint 等人介入。判断方法：把系统里的人全部拿走，如果流程仍按既定阶段推进，是蓝图执行；如果流程会随机应变地变形，是自治循环。

**对话主导在光谱上的位置**。对话也产生流程，但流程由人当刻逐步决定，每一轮都在重定向。它不是「无流程」，而是「流程由人驱动」。所以 D1 的实际含义是控制权的转移：代码 → 人 → 描述符加运行时 → 目标与环境。这条光谱本身对应产业里反复出现的同一个观察：Anthropic 的 workflows 到 agents、「从对话到自治的连续谱」、Karpathy 的 autonomy slider。

### D2 接合模式（三机制之间的接口以什么形状接合）

回答原问题的另一半：三者彼此之间的接口应该是什么样的。八个取值不是互斥标签，而是接口的常见形状，一个系统可同时出现多个（如 POMASA 既有契约又有文件总线），坐标取最主导者。与 D1 正交：控制权（流程形状由谁定）独立于接口形状，同一个 D1 取值可以配不同 D2 取值。

| 取值 | 说明（接口以什么形状接合） | 例子 |
|---|---|---|
| 会话 | 自然语言对话即接口，消息直接进出 AI | ChatGPT、语音 agent |
| 调用 | 确定性代码把 AI 当函数调用，经 API/SDK 进出 | 调研宝、记忆层 |
| 管道 | 检索/向量管道注入上下文，约束 AI 生成 | MaxKB 等 RAG 平台 |
| 编排 | 确定性引擎按图调度 AI 节点，节点间数据流确定 | n8n、Dify Workflow |
| 工具 | AI 主动协商工具（function calling / MCP），返回值作 ground truth | agent 用 MCP |
| 契约 | 文档契约（SKILL.md、描述符、蓝图）定义能力与流程 | Claude Skills、POMASA |
| 总线 | 文件系统数据总线承载状态与消息，界面由文件推导 | POMASA 运行时、dsh |
| 界面 | AI 经图形/媒体界面（浏览器 DOM、CUA、语音流）触达世界 | Manus、Operator、语音平台 |

两点说明：门（评审、放行、否决）是接口上的检查点，随 D3 的「门」出现，不在此单列，避免与 D3 重叠；验证（L1 到 L4）是对接口质量的检视动作，不是接口形状，也不单列。

### D3 人的位置（人在系统里出现在哪）

| 取值 | 说明 |
|---|---|
| 全程对话 | 人逐轮驱动流程 |
| 建模与配置 | 人写描述符、配置图、打包 skill |
| 门（评审·验收） | 人在关键节点审阅、放行、否决 |
| 不在环 | 人只给目标，流程闭环运行 |

观察：几乎所有高质量形态都有人工门，包括 Deep Research 的可中断可追问、Anthropic 的 checkpoint 等人反馈、POMASA 的 gated 状态。

### D4 数据与状态所在（状态与知识存在哪）

| 取值 | 说明 | 可审计性 |
|---|---|---|
| 会话上下文 | 只在对话里 | 不可审计 |
| 应用数据库 | 传统业务库 | 可审计 |
| 文档库+向量库 | RAG 的知识层 | 可溯源到文档 |
| 文件系统数据总线 | 状态以文件落盘，界面从文件推导 | 可溯源、可恢复 |
| 外部系统 | 经 MCP/工具访问 | 取决于外部系统 |

观察：状态位置决定可审计性。RAG 与文件总线本质上都是「给 AI 上锚点」，与 POMASA 的 QUA-03 可验证血缘、Auctor 的「文件事实是唯一权威」互为印证。

### 坐标系统的用法

一个系统是一组四维坐标，坐标之间自由组合，不存在互斥类别。四维可以记作 (D1, D2, D3, D4)。例如：

- 调研宝 ≈ (确定性主导, 调用, 操作传统界面, 应用数据库)
- MaxKB RAG 应用 ≈ (确定性主导偏混合, 管道, 知识库治理+提问, 文档库+向量库)
- POMASA MAS ≈ (蓝图执行, 契约+总线, 建模+门, 文件系统数据总线)
- Deep Research ≈ (自治循环, 工具+界面, 门, 外部系统+文件)
- Claude Skills ≈ (蓝图执行偏自治, 契约, 建模, 外部加载时注入)
- dsh 插件工作台 ≈ (蓝图执行+会话, 总线+契约, 门+建模, 文件系统+会话)

## 2. 案例图谱（沿 D1 光谱排列）

本节是案例集合，不是分类学，不承诺 MECE。它的作用是展示 D1 光谱上已经出现的经验域，供坐标参照。

### 2.1 确定性主导端

**A 内嵌式：传统软件 + LLM 功能部件**。确定性软件承载核心业务与流程骨架，AI 作为若干步骤的实现手段参与其中。代表：调研宝（录音转写、提纲、联网查证、成文，每一步换确定性 API 亦可实现，流程骨架并不依赖特定的智能）。坐标 ≈ (确定性主导, 调用, 操作传统界面, 应用数据库)。接口：SDK/API，AI 不接触用户。素材：`03.systems/diaoyanbao`。

**C 检索增强问答：RAG 聊天机器人**。确定性检索管道约束 AI 生成。代表：MaxKB（模型优化/直接回答双命中模式、模型中立、工具调 Python/MCP）、RAGFlow、FastGPT、AnythingLLM、IARAA（验证型知识库 + 播种/集体劳作/丰产庭院三模式 + Meta-RAG，GLM/MiniMax + RAGFlow）。坐标 ≈ (确定性主导偏混合, 管道, 知识库治理+提问, 文档库+向量库)。接口：检索管道+提示词、文档管理与审核界面、MCP。素材：SRC-003、SRC-010。

**D 编排式/工作流**。确定性引擎编排 LLM 步骤。代表：n8n、Zapier、Make、Dify Workflow、Coze、Langflow；Anthropic 的五个 workflow 模式（prompt chaining、routing、parallelization、orchestrator-workers、evaluator-optimizer）。坐标 ≈ (确定性主导, 编排, 配置图, 工作流状态库)。素材：SRC-001、`05.experiments/vena/gateway/README.md`、教材第四章。

### 2.2 蓝图执行端

**F 蓝图执行：声明式描述性 MAS**。自然语言/模式语言描述符定义系统，LLM 运行时执行，文件系统作数据总线，人工门控制关键节点。代表：POMASA 系（20 模式、COR/STR/BHV/QUA、Must 6 个），news-on-china、Clamor 等。坐标 ≈ (蓝图执行, 契约+总线, 建模+门, 文件系统数据总线)。接口：描述符、文件系统、门、工具调用、验证链。素材：POMASA 论文、`03.systems/auctor|pictor|pomasa-studio`。

**E 能力打包层：Skills / GPTs / MCP**。把专长打包成可加载单元（指令+脚本+资源），运行时按需加载。不是独立应用，是给 AI 的能力组件。代表：Claude Agent Skills（SKILL.md，可组合/可移植/可含可执行代码）、OpenAI GPTs、MCP Servers/Apps、工作区 pomasa skill 与 stylistics skill。坐标 ≈ (蓝图执行偏自治, 契约, 建模, 外部加载时注入)。接口：SKILL.md / MCP 契约、目录与市场。素材：SRC-009、SRC-004、`skills-lock.json`。

**H 宿主/运行时平台 + 平台内应用**。智能体运行时成为平台，应用以插件/面板形态运行在宿主内，复用会话、工作区、凭据、模型、工具生态。代表：dsh + Bandung 集群（POMASA Studio / Pictor / Auctor / dsh-app-dock）、Claude Code 插件、MCP Apps。坐标 ≈ (蓝图执行+会话, 总线+契约, 门+建模, 文件系统+会话)。接口：插件契约（`window.__dshAppDock__` 注册表、workspace 服务）、MCP 配置种子、文件事实推导状态。素材：`03.systems/dsh-app-dock|auctor|pictor|pomasa-studio` README 与 DESIGN。

### 2.3 对话主导端

**B 对话式：会话即软件**。一次精心构造的 AI 对话本身就是软件。代表：ChatGPT/Claude/DeepSeek 直接对话；知识工程化的对话（KE 六支柱）。坐标 ≈ (对话主导, 会话, 全程对话, 会话上下文)。接口：自然语言+多模态粘贴。素材：教材第三章、KE 论文（PLoP 2025）。

**I 语音 agent**。语音即界面，STT 到 LLM 到 TTS 流水线。代表：Vapi（开发者基建）、Retell（托管低代码）、Bland（企业外呼/数据治理）。坐标 ≈ (对话主导+媒体管道, 会话+界面, 配置+听音, 通话记录库)。接口：实时媒体流、Webhook、平台仪表盘。素材：平台对比文章（搜索快照，未全文入库，见 §4）。

### 2.4 自治循环端

**G 自治循环：Agent 形态**。AI 自主规划、使用工具、长时闭环；确定性世界经工具/浏览器/执行环境暴露给 AI；人在断点介入与验收。代表：编码 agent（Claude Code、Cursor、Codex、Windsurf）、浏览器/桌面 agent（Manus、OpenAI Operator CUA、Browser Use）、深度研究（OpenAI Deep Research、Karpathy autoresearch）。坐标 ≈ (自治循环, 工具+界面, 断点介入+验收, 外部系统/文件)。接口：工具调用（function calling / MCP）、浏览器 DOM 或视觉（CUA）、代码执行环境。Anthropic 强调 ACI（Agent-Computer Interface）设计：接口要像给新人写的 docstring、工具参数要 poka-yoke 防错。素材：SRC-001、SRC-005、SRC-006、SRC-008。

### 2.5 非端点的补充案例

**J 记忆层/中间件**。为 agent/应用提供持久化记忆的独立中间件：写入（抽取、去重、冲突消解）、存储（向量/时序图/分级核心+存档）、检索。这是应用层的记忆管理，区别于模型服务层的 KV-cache。代表：Mem0、Zep（Graphiti 时序图）、Letta（MemGPT 衍生）。坐标 ≈ (确定性中间件, 调用, 记忆策略, 记忆库)。素材：mem0ai/mem0、TsinghuaC3I/Awesome-Memory-for-Agents 等（搜索快照，部分未全文入库）。

**K AI-Native 垂直应用**。应用与模型分化的方向：模型编排 + 领域专用 UI + 廉价的功能面；专有数据与领域专长是护城河。Sapphire 五维：设计/数据/领域专长/动态性/分发；a16z 的 narrow startups。代表：Harvey（法律）、Glean（企业搜索）、Sierra（客服）、Abridge（医疗）、Perplexity。坐标 ≈ (混合, 调用+管道, 领域标准+抽检, 领域数据库)。素材：SRC-002、SRC-007。

## 3. 案例 × 坐标速查

| 案例 | D1 | D2 | D3 | D4 |
|---|---|---|---|---|
| 调研宝 | 确定性主导 | 调用 | 操作传统界面 | 应用数据库 |
| MaxKB RAG | 确定性偏混合 | 管道 | 知识库治理+提问 | 文档库+向量库 |
| n8n / Dify Workflow | 确定性主导 | 编排 | 配置图 | 工作流状态库 |
| POMASA MAS | 蓝图执行 | 契约+总线 | 建模+门 | 文件系统数据总线 |
| Claude Skills | 蓝图执行偏自治 | 契约 | 建模 | 外部加载时注入 |
| dsh 插件工作台 | 蓝图执行+会话 | 总线+契约 | 门+建模 | 文件系统+会话 |
| ChatGPT 对话 | 对话主导 | 会话 | 全程对话 | 会话上下文 |
| 语音 agent | 对话+媒体管道 | 会话+界面 | 配置+听音 | 通话记录库 |
| Deep Research | 自治循环 | 工具+界面 | 断点介入+验收 | 外部系统/文件 |
| 记忆层（Mem0/Letta） | 确定性中间件 | 调用 | 记忆策略 | 记忆库 |
| Harvey/Glean | 混合 | 调用+管道 | 领域标准+抽检 | 领域数据库 |

## 4. 观察：通向模式语言的种子

1. **接口标准化正在发生，且方向一致**：MCP 正成为「AI 对确定性世界」的事实标准（USB-C 类比）；SKILL.md 正成为能力打包标准；CUA/浏览器 DOM 化是「AI 用人类界面」的另一条标准化路线。三者都在回答同一个问题：概率智能与确定性世界的接口长什么样。
2. **D1 光谱是连续可调的**：不是四种离散架构，而是同一根控制权轴上的刻度。产业界反复确认这件事：Anthropic 的 workflows 与 agents 连续论、Karpathy 的 autonomy slider、MaxKB 的渐进升级路径、教材的「对话式、配置式、声明式」三分法本质上都是 D1 轴的教学化或产品化版本。
3. **状态位置决定可审计性**：会话上下文不可审计；文档库加向量库、文件系统数据总线可溯源。RAG 与文件总线都在给 AI 上锚点。这是 D4 轴与 POMASA QUA-03、Auctor 文件事实原则的呼应。
4. **平台化在三个层级同时发生**：宿主平台（dsh、Claude Code）、图平台（Coze、Dify、n8n）、能力平台（MCP、skills）。每个层级都出现「一个入口 + 注册表 + 契约」的形态，dsh-app-dock 是宿主层的最小实现。
5. **开放问题**：大多数案例里确定性软件当业务主体、基座或管道，只有宿主插件（H）和蓝图 MAS（F）把确定性软件当作「被描述、被生成的对象」。这是不是新的应用领域的接缝，值得在模式语言论文中聚焦。

## 5. 待办与待补调研

- [ ] 补全文入库：语音 agent（Vapi/Retell/Bland 官方页）、记忆层（Mem0/Letta/Zep 官方页）
- [ ] 补 NotebookLM（个人知识工具体验层）与 Notion AI 形态
- [ ] 补 text-to-SQL / 数据分析 agent（Vanna、Chat2DB）
- [ ] 补企业级 Copilot 细分（Microsoft 365 Copilot、GitHub Copilot 的嵌入模式）
- [ ] 与教材「对话式/配置式/声明式」三分法做逐轴映射对照表
- [ ] 把 SRC 文件补全元数据（length_check 等）以对齐工作区素材规范

## 6. 素材索引

| 编号 | 内容 | 来源 |
|---|---|---|
| SRC-001 | Anthropic Building Effective Agents（workflow vs agent，五模式，ACI） | anthropic.com |
| SRC-002 | a16z Notes on AI Apps in 2026（thinking vs making，narrow startups） | a16z.com |
| SRC-003 | MaxKB 白皮书第 11 章（RAG、Workflow、Agent 渐进，双命中模式） | maxkb.cn |
| SRC-004 | MCP 官方简介（servers/clients/apps，USB-C 类比） | modelcontextprotocol.io |
| SRC-005 | Browser Use / Manus / Operator CUA 生态 | hub.baai.ac.cn |
| SRC-006 | OpenAI Deep Research 发布（多步研究，引用，MCP） | openai.com |
| SRC-007 | Sapphire AI-Native 应用五维框架 | sapphireventures.com |
| SRC-008 | Agentic AI 综述（arXiv 2601.12560，六维分类） | arxiv.org |
| SRC-009 | Anthropic Agent Skills（SKILL.md，可组合/可移植） | anthropic.com |
| SRC-010 | IARAA（MST 土地改革 AI 平台） | 工作区 ipa-monitor 素材 |

工作区即案例库：diaoyanbao（2.1A）、ai-general-education 教材（2.3B / 2.1D 的教学化）、pomasa（2.2F）、dsh 插件集群（2.2H）、meta-rag（2.1C）、skills-lock（2.2E）、vena gateway（2.1D 平台比较）、clamor（2.2F）。这些既是调研对象，也是后续模式论文的实证来源。