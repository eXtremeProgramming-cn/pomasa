我要写一篇文章来介绍POMASA，投稿给AsianPLoP 2026。他们的征稿信息如下：

```
AsianPLoP is the Asian edition of the Pattern Languages of Programs conference (PLoP™), the premier event for pattern authors and enthusiasts to gather, discuss, and learn more about patterns, design, software development, and the built world in general. 

AsianPLoP 2026 invites submissions on patterns and pattern languages in software, AI and LLM-based systems, organizations, education, and other human-centered domains. We welcome regular papers (with shepherding and Writers' Workshops), interactive presentation papers (talks/posters on methods, theories, and case studies), and workshop/focus group proposals (interactive 1-hour sessions). Submissions are welcome in English or Japanese (Japanese papers should include an English title and abstract), using the ACM single-column format.
```

我的计划是写成一篇常规论文。

在`pomasa/references`目录下有两篇原来的文章，但是那个文章已经过时了。第一是它用的案例不怎么合适，第二那个时候对架构的理解、包括目录命名的方式等，跟现在的模式语言也不一样。

我是考虑基于POMASA现在的状态，结合`demo_mas`这个MAS作为例子，重写一篇符合PLoP风格的文章。

我觉得这篇文章需要有三个主要的要素，第一是这个模式语言本身的结构；第二是模式清单，尤其是一些最重要的模式怎么组合起来形成一个可用的MAS；第三是一个MAS系统开发上的重要洞察：对于AI这个运行时环境而言，模式语言本身就是可执行的，应用模式语言就可以生成MAS——也即是generator所体现出来的能力。

延伸上面的第三点：实际上我们这里的generator也只是一个范例，而不是“执行”这套模式语言的唯一方式，这一点跟以前的源代码有很大的区别。这样一来，“开源”这件事也会发生很大的变化。我不一定非得在github上开放一堆源代码，我发表这篇文章就等价于开源，别人拿着我这篇文章交给AI就可以还原POMASA、构建出思路大差不差的MAS系统。这是在AI时代对整个软件开发理念的一个重大创新。

当然POMASA的起点是做人文社科领域的研究，目前我所知的是它已经被泛用于各种“信息采集 -> 信息处理 -> 生成报告”的研究任务，比如说我知道的就有人用它来调研AI辅助编程的工具，这之类的应用场景。我觉得绝大多数的麦肯锡网站上发布的报告都可以套到这个框子里，所以适用范围还是广的。

而且比如说需要通过MCP从一个确定性的数据库（例如一个PowerBI的数据库）提数据、做分析，也可以通过添加模式的方式来实现。在大框子类似的前提下，扩展性也还是很好的。

就，为什么我选择用模式语言这种方式来做POMASA（跑题一句：我还不知道应该怎么描述POMASA到底是个什么东西。框架？）呢，就是因为扩展性好，每个用户可以自行选择我要用哪些模式不要用哪些模式，也可以在自己的MAS里弄着弄着说“哎我想加上使用这个模式”。如果按照以前的软件开发的思路做个指令式的生成工具来生成MAS，那么想扩展就会很麻烦：怎么加新的特性呢？怎么让用户选择要哪些特性不要哪些特性呢？都很麻烦。

我做的第一个版本的工具AgentForge就是一个指令式的生成工具的思路，你可以对比参考着看：https://github.com/eXtremeProgramming-cn/agent-forge —— 重点就在一个generator.md文件里。

总体感觉就是，因为有了AI作为运行时引擎（也见于COR-02模式），我们做一个关于“怎么建设好的MAS”的工具（或者叫框架？whatever）本身就不应该再指令式地一步步说“要怎么做”，我们就可以跟AI说“应该怎么做”，AI是有能力理解并做出来符合要求的东西的。

大概是这些很零散的想法，你帮我考虑下这篇文章怎么组织。