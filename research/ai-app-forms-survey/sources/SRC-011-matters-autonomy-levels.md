---
id: SRC-011
title: "MATTERS: Levels of Autonomy for AI Agents（五级自主性框架）"
original_url: https://arxiv.org/abs/2506.12469 （Knight Columbia 版：https://knightcolumbia.org/content/levels-of-autonomy-for-ai-agents-1）
fetched_at: 2026-09-19
author: K. J. Kevin Feng, David W. McDonald, Amy X. Zhang (University of Washington)
date: 2025-06-14
source_type: arXiv working paper / essay
---

# Levels of Autonomy for AI Agents（全文提取）

## 核心主张

自主性（autonomy）可以被当作一个**刻意的设计决策**（deliberate design decision），与智能体的能力（capability）和运行环境（operational environment）分离。开发者可以针对固定能力与固定环境，有意图地选择智能体以什么自主等级运行。对标的对立面：把自主性视为能力增强的必然结果（业界主流，评估基准只测能力不测自主性）。

## 术语区分（与我们的三机制框架直接对话）

- **Agency**：有意行动的能力（capacity to act intentionally）。工具集受限 = 低 agency。
- **Autonomy**：被设计为无需用户参与即可运行的程度（extent to which an AI agent is designed to operate without user involvement）。注意这里 user 可以是人或另一个 AI agent。
- 例子：一个只能调计算器 API 的 agent 低 agency，但在后台长时间运行无监督处理大量计算 = 高 autonomy。反之，一个工具很多的 agent 主动征求用户反馈 = 高 agency 低 autonomy。
- 启示：寻求批准（approval seeking）与自主性相关，改环境（工具使用）与 agency 相关。两个独立的治理杠杆。

## 五级自主性框架（围绕用户的角色定义）

1. **L1 用户是操作员（operator）**：用户时刻主导，agent 按需待命（Copilot 隐喻）。用户负责长期规划；agent 只做情境协助，不主动行动，除非被明确调用；主动建议不执行，先获用户批准。适用：高利害、高专长工作流，出错代价高、责任敏感（法律后果）。控制机制：用户全权。
2. **L2 用户是协作者（collaborator）**：紧密频繁的沟通协作，双方都能规划、委派、执行；agent 第一次可以独立工作而用户同时做自己的事；来回沟通最频繁最丰富。用户可随时接管（看到 agent 在死循环或幻觉时就自己接手）。适用：agent 不能可靠完成某些任务，或任务本身对用户有学习价值。
3. **L3 用户是顾问（consultant）**：责任更多转移到 agent，agent 在长时间跨度上主动规划与执行；用户提供反馈、偏好与方向性指导，但不再直接控制 agent，无法直接编辑 agent 输出。agent 主动在适当时机咨询用户（专业知识、偏好），用户可暂停、要求重跑。注意：L3 无直接接管机制，只能间接影响。要求"训练期"以了解用户专长。
4. **L4 用户是批准人（approver）**：用户只在 agent 遇到无法自行解决的阻碍时才交互（失败状态、缺凭据、重大行动签字）。提交前用户可指定哪些行动需要批准（如登录页）。agent 不寻求对计划的反馈，计划只作透明展示。适用：大量低风险决策的任务，错误决策不造成重大风险。
5. **L5 用户是观察者（observer）**：全自主，无需也无法用户参与。用户只能看活动日志，唯一控制是紧急关闭开关（off-switch）。理由：信息极复杂超出人理解时、或封闭沙箱环境防止影响外部世界。

## 对治理的延伸：自主性证书（autonomy certificates）

第三方机构（政府、非营利如 METR）发给开发者，证明 agent 行为至多处于某自主等级（类似安全论证 safety case 但证明的是自主性上限）。用途：风险评估、安全框架设计、多智能体系统协同预测（全 L1 系统所有人都等任务派发不行，全 L5 通信稀疏难调试，混合等级或多数 L2 协作更可用）。

## 对本文档的意义

这是与我们的 D1 光谱最直接对话的既有工作：
- 它证明"自主性作为设计决策"已经是学界的公开立场（2025 年起），我们的论点不孤立。
- 它的轴与 D1 同构但更细：以"用户的角色"划分五级，而我们的 D1 以"流程形状由谁决定"划分四级。两者高度互补：L1 对应对话主导偏确定性，L2 对话主导，L3 蓝图执行偏自治，L4 对应自治循环加门，L5 自治循环无门。
- 它明确把"用户"扩展到"人或另一 AI agent"，支持我们在多智能体语境里谈控制权。
- 缺口：它聚焦 agent 单体的人机交互面（人 ↔ agent），没有覆盖"确定性软件"这个第三机制；也没有讨论状态位置、接口形状、人即门的工程化（门会疲劳、审查产物而非过程）。这些正是我们可以补的洞。
- 它也提醒我们：评估目前只测能力，公司安全框架（Anthropic RSP、DeepMind FSF）以"能否自主完成多步任务"作风险阈值，这是二进制成功率，不够精细；我们的模式语言可以贡献更细的判定。