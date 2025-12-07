# 论文Markdown格式规范

本规范确保各章节可正确拼接，且能被pandoc正确处理生成PDF。

## 标题规范

- [ ] 只有第一章使用一级标题（#），作为论文总标题
- [ ] 各章节使用二级标题（##）作为章标题，格式为 `## 1. Chapter Name`
- [ ] 章节内小节使用三级标题（###），格式为 `### 1.1 Section Name`
- [ ] 更细的层级使用四级标题（####），格式为 `#### 1.1.1 Subsection Name`
- [ ] 标题层级连续，不跳级

## 编号规范

- [ ] 章节编号统一：1, 2, 3, 4, 5, 6, 7
- [ ] 小节编号统一：1.1, 1.2, 2.1, 2.2, ...
- [ ] 模式编号：4.1, 4.2, 4.3, ... (在第4章内)

## 空行规范

- [ ] 文件开头：一个空行
- [ ] 文件结尾：一个空行
- [ ] 标题前：一个空行
- [ ] 标题后：一个空行
- [ ] 段落之间：一个空行

## 列表规范

- [ ] bullet list 前：必须有一个空行
- [ ] bullet list 后：必须有一个空行
- [ ] 嵌套列表：使用2个空格缩进
- [ ] 有序列表同样遵循上述规则

## 代码块规范

- [ ] 代码块前：一个空行
- [ ] 代码块后：一个空行
- [ ] 使用三个反引号，指定语言

## 表格规范

- [ ] 表格前：一个空行
- [ ] 表格后：一个空行
- [ ] 使用标准markdown表格语法

## 引用块规范

- [ ] 引用块前：一个空行
- [ ] 引用块后：一个空行

## 本论文章节结构

```
# POMASA: A Pattern Language for AI-Executable Multi-Agent Systems (一级标题，仅出现一次)

## 1. Introduction (二级标题)

## 2. Background: The Industry Analysis System (二级标题)
### 2.1 System Overview (三级标题)
### 2.2 System Scale and Complexity
### 2.3 Why This Case Study
### 2.4 A Glimpse of the Output

## 3. The Pattern Language Structure (二级标题)
### 3.1 Categorical Taxonomy
### 3.2 Necessity Hierarchy
### 3.3 The Pattern Matrix
### 3.4 Pattern Relationships
### 3.5 Reading the Patterns

## 4. Essential Patterns (二级标题)
### 4.1 COR-02: Intelligent Runtime
### 4.2 COR-01: Prompt-Defined Agent
### 4.3 STR-01: Reference Data Configuration
### 4.4 BHV-01: Orchestrated Agent Pipeline
### 4.5 BHV-02: Faithful Agent Instantiation
### 4.6 STR-02: Filesystem Data Bus
### 4.7 STR-03: Workspace Isolation
### 4.8 QUA-03: Verifiable Data Lineage

## 5. Applying the Pattern Language (二级标题)
### 5.1 Minimal Viable Configuration
### 5.2 Recommended Configuration
### 5.3 The Industry Analysis System Configuration
### 5.4 Pattern Interaction in Practice
### 5.5 The Complete Flow

## 6. The Key Insight: Executable Pattern Languages (二级标题)
### 6.1 Traditional Pattern Languages vs. Executable Pattern Languages
### 6.2 The Generator: One Way to Execute the Pattern Language
### 6.3 Implications for Open Source
### 6.4 Comparison with Imperative Generation
### 6.5 Why Pattern Languages Suit AI Execution
### 6.6 Limitations of Executable Pattern Languages

## 7. Discussion and Conclusion (二级标题)
### 7.1 Applicability and Scope
### 7.2 Limitations
### 7.3 Pattern Language Evolution
### 7.4 Contributions
### 7.5 Conclusion
```
