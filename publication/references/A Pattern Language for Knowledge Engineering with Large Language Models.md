A Pattern Language for Knowledge Engineering with Large Language
Models[^1]

XIONG JIE, East China Normal University

As Large Language Models become central to knowledge work, the gap
between their potential and practical utility reveals a critical
bottleneck: the user\'s ability to articulate intent systematically.
This paper presents a pattern language for Knowledge Engineering---the
disciplined process of structuring and conveying one\'s problem,
context, ideology, and purpose to an AI to co-create valuable
intellectual work. Drawing on Christopher Alexander\'s pattern language
methodology, we propose a framework structured around Six Pillars:
Problem Orientation (establishing the goal), Ideology (setting the
analytical lens), Information Reserve (providing contextual knowledge),
Methodology (defining the process), Form of Expression (controlling
output format), and Opinion & Insight (the irreplaceable human core).
Each pillar is illustrated through practical patterns including
Epistemology Frame, Exhaustive Input, Attachment, Online Search,
Prescribed Process, Decomposition, Structured Output, and Style Mimicry.
This framework transforms users from simple \"prompters\" into Knowledge
Engineers capable of architecting complete systems of thought. Rather
than replacing human intellect, this approach amplifies it by delegating
routine intellectual labor to AI while elevating uniquely human
faculties---creativity, critical judgment, and original insight---as the
essential drivers of meaningful knowledge production.

# Guide for Reading

**Who This Paper Is For:** This pattern language is designed for
researchers, analysts, and knowledge workers who seek to use Large
Language Models to create high-quality intellectual work---such as
academic papers, research reports, or analytical commentaries. It is
particularly intended for readers in the social sciences, humanities,
and professional fields who may not have programming experience but need
to systematically engineer knowledge with AI.

**How This Paper Is Organized:** This paper presents a pattern language
structured around Six Pillars---Problem Orientation, Ideology,
Information Reserve, Methodology, Form of Expression, and Opinion &
Insight. Each pillar represents a distinct dimension of knowledge you
must provide to guide an LLM. Some pillars are illustrated by a single
pattern, while others present multiple patterns. Each pattern follows a
consistent structure: **Context** (when to use it), **Problem** (the
challenge it addresses), **Forces** (why the problem is difficult),
**Solution** (how to apply the pattern), **Example** (a concrete
demonstration), and **Discussion** (consequences and considerations).

**Typographic Conventions:** Pattern names appear as Monospace Text when
referenced (e.g., \`Problem Orientation\`, \`Epistemology Frame\`).
External works and patterns from other researchers are cited via
footnotes. Code examples and prompts are shown in blockquotes for
clarity.

**How to Navigate:** You may read this paper sequentially to understand
the complete framework, or jump directly to specific pillars and
patterns relevant to your current task. The six pillars build upon each
other conceptually, but each pattern can be applied independently once
understood.

# Introduction

Interacting with a powerful Large Language Model (LLM) often begins with
a twinge of disappointment. A user poses a complex query, full of
potential, only to receive an answer that is surprisingly flat, generic,
or misses the point entirely. This gap between an LLM's apparent
capability and the actual utility of its output reveals a critical
bottleneck, which is often not the technology itself, but the user's
ability to articulate intent.

The craft of "prompting" remains difficult to master, primarily because
we lack a shared, systematic language to describe, teach, and refine our
methods. This challenge has given rise to the emerging discipline of
"Prompt Engineering," which focuses on crafting effective instructions
for LLMs, yet a systematic language for this craft is still in its
infancy.[^2]

The pattern language presented in this paper is not intended for all
interactions with LLMs. It is specifically designed for a demanding
application: the creation of high-quality knowledge products, such as
academic papers, research reports, journalistic commentaries, or a
podcast script.

These seemingly diverse products are not merely collections of
information; they are highly structured artifacts defined by a set of
common characteristics that directly correspond to the pillars of our
framework. They are created to address a specific problem or question
(Problem Orientation). They are framed by a particular analytical
perspective or worldview (Ideology). Their credibility rests upon a
solid foundation of information and evidence (Information Reserve). They
follow a coherent Methodology in how they analyze this information and
construct arguments. They adhere to a specific form and style tailored
to their audience and purpose (Form of Expression). Finally, and most
importantly, the most valuable of these products offer a unique Opinion
and/or Insight that represents the author's novel contribution.

This paper argues that to reliably produce such artifacts, users must
adopt a more holistic practice than mere "prompting." We term this
practice "Knowledge Engineering": the disciplined process of
systematically structuring and conveying one's problem, context,
ideology, and purpose to an AI to co-create a valuable intellectual
work.

To build a language for this new discipline, we turn to the work of
architect Christopher Alexander, who pioneered the concept of a Pattern
Language[^3] [^4]. A pattern language is not a mere catalog of
solutions, but a generative system that provides a vocabulary and a set
of interconnected patterns that guide a creator in building a coherent,
living whole.

While the idea of cataloging prompt techniques has been extensively
explored by researchers---with White et al. (2023) documenting
patterns[^5] and Schulhoff et al. (2024) providing a comprehensive
taxonomy of 58 prompting techniques[^6]---this paper argues that a true
language requires more than a catalog or taxonomy; it needs a grammar.
Our central contribution, therefore, is to propose such a grammar in the
form of a holistic Knowledge Engineering framework. This paper adopts
Alexander's approach to build not just a catalog, but a cohesive pattern
language for the Knowledge Engineering of LLMs, providing a structured
path for users to articulate their intent with precision and depth.

Our Pattern Language for Knowledge Engineering is structured around Six
Pillars. These pillars represent the distinct dimensions of knowledge a
user must consciously construct and provide to the LLM to guide its
reasoning. Each pillar is, in turn, illustrated by specific, practical
patterns:

1.  Problem Orientation: This pillar establishes the overall goal of the
    interaction. It is demonstrated by the Problem Orientation pattern,
    which guides the AI by clarifying the high-level challenge before
    diving into details.

2.  Ideology: This pillar sets the guiding values and analytical lens
    for the AI. We illustrate this with the Epistemology Frame pattern,
    which instructs the model to adopt a specific philosophical or
    ideological viewpoint for its analysis.

3.  Information Reserve: This pillar focuses on supplying the necessary
    background data and facts. It is supported by three key patterns:
    the Exhaustive Input pattern ensures the model has a rich base of
    information to work from; the Attachment pattern provides a
    practical way to include lengthy reference documents; and the Online
    Search pattern allows the model to access up-to-date information
    beyond its training data.

4.  Methodology: This pillar outlines a clear, step-by-step process for
    solving the problem. It is exemplified by two patterns: the
    Prescribed Process pattern, which breaks down a complex task into a
    clear sequence of actions, and the Decomposition pattern, which
    splits a large problem into smaller, manageable sub-problems.

5.  Form of Expression: This pillar gives the user precise control over
    the style and structure of the final output. It is demonstrated by
    the Structured Output pattern, which defines the exact format and
    layout of the AI's response, and the Style Mimicry pattern, which
    uses examples to guide the AI's tone and voice.

6.  Opinion and Insight: This final pillar represents the irreplaceable
    human element of purpose, creativity, and original insight that
    directs the entire process. While not a pattern itself, it is the
    core of the creator's contribution and will be discussed as such.

Figure 1 illustrates the relationship between these six pillars. The
diagram presents a top-down view with Opinion and Insight at the center,
representing the human core from which all knowledge engineering
originates. The five surrounding pillars---Problem Orientation,
Ideology, Information Reserve, Methodology, and Form of
Expression---radiate outward, each serving to amplify and channel the
creator's insight. This spatial arrangement emphasizes a key principle
of our framework: these pillars are not independent techniques, but
interconnected dimensions that work in concert to transform human
creativity into high-quality knowledge products.

![The Six Pillars of Knowledge Engineering. Opinion & Insight (the human
core) sits at the center, surrounded by five supporting pillars that
systematically structure the knowledge engineering
process.](media/image1.emf){width="4.614648950131234in"
height="4.614648950131234in"}

Fig. 1. The Six Pillars of Knowledge Engineering. Opinion & Insight (the
human core) sits at the center, surrounded by five supporting pillars
that systematically structure the knowledge engineering process.

The following chapters will explore each pillar and its supporting
patterns in detail, providing both a theoretical framework and a
practical guide. By mastering this system, users can evolve from simple
"prompters" into true "Knowledge Engineers," capable of transforming the
LLM from a source of generic answers into a powerful partner in the
creation of high-quality knowledge products.

# Pillar 1 - Problem Orientation

The foundational step in our Knowledge Engineering framework is the
pillar of Problem Orientation. Before any information is provided or any
task is executed, the user must first establish the overarching goal and
context of the interaction. This pillar serves as the strategic compass
for the entire endeavor, ensuring that all subsequent pillars---from the
Ideology adopted to the Methodology employed---are aligned with a clear
and shared objective. It addresses the fundamental question, "What
problem are we truly trying to solve?" Without this initial alignment,
even the most sophisticated prompt is at risk of producing a technically
correct but practically useless solution. This chapter explores the
principle of this first pillar through its direct, practical
implementation: a pattern of the same name, Problem Orientation.

## Pattern: Problem Orientation

### Context

You are interacting with a Large Language Model (LLM) to address a
complex issue or generate a nuanced knowledge product, not just to get a
simple, factual answer. The quality of the output depends heavily on the
AI's deep understanding of your specific situation and goals.

### Problem

How do you ensure an LLM generates a nuanced, context-aware knowledge
product rather than a generic response when addressing a complex issue?

### Forces

Without a clear, high-level goal, an LLM's response is likely to be
unfocused, generic, or misaligned with your true intent.

Users often dive straight into the details of a request without first
explaining the overarching problem. This failure to orient the model
stems from a common human assumption that context is shared or that the
AI "should know what I mean." This forces the LLM to guess the user's
objective. Faced with this ambiguity, the model defaults to a safe,
general-purpose response that addresses the literal query but misses the
specific, unstated context. This leads to boilerplate advice,
superficial analysis, and outputs that, while technically correct, are
not practically useful.

The core tension is between the user's need for a tailored, insightful
solution and the AI's tendency to produce generic content when its
operational context is not clearly defined. From a technical
perspective, an LLM processes a prompt sequentially; the beginning sets
the stage for everything that follows. If you provide a question without
an anchor, the AI's answer will float in a sea of generalized knowledge.

### Solution

**Use Problem Orientation by stating the overall problem, context, and
desired outcome *before* providing specific instructions or details.**
This practice provides the LLM with a strategic "big picture" that
serves as a frame of reference for interpreting all subsequent
information. This simple act of front-loading the high-level context
transforms the LLM from a generic answer machine into a focused
strategic partner. It allows the model to tap into the more specific
parts of its knowledge base that are relevant to your unique situation.

### Example

Let's walk through a scenario to see how Problem Orientation makes a
practical difference. Imagine the owner of a small, local organic bakery
wants to use an AI assistant for ideas on how to attract more customers.

#### Attempt 1: Prompt without Context

A busy owner might quickly type out a prompt without much background,
assuming the AI understands the general goal:

> **Prompt:** How can I improve my business?

The LLM, lacking any specific context, can only provide a generic answer
drawn from general business principles.

AI's Response (Excerpt):

> To improve your business, you should focus on several key areas.
> First, ensure you are providing excellent customer service, as happy
> customers are more likely to return. Second, invest in marketing to
> increase your visibility within the community. You might consider
> creating a social media presence or running local advertisements.
> Finally, consistently offer high-quality products or services and be
> responsive to customer feedback to build a strong reputation.

This advice isn't wrong, but it is entirely generic. It could apply to a
bakery, a mechanic shop, or a software company. It lacks any specific,
actionable insight relevant to the user's unique situation.

#### Attempt 2: Applying Problem Orientation

Now, the owner applies the Problem Orientation pattern by first
establishing the context.

> **Prompt:** I run a small organic bakery in a town dominated by big
> chain supermarkets. My bakery has loyal local customers, but we
> struggle to compete with the marketing and convenience of the chains.
> I want to attract more local customers and stand out. With this
> context in mind, what are some strategies I can use, especially for
> marketing and product offerings?

This revised prompt gives the AI a clear picture. It establishes:

-   **The Actor:** A small organic bakery.

-   **The Challenge:** Competing with large chains.

-   **The Goal:** Attract local customers and differentiate.

The AI, now equipped with this context, can provide a far more relevant
and actionable response.

AI's Response (Excerpt):

> Since you run a small organic bakery facing competition from larger
> chains, your strategy should emphasize uniqueness and community
> connection. Here are some tailored ideas:
>
> Marketing Strategies:

-   **Highlight Your Niche:** Focus marketing on the "organic" and
    > "artisanal" quality of your goods. Use in-store storytelling and
    > social media to share the origin of your ingredients.

-   **Local Partnerships:** Collaborate with other local businesses that
    > share your values, like independent coffee shops or local farms,
    > for cross-promotions.

> Product Offering Strategies:

-   **"Local Flavor of the Week":** Introduce a special weekly item
    > using a seasonal ingredient from a nearby farm. This creates
    > excitement and reinforces your local identity.

-   **Bakery Subscriptions:** Offer a "bread subscription" box for loyal
    > customers, creating predictable revenue and building habit.

This second response is dramatically more useful. It offers specific,
creative, and context-aware strategies that directly address the
bakery's stated problem. The AI didn't get smarter; the user simply
provided the necessary orientation for it to apply its knowledge
effectively.

### Discussion

Applying the Problem Orientation pattern has several positive
consequences. First, it dramatically increases the relevance and
specificity of the AI's response. By knowing your true goal, the model
can generate tailored strategies---ideas it would never produce from a
generic prompt.

Second, this pattern helps clarify the user's own thinking. The act of
articulating the high-level problem forces you to define your objectives
and constraints clearly, which often leads to a more focused and
effective request.

Finally, Problem Orientation serves as the strategic compass for all
other pillars in the Knowledge Engineering framework. It sets the
"mission" that informs the choice of Ideology, dictates what information
is relevant for the Information Reserve, and provides the goal for which
a Methodology is designed. It ensures that the entire knowledge
engineering process is aimed at the right target from the very
beginning. By starting with the "why," you empower the AI to generate a
much more powerful and useful "how."

However, this pattern requires upfront investment of time and thought.
For simple, straightforward queries, the effort of articulating a
detailed problem orientation may outweigh the benefits. There is also a
risk that overly verbose context can dilute focus rather than enhance
it, making it harder for both the user and the LLM to identify what
truly matters.

# Pillar 2 - Ideology

If the Problem Orientation pillar sets the destination for our inquiry,
the Ideology pillar provides the crucial lens through which the entire
journey is viewed. It is arguably the most transformative pillar in the
Knowledge Engineering framework, acting as a central hub that qualifies
and directs all other components. The chosen Ideology dictates which
facts within the Information Reserve are deemed relevant, what kind of
Methodology is appropriate for the analysis, and what tone and
vocabulary are suitable for the final Form of Expression. This conscious
selection of a guiding worldview---itself a profound act of the user's
Opinion and Insight---is what elevates an LLM's output from a mere
summary of information to a coherent, principled analysis. This chapter
will demonstrate how to operationalize this pillar through the
Epistemology Frame pattern, a technique for embedding a chosen
intellectual framework into the AI's reasoning process.

## Pattern: Epistemology Frame

### Context

You are creating a knowledge product that requires a specific, coherent
analytical perspective, rather than a neutral summary of information.
The topic may be complex, contentious, or value-laden, and the intended
output needs to reflect a particular school of thought, political
ideology, or theoretical framework consistently.

### Problem

How can you guide an LLM to produce analysis from a specific ideological
or theoretical perspective, rather than defaulting to a shallow
"neutral" stance?

### Forces

An LLM's default "neutral" stance will produce a shallow or misaligned
analysis for tasks requiring a specific ideological viewpoint.

When asked to analyze a complex issue, an LLM tends to produce a
balanced, non-committal response that avoids taking a strong stance.
This default behavior, while safe, is a significant limitation. This
supposed neutrality often masks an implicit bias toward the mainstream,
typically Western-centric, perspectives dominant in its training data.
This creates a dual problem: the output is both too generic for users
seeking a deep, principled critique, and potentially misaligned with
users who operate outside the model's default cultural framework. The
core tension is that the LLM, lacking a guiding philosophy, cannot
generate a text that is intellectually and ideologically coherent with
the user's unstated requirements.

### Solution

**Apply an Epistemology Frame by explicitly instructing the model to
adopt a particular worldview.** This pattern involves articulating the
core tenets, vocabulary, and analytical priorities of a chosen ideology
or theoretical perspective directly in the prompt.

This frame acts as a "lens" that forces the model to select, interpret,
and present information in a manner consistent with that specific
viewpoint. Instead of defaulting to a generic or implicitly biased
response, the LLM will generate an output that is infused with the
depth, nuance, and specific flavor of the chosen perspective. For
example, you can instruct the model to analyze an issue from a feminist
perspective, a libertarian viewpoint, or using the principles of
historical materialism. This allows users to explore topics from diverse
viewpoints and generate content that is intellectually coherent with
their goals.

### Example

To illustrate the transformative power of the Epistemology Frame,
consider a media analyst tasked with analyzing a news article about a
factory workers' strike. The analyst's organization requires a critique
grounded in Marxist theory.

#### Attempt 1: Prompt without an Epistemology Frame

The analyst first tries a straightforward prompt, providing the
article's text and asking:

> **Prompt:** Identify any biases in how this news article reports on
> the factory strike.

The news article focuses on the economic disruption of the strike,
quoting management and government officials, while only briefly
mentioning worker demands. The LLM, from its default stance, produces a
generic media literacy critique:

> **AI Response (Excerpt):** The article shows a subtle bias by
> prioritizing the perspectives of the government and factory
> management. The framing of the strike as a negative disruption,
> without giving equal weight to the workers' grievances, suggests a
> pro-management slant... To be more balanced, the article should have
> explored the workers' demands in greater depth.

This analysis is not incorrect, but it is superficial. It is a standard,
liberal critique of media fairness, not the specific Marxist analysis
the user requires.

#### Attempt 2: Applying the Epistemology Frame

The analyst refines the prompt by adding an explicit Epistemology Frame
before the task instruction.

> **Prompt:** You are to analyze the attached news article from a
> Marxist perspective. When you conduct your analysis, you must adhere
> to the following framework:

-   **Adopt a historical materialist worldview:** Analyze events as a
    > reflection of underlying class-based economic interests.

-   **Focus on Class Relations:** Identify which perspectives represent
    > the interests of the bourgeoisie (owners of capital) versus the
    > proletariat (the working class).

-   **Examine Ideological Framing:** Look for how the article frames the
    > strike---as a threat to social order (a bourgeois concern) or as a
    > legitimate part of the class struggle against exploitation. Note
    > language that naturalizes the capitalist status quo.

-   **Use Marxist Terminology:** Where appropriate, use concepts like
    > *class struggle*, *exploitation*, and *ideological hegemony*.

> **Task:** Given this Marxist framework, now analyze the attached news
> article for bias.

With this explicit frame, the LLM's reasoning is fundamentally
reoriented.

> **AI Response (Excerpt):** From a Marxist perspective, the news
> article functions as an instrument of bourgeois ideology, reinforcing
> the hegemony of the capitalist class. Its bias is not merely in source
> selection but is embedded in the very framing of the issue.
>
> The article portrays the strike primarily as a threat to economic
> stability and "public order," which are concerns that directly reflect
> the interests of the bourgeoisie. By emphasizing the disruption to
> production, the narrative legitimizes the perspective of capital...
> The workers' demands, which arise from their material conditions of
> exploitation, are marginalized... This framing is a classic example of
> **ideological hegemony**, where the media naturalizes the values of
> the ruling class. The absence of the workers' voices is an ideological
> act that silences the proletariat and denies the reality of the
> **class struggle** taking place.

This second response is dramatically different. It moves beyond a
surface-level critique to a deep analysis of power, ideology, and class
interests. By providing the Epistemology Frame, the user guided the AI
to produce a nuanced and targeted analysis that fulfilled the specific
requirements of the task.

### Discussion

The Epistemology Frame pattern is a powerful tool for generating deep
and principled analysis. Its primary consequence is transforming the LLM
from a neutral summarizer into a sophisticated analytical partner
capable of reasoning from within a specific intellectual tradition.

However, the pattern places a significant responsibility on the user.
The quality of the output is directly proportional to the quality of the
frame provided. A simplistic or caricatured frame will yield an equally
simplistic output. Therefore, to use this pattern effectively, the user
must be able to articulate the core tenets of the desired worldview, a
task that may require domain knowledge.

Furthermore, this pattern demonstrates a key aspect of the Knowledge
Engineering framework: the user's role is not merely to ask questions,
but to actively shape the AI's cognitive process. The Epistemology Frame
is a direct injection of human-chosen values and theory into the AI's
workflow, making it a profound act of co-creation where the user's
Opinion and Insight fundamentally directs the outcome.

It is worth noting that while the Persona pattern[^7] can sometimes
serve as a shortcut to adopting a perspective (e.g., "act as a security
expert"), the Epistemology Frame pattern becomes necessary when the
desired viewpoint is not sufficiently represented in the LLM's training
data or when the training data contains biases that misrepresent the
intended perspective. In such cases, merely invoking a persona label may
cause the LLM to default to mainstream or stereotypical interpretations.
The Epistemology Frame addresses this by explicitly defining the
philosophical and analytical principles, allowing the user to override
default assumptions and ensure the output aligns with their specific
theoretical requirements.

However, applying this pattern introduces the risk of replacing one
ideological bias with another. By explicitly framing the analysis
through a specific worldview, the user may inadvertently filter out
perspectives or evidence that do not fit the chosen framework,
potentially producing analysis that is coherent but incomplete or
one-sided.

# Pillar 3 - Information Reserve

The very concept of "Knowledge Engineering" begins with a fundamental
question: if the foundational information is not in place, how can any
engineering take place? This brings us to the third pillar,
**Information Reserve**, which serves as the concrete foundation of our
entire framework. A Large Language Model is, at its core, a powerful
tool equipped with vast general knowledge and the ability to acquire
more via search. However, it is inherently ignorant of the specific,
contextual knowledge required for any non-trivial task---it does not
know the data in *this* report, the history of *this* project, or the
nuances of *this* community. The primary act of knowledge engineering,
therefore, falls to the user: to consciously construct and provide this
specific reserve of information. This chapter details the practical
patterns for building this foundation: Exhaustive Input provides the
principle of completeness, Attachment offers the mechanism for
delivering large-scale context, and Online Search ensures the
information is current.

## Pattern: Exhaustive Input

### Context

You are undertaking a task that requires the LLM to reason based on
specific, detailed, and contextual information that is not part of the
model's general knowledge. This includes proprietary project data, the
full text of a specific document, or detailed background facts for a
case study.

### Problem

How can you provide an LLM with sufficient contextual information to
generate accurate, tailored responses when the required knowledge is not
part of its training data?

### Forces

When a prompt is sparse, the LLM is forced to produce a generic or
inaccurate response because it lacks the necessary information to
perform the task.

A prompt with minimal information forces the LLM to fill in the gaps
with its own assumptions or generalized knowledge. This often leads to
several critical failures: generic outputs that provide boilerplate
advice instead of tailored solutions; hallucinations, where the model
invents plausible-sounding but incorrect facts to complete the picture;
and misinterpretations, where the model misunderstands the core of the
request due to a lack of specifics. The central tension lies between the
user's expectation of a context-aware answer and the LLM's inability to
access any information not explicitly provided. Since LLMs lack
long-term memory of a user's specific context, every prompt must be
self-contained.

### Solution

**Use Exhaustive Input by providing the LLM with as much relevant
information as possible within the prompt.** This practice treats the
LLM not as an oracle that knows everything, but as a powerful reasoning
engine that operates strictly on the information it is given. Instead of
being brief, leverage the large context windows of modern LLMs to
include all necessary background, data, and specifics, leaving little to
assumption.

The larger the knowledge base you provide, the better the LLM can
understand your request. This might mean including lengthy descriptions,
data excerpts, or entire documents. By front-loading a comprehensive
Information Reserve, you guide the model toward more accurate and
tailored outputs, turning a generic assistant into a well-informed
specialist for your specific task.

### Example

Imagine a civil servant tasked with drafting a policy proposal for
"Improving Digital Literacy in Lakeside County." They possess a detailed
background report with specific local data.

#### Attempt 1: Minimal Input

The user starts with a simple, one-sentence prompt, assuming the LLM can
generate a reasonable starting point.

> **Prompt:** "Write a policy proposal for improving digital literacy in
> Lakeside County."

The LLM, lacking any specific data, produces a generic proposal. It
suggests common initiatives like setting up public Wi-Fi hotspots and
offering workshops at libraries. Its background section contains
boilerplate statements such as, "many individuals in Lakeside County
have limited access to digital tools." While not wrong, the output is
superficial and could apply to any county. It requires a major rewrite
to insert the specific statistics and needs of Lakeside County.

#### Attempt 2: Applying Exhaustive Input

The user now applies the Exhaustive Input pattern, creating a detailed
prompt that includes key findings from their background report.

Prompt:

> You are an expert policy analyst. Draft a detailed policy proposal for
> improving digital literacy in Lakeside County, using the following
> background information to make the proposal data-driven and tailored
> to the county's specific situation.
>
> Background Information (Lakeside County):

-   **Demographics:** 50,000 residents; 18% are seniors (65+).

-   **Connectivity Gap:** 72% of households have high-speed internet.
    > The remaining 28%, mostly in rural towns like Riverton and Pine
    > Hill, have limited or no access.

-   **Skills Gap:** A recent survey found \~40% of residents struggle
    > with online tasks. The greatest need is among adults over 50.

-   **Barriers:** 25% of non-users cite the cost of devices or internet
    > service as a major barrier.

-   **Opportunities:** A state grant for rural broadband expansion is
    > available. The local community college is willing to partner on
    > adult education classes.

> Now, based on that background, provide the proposal.

This prompt feeds the AI the exact data a human analyst would use. The
resulting output is transformed.

AI Response (Excerpt):

> Executive Summary:
>
> Lakeside County faces a digital divide affecting nearly a third of its
> residents, particularly its 18% senior population and those in rural
> communities like Riverton and Pine Hill. With 40% of residents
> reporting difficulty with essential online tasks, this proposal
> outlines a targeted plan leveraging available state grants and local
> partnerships...
>
> Proposed Initiatives:

1.  **Rural Broadband Expansion:** Apply for the state broadband grant
    > to extend fiber-optic service to Riverton and Pine Hill, targeting
    > a reduction in households without high-speed access from 28% to
    > under 10%.

2.  **Targeted Digital Literacy Hubs:** Partner with the community
    > college to offer classes specifically designed for residents over
    > 50, addressing the primary need identified in the survey.

3.  **Device Access Program:** Implement a device lending program
    > through libraries to address the cost barrier cited by 25% of
    > residents.

The second draft is no longer generic; it is a specific, actionable plan
rooted in the reality of Lakeside County. It directly references the
county's data and tailors its recommendations accordingly.

### Discussion

The primary consequence of using Exhaustive Input is a dramatic increase
in the accuracy and relevance of the LLM's output. By grounding the
model in a rich, specific context, you prevent it from hallucinating or
providing superficial responses. The model shifts from a generalist to a
specialist for your particular task. This pattern is foundational to the
concept of Knowledge Engineering, embodying the principle that the user
is not just a questioner but an active provider of knowledge.

The independence of the Information Reserve pillar from pillars like
Methodology and Form of Expression creates a powerful workflow
advantage. A user can focus on one phase of work---accumulating and
organizing the information reserve---without immediately worrying about
how that information will be processed or what its final output format
will be. This separation of concerns significantly lowers the cognitive
burden during the initial research and data-gathering stages.

This enables a powerful technique for qualitative research. For
instance, a researcher can conduct dozens of interviews and simply have
the audio transcribed. These raw, unedited transcripts---full of
nuances, digressions, and details the researcher might have missed---can
be provided as an Exhaustive Input to the LLM. Because modern context
windows can handle this volume of data, the researcher is freed from the
laborious task of manually coding and summarizing each interview
beforehand. In some cases, the LLM may even identify connections or
patterns across the full body of transcripts that the researcher
themselves had not noticed, demonstrating the immense value of providing
a truly exhaustive, un-pre-processed information reserve.

However, this pattern assumes that the user possesses---or can readily
obtain---all the necessary information. In many real-world scenarios,
complete information may be unavailable, proprietary, or costly to
gather. Additionally, the pattern embodies a "garbage in, garbage out"
principle: providing exhaustive but low-quality, outdated, or biased
information will not improve the LLM's output.

## Pattern: Attachment

### Context

You are working on a task that requires the LLM to process or refer to
large, pre-existing documents, such as full-length reports, research
papers, legal contracts, style guides, or extensive datasets. The
information in these documents is too long to be practically pasted into
the main body of a prompt.

### Problem

How can you provide comprehensive reference materials to an LLM when
they are too large to paste directly into a prompt?

### Forces

Pasting large volumes of reference material directly into a prompt is
impractical and often impossible, yet omitting this context leads to
poor, ungrounded results.

Users face a frustrating dilemma when a task relies on extensive
reference documents. While modern LLMs have large context windows,
pasting a 50-page report into a chat box is cumbersome, makes the prompt
difficult to manage. This leads to several ineffective workarounds:
omitting the context entirely, which forces the LLM to guess or
hallucinate; manually summarizing the documents, which is laborious and
risks losing crucial details; or feeding the information piecemeal,
which is confusing for the model and tedious for the user. Each of these
compromises starves the LLM of the very information it needs, resulting
in generic, inaccurate, or incomplete outputs.

### Solution

**Use the Attachment pattern by attaching relevant documents or files to
your prompt instead of pasting their content.** Most modern LLM
interfaces support file uploads. This allows you to provide the full,
unabridged source material---such as research papers, policy documents,
or style guides---directly to the model.

In your prompt, you then simply refer to the attached file(s) by name
and provide instructions on how the LLM should use them. This approach
has two key benefits:

1.  It provides complete context: The LLM has access to the entire
    document, ensuring its analysis or output is based on the complete
    source material, not an incomplete summary.

2.  It keeps your prompt clean and modular: Your instructions remain
    separate and easy to read, while the bulky reference material is
    neatly encapsulated in the attachment. These attachments become
    reusable assets in your knowledge engineering workflow, ready to be
    plugged into future tasks.

### Example

Consider a political analyst tasked with writing a confidential internal
report ("*nei can"* in Chinese) for government leaders. The report must
adhere to a specific ideological framework and a highly formal, concise
writing style. The analyst has two critical types of resources: a
document outlining the principles of Marxist analysis and two examples
of previously successful internal reports that demonstrate the required
structure and tone.

#### Attempt 1: The Dilemma without Attachments

Without the ability to attach files, the analyst is stuck. If she tries
to summarize the Marxist theory and the style of the sample reports in
her prompt, she will inevitably lose crucial nuance. The LLM, working
from these second-hand, simplified instructions, would likely produce a
report that is either ideologically shallow or stylistically off-target.
Pasting all the source material directly into the prompt would be
chaotic and unmanageable.

#### Attempt 2: Applying the Attachment Pattern

The analyst instead uses an LLM interface that supports file uploads.
She structures her prompt using a clear, organized method.

1.  **Preparing the Attachments:** She gathers her three reference
    files:

    -   Marxist_Epistemology.docx: A detailed guide on Marxist theory.

    -   Internal_Report_Example1.pdf: A sample of a well-written report
        from the previous year.

    -   Internal_Report_Example2.pdf: Another sample demonstrating the
        expected format.

2.  **Crafting the Prompt with Attachment References:** In her prompt,
    she creates a dedicated section to list and describe the purpose of
    each attachment. This is a crucial step for clarity.

-   Prompt:

> **Your Role:** You are an expert analyst assisting in the drafting of
> a confidential internal reference report.
>
> Attachments:

-   **Attachment 1:** Marxist_Epistemology.docx

    -   **Relevance:** Use this document as the core ideological and
        > methodological framework for your analysis.

-   **Attachments 2 & 3:** Internal_Report_Example1.pdf,
    > Internal_Report_Example2.pdf

    -   **Relevance:** Use these two reports as style guides. Follow
        > their structure, formal tone, and concise presentation of
        > arguments. **Do not use their content.**

> Task:
>
> Please analyze the current geopolitical event described in the
> briefing notes below. Draft a new internal reference report that:

-   Applies the analytical lens from **Attachment 1**.

-   Follows the stylistic format of **Attachments 2 and 3**.

> Briefing Notes on Current Event:
>
> \[Here, the analyst pastes the new information to be analyzed.\]

3.  **The Outcome:** By attaching the files, the analyst provides the
    LLM with a rich, multi-layered Information Reserve. The model can
    now access the full depth of the epistemology guide and the
    stylistic nuances of the sample reports. The generated report is
    remarkably on-target: its analysis is informed by the principles in
    Attachment 1, and its tone and format closely mimic the examples in
    Attachments 2 and 3. The analyst receives a high-quality first draft
    that requires minimal editing.

### Discussion

The Attachment pattern is the primary mechanism for implementing
Exhaustive Input when dealing with large volumes of information. It
elegantly solves the practical problem of providing deep context without
creating unmanageable prompts. By separating instructions from reference
materials, it keeps the user's core request clear and focused while
ensuring the LLM has access to the unabridged source data.

Furthermore, this pattern promotes a modular and reusable workflow. The
analyst in our example can now reuse the Marxist_Epistemology.docx
attachment for any future task requiring that specific lens. The example
reports can serve as style templates for any internal document. This
transforms reference documents from single-use inputs into a library of
reusable knowledge assets, which is a cornerstone of efficient Knowledge
Engineering. This practice is essential for scaling the production of
high-quality knowledge products across multiple projects and team
members.

However, this pattern depends on the LLM interface supporting file
upload functionality, which may not be available in all implementations.
Additionally, the effectiveness relies on the model's ability to
correctly parse and understand the specific file format---complex
layouts or specialized formats may not be fully interpreted. One
consideration when using this pattern is the context window size limit
of the LLM. While extremely large attachments may theoretically exceed
context limits, modern LLMs such as Gemini and Claude now support
context windows of over one million tokens, and this capacity continues
to expand across major models. This trend suggests that context window
constraints will become increasingly less of a practical concern for
most use cases.

## Pattern: Online Search

### Context

Your task requires information that is more current than the LLM's
knowledge cutoff date, or is too specific, niche, or recent to be
included in its general training data. You need to ground the LLM's
response in real-time, external facts.

### Problem

How can you ensure an LLM has access to current, up-to-date information
when its training data is frozen at a past knowledge cutoff date?

### Forces

An LLM's knowledge is static and frozen in time, leading to outdated,
incorrect, or "hallucinated" answers for topics requiring current
information.

Relying solely on an LLM's built-in knowledge is risky for any
time-sensitive or highly specific query. Because its training data has a
knowledge cutoff, the model is ignorant of recent events, discoveries,
or data. This results in several issues: it can provide outdated facts
(e.g., naming a former CEO as current); it may be unable to answer
questions about niche topics not widely represented in its training
data; and most problematically, it may hallucinate plausible-sounding
details to fill these knowledge gaps.[^8] This forces the user to
manually research and verify every claim, undermining the efficiency and
trustworthiness of the AI.

### Solution

Use Online Search by instructing the LLM to perform an online search to
build a fresh, up-to-date Information Reserve before performing the main
task. This pattern transforms the LLM from a static encyclopedia into a
dynamic research assistant.

The most effective way to apply this is often a two-step process:

1.  Search first: Prompt the AI to act as a research assistant. Instruct
    it to search the internet for specific facts, figures, expert
    opinions, or recent developments related to your topic.

2.  Then synthesize: Once the LLM has returned a summary of its search
    findings, provide a second prompt instructing it to use that freshly
    gathered information to perform the core task (e.g., write the
    speech, draft the analysis, answer the question).

This separation ensures the final output is grounded in verified,
current information, not just the model's internal---and potentially
outdated---knowledge.

### Example

Imagine an NGO leader preparing a speech about a major AI model that was
just released this week. Relying on the LLM's static knowledge would be
fruitless.

#### Attempt 1: Without Online Search

If the leader simply prompts her standard LLM, *"Draft a speech
discussing the new AI model from Company X,"* she will hit a wall. The
LLM, with its knowledge cut off before the announcement, would respond
with something like: *"I'm sorry, but I have no information about a new
AI model recently released by Company X. My knowledge is current only up
to \[date\]."* The user gets no useful output.

#### Attempt 2: Applying Online Search

The leader instead uses an LLM with web-Browse capabilities and follows
a two-step process.

Step 1: Instruct the LLM to Search for Information

She begins by explicitly prompting the LLM to act as a research
assistant:

> **Prompt:** "Please search the internet for the recent announcement
> about Company X's new language model. Find key details such as its
> name, its primary features, and any notable public reactions or quotes
> from experts."

The LLM performs the search and returns a summary of its findings:

LLM (Search Results Summary):

-   Company X announced the release of its new model, "XYZ-2," on April
    > 10, 2025.

-   Key features include vastly improved conversational abilities.

-   Dr. Jane Smith, a leading AI researcher, was quoted in a major tech
    > publication, stating, "This could significantly boost AI-assisted
    > education."

-   Some commentators have expressed caution about potential misuse.

Step 2: Instruct the LLM to Use the Gathered Information

With the research complete, she gives a second prompt to draft the
speech:

> **Prompt:** "Excellent. Now, using the information you just found,
> draft a 5-minute speech for our team. Introduce the new 'XYZ-2' model
> and discuss two potential implications for our NGO's work. Please
> incorporate the key facts (name, date, expert opinion) you found."

The AI now generates a speech draft that is both timely and specific,
weaving in the fresh facts it just retrieved. The resulting draft is
grounded in real-world, current events.

### Discussion

The Online Search pattern is a crucial method for overcoming the
inherent limitations of a static knowledge base. By actively directing
the LLM to consult external, real-time information, the user ensures the
Information Reserve for a given task is current and accurate.

This pattern, especially when implemented as a two-step "search, then
synthesize" process, reinforces the user's role as a Knowledge Engineer.
The user is not passively accepting the AI's built-in knowledge but is
actively directing the process of knowledge acquisition. This is a
powerful form of Methodology.

However, this pattern requires user diligence. It is essential to
critically evaluate the information the LLM retrieves. The model's
summary of search results can still contain errors, misinterpretations,
or reflect the biases of the sources it found. Best practice involves
asking the LLM for its sources and performing a quick verification of
key facts before using them in a final product. This act of verification
is a vital quality control step in the knowledge engineering workflow.

Another consideration is the context window size when search results are
extensive. However, with modern LLMs such as Gemini and Claude now
supporting context windows exceeding one million tokens---and this
capacity continuing to grow across major models---this limitation is
becoming less significant in practice.

# Pillar 4 - Methodology

Having assembled the necessary Information Reserve, the Knowledge
Engineering process shifts from curating knowledge to actively
processing it. This requires the fourth pillar: Methodology. We define a
methodology as a series of well-defined action steps---which can be
sequential or parallel---undertaken to achieve a specific goal. Although
interacting with an LLM is not programming in a formal sense, the
techniques required to achieve repeatable, high-quality outcomes share a
deep conceptual similarity. Both demand a structured, logical, and
process-oriented approach. It is this pillar that provides the
"algorithm" for the AI to execute upon the provided information. This
chapter introduces two foundational patterns for defining such a
methodology: Decomposition offers a strategy for structuring the
problem, and Prescribed Process provides the explicit, step-by-step
instructions for the AI to follow.

## Pattern: Prescribed Process

### Context

You are facing a complex task that requires multiple stages of analysis,
synthesis, or creation to reach a final output. Simply stating the
desired outcome is insufficient, as the *process* of getting there is as
important as the result itself.

### Problem

How can you ensure an LLM follows a rigorous, structured approach to
complex tasks rather than taking shortcuts or producing shallow
analysis?

### Forces

When given a complex task as a single, high-level request, an LLM may
take cognitive shortcuts, skip crucial analytical steps, or follow a
suboptimal workflow.

Without a clearly defined process, a model might produce a shallow or
incomplete result. It might generate a fluent-sounding answer that
appears correct on the surface but lacks the rigorous, step-by-step
reasoning necessary for a high-quality knowledge product. This occurs
because the user's *declarative* prompt ("Give me a policy brief")
leaves the *procedural* "how" entirely up to the AI's discretion. The
model, optimized for providing a plausible response quickly, may not
spontaneously undertake the necessary sub-tasks of research,
multi-faceted analysis, and structured argument construction that a
human expert would.

### Solution

**Use a Prescribed Process by providing the LLM with a clear,
step-by-step game plan.** This pattern involves instructing the model to
follow a specific sequence of actions to ensure thoroughness and
alignment with your desired methodology.

Instead of a single command, you break the task into a numbered or
bulleted list of instructions. For example:

1.  Analyze Context: First, summarize the provided background
    information to confirm understanding.

2.  Identify Key Factors: Next, identify and list the primary challenges
    and opportunities.

3.  Propose Solutions: Then, based on the factors identified in step 2,
    generate three distinct solutions.

4.  Draft Final Output: Finally, synthesize the above into a formal
    report with a specified structure.

By prescribing the procedure, you transform the prompt from a simple
question into a guided plan of action. The model is no longer guessing
the methodology; it is following your explicit roadmap.

### Example

Imagine a policy analyst tasked with writing a briefing on improving
digital literacy in public schools. The briefing must be comprehensive,
covering the background, challenges, case studies, and recommendations.

#### Attempt 1: The One-Shot Prompt

A simple, declarative request is made:

> **Prompt:** "Write a comprehensive policy brief on ways to improve
> digital literacy in public schools."

The LLM will likely produce a generic document. It might touch on
teacher training and access to technology, but it will probably lack
specific statistics, concrete case studies, or deeply considered
recommendations, because it was never explicitly instructed to perform
the research or analysis steps required to find them.

#### Attempt 2: Applying the Prescribed Process Pattern

The analyst refines the prompt to prescribe a clear workflow:

Prompt:

> **Background:** First, summarize the current state of digital literacy
> in public schools, including recent statistics on skill gaps.
>
> **Challenges:** Next, identify and explain the key challenges schools
> face (e.g., funding, teacher training).
>
> **Case Studies:** Then, describe two successful initiatives from other
> regions that have improved digital literacy, including their results.
>
> **Recommendations:** Based on the challenges and case studies, propose
> 3-5 actionable recommendations.
>
> **Conclusion:** Finally, conclude the briefing by summarizing how
> these actions can raise digital literacy.

When the LLM processes this prompt, its output is fundamentally
different. It is now a well-structured report where each section is the
result of a specific, mandated step. The Background is anchored with
data, the Challenges are explicitly enumerated, the Case Studies provide
concrete evidence, and the Recommendations are directly linked to the
preceding analysis.

### Discussion

The Prescribed Process pattern shifts the user's role from a simple
questioner to a project manager. By defining the workflow, the user
retains control over the methodology, ensuring the AI's powerful
generative capabilities are applied in a structured and rigorous manner.
This is the essence of the Methodology pillar.

This pattern is especially powerful when combined with others. For
instance, the steps in a Prescribed Process might instruct the AI to use
an Epistemology Frame for its analysis or to present its findings using
a Structured Output template.

A key consequence of this pattern is that it forces the user to think
systematically about their task. To prescribe a process, one must first
understand the logical steps required to move from a problem to a
solution. This act of planning not only leads to better AI outputs but
also sharpens the user's own analytical skills. It transforms a vague
goal into a clear, executable plan, making the collaboration with the AI
more predictable and effective.

However, prescribing a detailed process prematurely may limit the LLM's
ability to explore alternative approaches or discover better solutions.
The rigidity of a step-by-step prescription can constrain creativity and
prevent the model from making unexpected connections. Additionally,
users may overestimate the LLM's ability to faithfully follow complex
instructions---what appears to be a detailed, precise process to the
user may not be executed with the imagined level of fidelity by the
model.

## Pattern: Decomposition

### Context

You are facing a large and multifaceted task that is too complex to be
handled by a single, monolithic instruction. The task involves several
distinct components or stages that can be addressed separately before
being integrated into a final product.

### Problem

How can you manage complex, multifaceted tasks that are too large for an
LLM to handle effectively in a single request?

### Forces

A complex request presented as one large, unstructured task can easily
overwhelm an LLM, leading to a disorganized, shallow, or incomplete
answer.

When you ask the model to do everything at once, it struggles to manage
the cognitive load. It might overlook some parts of the task, jumble
different issues together, or fail to establish logical connections
between the different components of the problem. This "one-shot"
approach forces the model to guess at the structure and priority of the
sub-tasks, often resulting in an output that lacks depth and coherence,
and which ultimately requires a significant rewrite by the user.

### Solution

**Apply Decomposition by breaking the complex task into smaller,
distinct, and manageable subtasks.** This pattern follows the classic
principle of "divide and conquer." Instead of providing a single,
monolithic prompt, you either structure one large prompt into distinct
sections or, more effectively, engage the LLM in a series of prompts,
each tackling one sub-task.

The key is to ensure the subtasks are mutually exclusive (no overlapping
responsibilities) and collectively exhaustive (together, they cover the
entire problem). By doing this, you guide the LLM to focus its full
attention on one component at a time, leading to a more thorough and
structured result for each part. These well-defined parts can then be
integrated into a cohesive whole in a final step.

### Example

Imagine a project manager, Sarah, who needs to draft a detailed proposal
for a new community wellness initiative. The proposal must cover the
project's background, objectives, implementation plan, budget, and
evaluation metrics.

#### Attempt 1: The One-Shot Prompt

Pressed for time, Sarah gives the LLM a single, comprehensive prompt
asking for the entire proposal at once.

> **Prompt:** "Please write a detailed project proposal for a new
> 'Community Wellness Initiative,' including its background, objectives,
> a step-by-step implementation plan, a detailed budget, and key
> evaluation metrics."

The LLM produces a multi-page document that seems to cover all areas,
but upon inspection, Sarah finds it weak. The Background is generic, the
Implementation Plan is a vague list of steps, and the Budget does not
clearly connect to the proposed activities. The output is a classic
example of an overloaded request: technically complete, but disorganized
and superficial.

#### Attempt 2: Applying the Decomposition Pattern

Sarah decomposes the proposal-writing process into a series of
sequential prompts.

Step 1: Drafting the Core Sections Sequentially.

She tackles each section of the proposal as a separate task, using the
output of one step to inform the next.

> **Prompt 2 (Background & Objectives):** "Using the provided community
> health data, write the 'Background and Rationale' section for the
> proposal. Then, based on that background, propose three specific,
> measurable objectives for the initiative."

The LLM produces a compelling background section grounded in real data
and follows it with clear objectives like, "Reduce rates of adult
obesity by 10% within two years."

> **Prompt 3 (Implementation Plan):** "Based on the objectives above,
> create a detailed implementation plan. Break it down into quarterly
> phases for the first year and specify key activities for each phase."

The resulting plan is now concrete and tied directly to the stated
objectives.

Step 2: Integration and Final Polish.

With all the core components drafted, Sarah has a final prompt to bring
them together.

> **Prompt 4 (Final Integration):** "Combine the Background, Objectives,
> and Implementation Plan into a single, cohesive project proposal.
> Write a compelling executive summary to place at the beginning and a
> concluding paragraph that reinforces the project's value."

The LLM now acts as an editor, integrating the well-defined pieces and
adding the introductory and concluding "glue." The final proposal is
data-driven, logically structured, and every section is detailed and
aligned with the others.

### Discussion

The Decomposition pattern is a fundamental strategy within the
Methodology pillar. By breaking a large problem into smaller, more
focused sub-problems, the user can guide the LLM through a complex
reasoning process that would be unmanageable in a single step. This
approach not only produces higher-quality, more organized outputs but
also enhances the user's own understanding of the problem. The act of
decomposing a task forces the user to think structurally, identifying
the key components and their relationships.

This pattern offers several techniques for implementation, such as:

-   Pipeline: Where the output of one sub-task becomes the input for the
    next, creating a sequential workflow (e.g., first research, then
    analyze, then write).

-   Silo: Where different thematic parts of a task are handled in
    parallel prompts before being combined (e.g., writing the "Company
    News" and "Industry News" sections of a newsletter separately).

-   Zoom In: Where you start by generating a high-level outline and then
    use subsequent prompts to flesh out each section in greater detail.

By mastering Decomposition, the user shifts from merely asking a
question to architecting a solution process, a key step in becoming an
effective Knowledge Engineer. On a meta-level, the entire six-pillar
framework of this pattern language can be seen as an application of
Decomposition. It takes the singular, overwhelming challenge of
"creating a high-quality knowledge product with an AI" and breaks it
down into distinct, manageable stages of concern. This structured
approach---often referred to as separation of concerns in computer
science[^9]---not only reduces the cognitive load on the LLM, allowing
it to perform better on each focused sub-task, but more importantly, it
vastly reduces the cognitive load on the human user. By separating the
work of building an Information Reserve from defining the Methodology or
Form of Expression, the user can concentrate their intellectual energy
on one pillar at a time, leading to a more thoughtful and less stressful
creation process.

However, decomposition introduces the risk of fragmentation. When
subtasks are handled independently, each may lack awareness of the
broader context, potentially leading to inconsistencies or suboptimal
results. The individual components may not integrate smoothly, and
important cross-cutting insights that span multiple subtasks may be
overlooked.

# Pillar 5 - Form of Expression

The fifth pillar, Form of Expression, is what unlocks the accumulative
value of the entire Knowledge Engineering process. While the preceding
pillars build a deep and structured knowledge base, this pillar provides
the versatile interface to deploy that knowledge. Its significance lies
in enabling the same core asset---the curated Information Reserve and
the insights from the Methodology---to be rapidly rendered into
countless different forms for various purposes. An insight can be shaped
into a formal report, a concise email summary, a set of presentation
slides, or a public FAQ. This reusability ensures that the investment in
knowledge engineering is not a disposable, single-task effort. Instead,
it creates a knowledge asset that appreciates in value over time, much
like a human's own expertise. It is this potential for accumulation and
reuse that makes a deep engagement with knowledge engineering truly
meaningful. This chapter presents the two core patterns that give users
control over this final, crucial layer: Structured Output dictates the
logical layout, and Style Mimicry shapes the linguistic voice.

## Pattern: Structured Output

### Context

You need the LLM to produce an output that adheres to a specific format,
either for clarity, for consistency with other documents, or for
compatibility with another tool (e.g., a spreadsheet). The purpose of
the interaction goes beyond just getting information; it requires the
information to be presented in a particular way.

### Problem

How can you control the format and structure of an LLM's output to
ensure it meets specific presentation requirements?

### Forces

If you don't specify the output structure, the LLM will default to a
narrative format that is often difficult to use, inconsistent, or
missing expected components.

When left to its own devices, an LLM typically returns information in a
block of text. This creates several issues for the user: the output can
be hard to navigate, forcing the user to manually extract key points; it
can be missing essential components like an introduction or a conclusion
that the user implicitly expected; and the format can be inconsistent
across multiple related tasks. This forces the user to spend significant
time and effort on manual reformatting, defeating the purpose of using
an AI for efficiency.

### Solution

Use Structured Output by clearly outlining the structure you expect in
the response, providing an explicit format or template for the LLM to
follow. By doing so, you guide the model to deliver information in a way
that is immediately useful and requires minimal editing.

This can be done in several ways:

-   List the required sections by name: Instruct the model that the
    answer should have an introduction, several specific sections (e.g.,
    "Background," "Analysis," "Recommendations"), and a conclusion.

-   Define a template: For more complex structures, provide a
    mini-template directly in the prompt, showing the exact headings and
    layout you want the model to fill in.

-   Request a machine-readable format: For data-centric tasks, you can
    ask for specific formats like a Markdown table, a numbered list, or
    even CSV or JSON for easy import into other software.

### Example

Imagine an education policy analyst, Maria, who needs to prepare a
comparative summary of three different digital literacy programs for a
decision-making committee. The committee needs a clear, at-a-glance
comparison of each program's costs, target audience, methodology, and
reported outcomes.

#### Attempt 1: The Unstructured Request

Maria provides the AI with the source documents for the three programs
and asks:

> **Prompt:** "Please analyze the three attached digital literacy
> programs ('Digital Future,' 'Tech Learners,' and 'Connect a Kid') and
> provide a comparative summary of them."

The LLM processes the request and returns a detailed, multi-paragraph
essay. The text flows well, but weaves the information together, making
direct comparison difficult. Maria would have to manually pull out the
details for each program and re-organize them into a table, a tedious
data extraction task.

#### Attempt 2: Applying the Structured Output Pattern

Maria revises her prompt to include a clear structural requirement.

> **Prompt:** "Analyze the three attached digital literacy programs
> ('Digital Future,' 'Tech Learners,' and 'Connect a Kid'). Present the
> output as a **Markdown table** with the following columns: 'Program
> Name,' 'Target Audience,' 'Methodology,' 'Annual Cost,' and 'Key
> Outcomes.' Each program should have its own row in the table."

By specifying a table format and defining the exact columns, Maria gives
the model a precise blueprint. The LLM now produces the following
response:

  ------------------------------------------------------------------------------
  **Program   **Target          **Methodology**   **Annual    **Key Outcomes**
  Name**      Audience**                          Cost**      
  ----------- ----------------- ----------------- ----------- ------------------
  Digital     High School       Project-Based     \$200,000   30% increase in
  Future      Students (Grades  Learning,                     students pursuing
              9-12)             Advanced Skills               tech-related
                                                              fields.

  Tech        Unemployed &      Foundational      \$50,000    40% of
  Learners    Underemployed     Skills Workshops,             participants
              Adults            Job Placement                 secured employment
                                                              within 3 months.

  Connect a   Elementary        Gamified          \$75,000    85% of
  Kid         Students          Learning, Basic               participants
              (Low-Income       Digital                       reported increased
              Families)         Citizenship                   confidence with
                                                              tech.
  ------------------------------------------------------------------------------

This output is immediately useful. Maria can copy this table directly
into her briefing memo. The structured format makes the information
digestible and supports the decision-making process directly.

### Discussion

The Structured Output pattern is a cornerstone of the Form of Expression
pillar. Its primary consequence is transforming the AI's output from
raw, unstructured prose into a ready-to-use asset that is clear,
navigable, and fit for a specific purpose. By defining the *shape* of
the answer, the user dramatically increases its utility.

This pattern is essential for creating knowledge products that are meant
to be quickly scanned or consumed by others, such as executive
summaries, comparative tables, or meeting minutes. It also enables a
crucial next step in many workflows: machine readability. When an LLM
generates output in a consistent, structured format like CSV or JSON,
that output can be directly imported into other software (like a
spreadsheet or database) for further analysis, visualization, or
processing. This makes the LLM not just a text generator, but a vital
component in a larger data processing pipeline, significantly amplifying
its practical value in professional settings.

However, LLMs are probabilistic systems, not deterministic programming
languages. Structured outputs may fail to conform to the specified
format or contain errors---JSON that does not parse correctly, code that
does not compile, or data with internal inconsistencies. The fundamental
nature of LLM technology means that outputs cannot be fully trusted
without validation, regardless of how precisely the structure is
defined. Practical validation approaches include mechanical verification
(using automated tools to check format validity, such as JSON parsers or
compilers), human review (where domain experts verify the accuracy and
appropriateness of the content), and LLM-as-judge (using another LLM
instance to evaluate the output against specified criteria). In
high-stakes applications, a hybrid approach combining automated checks
with final human validation is recommended.

## Pattern: Style Mimicry

### Context

You need to produce an output that adheres to a very specific writing
style, tone, or voice, which may be particular to your organization,
your field, or your personal brand. This style is often nuanced and
difficult to describe with abstract commands alone.

### Problem

How can you ensure an LLM replicates a specific, nuanced writing style
when abstract style commands produce generic or misaligned results?

### Forces

Instructing an LLM to adopt a specific style using abstract commands
like "write formally" often produces generic or misaligned results.

An LLM has a default writing style that is typically neutral and
helpful. While you can modify it with simple commands, these often fail
to capture the subtle, implicit rules that define a truly specific
style. This leads to outputs that "feel wrong"---they might be
technically formal but lack the authoritative tone of an internal
report, or be technically casual but miss the specific wit of an
individual's voice. The core tension is that style is easier to
recognize than to describe, and the LLM cannot replicate a style it has
not been concretely shown.

### Solution

Apply Style Mimicry by systematically deconstructing a target style into
its core components, then instructing the LLM to follow that analysis.
The principle is to move from simply showing examples to engineering a
replicable style guide. This is achieved by analyzing a sample text
through the seven layers of stylistics, as proposed by linguist Paul
Simpson[^10]. You instruct the LLM to analyze a sample document along
these layers:

1.  Phonology: The sound patterns and rhythm of the text.

2.  Graphology: The visual presentation, including punctuation and
    layout.

3.  Morphology: The structure and formation of words.

4.  Lexis: The choice of vocabulary (e.g., formal, informal, technical).

5.  Syntax: The sentence structure (e.g., long, short, complex, simple).

6.  Semantics: The use of literal and figurative meaning, like
    metaphors.

7.  Discourse: The overall structure, voice, and authorial persona.

The output of this analysis is a detailed style guide that can be
provided in subsequent prompts to ensure the LLM generates new text in
the target style with high fidelity.

### Example

I often need to draft *nei can* (internal reference reports), which are
confidential briefings for government leaders. These documents have a
strict, unwritten style: highly formal, analytical, direct, and concise.

#### Attempt 1: Abstract Command

If I simply prompt the LLM, "Write a formal brief about this issue," the
output would be professional but would miss the specific nuances of the
*neican* genre. It would likely be too wordy and lack the direct,
authoritative tone required, forcing me to do a heavy rewrite.

#### Attempt 2: Applying Style Mimicry with Stylistics

To get the style right from the start, I use a two-step process.

Step 1: Creating a Style Guide via Stylistic Analysis.

First, I provide the LLM with two high-quality examples of past neican
reports using the Attachment pattern. Then, I give it a detailed
analytical task. It is worth noting that the actual prompt I use for
this task is much more detailed than the one shown here for brevity,
running to about 500 words. That detailed prompt, which elaborates on
each of the seven layers of stylistics, was not written by me manually.
Instead, in a separate process, I prompted an LLM to distill the core
principles from Paul Simpson's textbook on the subject, thereby using
the AI to create a sophisticated analytical tool for a subsequent task.

> **Prompt (abbreviated):** "I have attached two internal reference
> reports. Please analyze their writing style according to the seven
> layers of stylistics (Phonology, Graphology, Morphology, Lexis,
> Syntax, Semantics, Discourse). Generate a concise style guide that
> summarizes the key characteristics for each layer..."

The AI analyzes the examples and produces a detailed "style guide." For
instance, under Lexis, it might note: "Vocabulary is formal, direct, and
devoid of emotional language. Prefers specific, technical terms over
generalities." Under Syntax, it might report: "Sentences are typically
declarative and complex, often using subordinate clauses to convey
nuanced relationships." This guide becomes a reusable component of my
Information Reserve.

Step 2: Applying the Style Guide.

Finally, when I need to draft a new report, I can simply include this
AI-generated style guide in my prompt.

> **Prompt:** "Draft a new internal reference report on \[new topic\].
> You MUST follow the writing guidelines in the attached style guide,
> particularly regarding lexis and syntax."

The resulting draft is now remarkably on-target. Its structure, tone,
and vocabulary closely mirror the examples because it is following a
detailed, systematic set of rules, not just a vague instruction. This
dramatically reduces the editing time required.

### Discussion

The Style Mimicry pattern, when enhanced with a systematic framework
like the seven layers of stylistics, transforms the art of capturing a
voice into an engineering discipline. It operationalizes the Form of
Expression pillar by giving the user a structured method for defining
and replicating a desired style.

This approach is far more robust than simply providing examples and
hoping the model "gets it." By first generating an explicit style guide,
the user creates a reusable asset that ensures consistency over time and
across different tasks. It allows for a level of control over the subtle
qualities of a text---its tone, rhythm, and persona---that is otherwise
difficult to achieve. This method is invaluable for any context where
stylistic consistency is paramount, such as maintaining a corporate
brand voice, adhering to a specific publication's standards, or
capturing a unique authorial identity.

Furthermore, this pattern fundamentally changes how a knowledge worker
perceives their own capacity and workload. With the ability to rapidly
swap out one Form of Expression for another, a single, well-developed
body of research can be repurposed for different audiences in minutes,
not days. An academic paper can be refactored into a ten-minute video
interview script, a series of social media posts, or a popular science
article. This dramatically reduces the anxiety associated with taking on
diverse communication tasks. It fosters a new confidence: as long as the
core Information Reserve is solid, one can readily accept requests for
varied outputs---speeches, interviews, op-eds---knowing that the
delivery format is a manageable final step, not a new project from
scratch. This versatility is invaluable for disseminating research and
ideas broadly.

However, the effectiveness of this pattern depends critically on the
quality of the sample text provided for analysis. If the sample is not
truly representative of the target style, or if only a single example is
provided when the style has significant variation, the resulting style
guide may capture superficial features while missing the underlying
principles. The LLM may then produce outputs that sound similar on the
surface but lack authentic voice.

# Pillar 6 - Opinion and Insight: The Human Creator's Core

In his seminal work, the architect Christopher Alexander argued that a
pattern language is not a mere catalog of isolated solutions; it is a
generative system that provides a path for creating a coherent, living
whole---a structure imbued with what he famously termed a "quality
without a name." Our Six Pillars framework is designed to function as
precisely such a system. It provides the grammar that connects
individual patterns, guiding the creator not just in solving discrete
problems, but in weaving those solutions into a unified and purposeful
artifact. This chapter will now explore the most vital element of that
grammar: the pillar of Opinion and Insight, the human core from which
this "quality without a name" ultimately emerges.

To understand its role, we can view the first five pillars as a
complete, interconnected knowledge production line. Problem Orientation
acts as the project's mission brief, defining the ultimate goal and
scope of the work. Ideology serves as the design philosophy and quality
control standard, ensuring that every subsequent step aligns with a
chosen set of values and principles. The Information Reserve is the
carefully selected raw material, the foundational knowledge base upon
which all work will be performed. Methodology provides the automated
assembly line, a structured process that transforms these raw materials
into processed insights. Finally, Form of Expression is the customizable
packaging department, shaping the final product to be perfectly suited
for its intended consumer.

This production system, however, remains inert without a prime mover. It
requires an architect to design it, a chief executive to greenlight it,
and a visionary to give it purpose. This is the exclusive role of
Opinion and Insight. This pillar is not a step *in* the assembly line;
it is the animating force that conceives of the line, initiates its
operation, and ultimately judges the value of its output. It is the
human creator's unique perspective that first identifies a problem as
worth solving. It is their deeply held conviction that selects one
Ideology over another. And it is their final judgment that determines
whether the output is not just correct, but meaningful. Opinion and
Insight is therefore the alpha and the omega of the knowledge
engineering process.

When this human-directed system is empowered by a Large Language Model,
the result is a "Great Acceleration" of knowledge work. This
acceleration does not, as some fear, replace human intellect.On the
contrary, it elevates it by outsourcing a vast swath of low-level,
repetitive intellectual labor. Tasks such as summarizing source
materials, reformatting data, generating boilerplate code, or drafting
generic communications---once the time-consuming groundwork of any
knowledge project---are now delegated to the AI. This frees the human
creator to focus exclusively on the high-level intellectual work that
only they can perform: defining a novel research question, making a
complex strategic or ethical judgment, or synthesizing disparate fields
of knowledge into a new, original insight.

This dynamic, in which automation increases the demand for high-level
human faculties, is not new. It is a direct echo of the principles
articulated by the pioneer of cybernetics, Norbert Wiener, in his 1950
book *The Human Use of Human Beings*[^11]. Wiener argued that the first
industrial revolution, by automating manual labor, did not render humans
useless but instead compelled them to specialize in the intellectual
work that machines could not do. The AI revolution is now initiating a
similar shift *within* the domain of intellectual labor itself. It
automates the routine and the formulaic, thereby making uniquely human
attributes like creativity, critical thinking, and moral purpose more
valuable than ever. The intensity of our intellectual work, therefore,
does not decrease; it increases, as does the quality and volume of the
wisdom we can produce.

Ultimately, mastering the framework presented in this pattern language
is not about learning to converse more effectively with a machine. It is
about embracing a new identity for ourselves in the age of AI. The goal
is to evolve from a "prompt engineer," who focuses on the syntax of a
single instruction, to a "Knowledge Engineer," who architects an entire
system of thought. By consciously wielding our own Opinion and Insight
to direct this powerful collaborative process, we use the LLM not as a
replacement for our own intelligence, but as an amplifier for our unique
creativity and purpose.

# Epilogue

The six pillars of Knowledge Engineering presented in this pattern
language are, on the other hand, the essential inputs a user must
provide to a Large Language Model to elicit high-quality work. On the
other hand, the process of preparing these inputs can itself be
powerfully augmented by the LLM. This recursive dynamic, where the AI is
used to build the very inputs that guide it, represents a deeper level
of human-AI collaboration. This synergy can be observed across the
pillars:

-   **Ideology:** A user can begin with a simple ideological premise
    and, through a Socratic dialogue with an LLM, develop it into a
    sophisticated analytical framework. By asking the model to
    elaborate, provide counterarguments, and structure the principles, a
    user can generate a comprehensive ideological guide to use in
    subsequent prompts.

-   **Information Reserve:** The task of building a knowledge base from
    vast amounts of unstructured information can be dramatically
    accelerated. An LLM can be prompted to transform entire books into
    concise summaries or even structured knowledge graphs. It can also
    rapidly process hours of interview transcripts, converting messy
    dialogue into clean, analyzable text, thereby quickly establishing
    the rich Information Reserve needed for a complex task.

-   **Methodology:** A user can build their own methodology by
    leveraging the AI to deconstruct the work of others. By providing
    the LLM with an example of a successful research paper or project
    report and ask the LLM to reverse engineer it, a user can extract
    the underlying method---the sequence of actions, the structure of
    the argument, the way evidence is presented---and adapt it for their
    own purposes.

-   **Form of Expression:** Similarly, a desired writing style can be
    systematically captured and reapplied. A user can provide a sample
    text and instruct the LLM, using a framework such as the seven
    levels of stylistics, to analyze its specific features---from
    sentence structure and vocabulary to the use of metaphor. The result
    is a detailed style guide that can then be used with the Style
    Mimicry pattern to ensure stylistic consistency across all generated
    outputs.

-   **Problem Orientation and Opinion & Insight:** While these pillars
    represent the core of human intellect and cannot be automated, their
    formation can be significantly aided by the LLM. There is no set of
    patterns to automatically generate a novel worldview or a compelling
    research question. However, through a brainstorm dialogue, a user
    can converse with the AI as a thought partner. This process of
    discussion and exploration helps the user clarify their own
    thinking, sharpen a vague problem awareness into a precise
    objective, and distill scattered ideas into a coherent insight.

This pattern language, therefore, is not a final destination but merely
the beginning of the map. It offers a structured way to think about our
collaboration with AI, but countless more patterns and workflows remain
to be discovered as we explore this new territory. Yet, as we venture
forth, we must hold onto a central truth. The kernel of this entire
process---the source of a meaningful Problem Orientation and the
wellspring of a unique Opinion and Insight---is, and must always be,
grounded in human-led research, lived experience, and critical thought.
The ultimate purpose of mastering this Knowledge Engineering system is
not to become lost in a dialogue with a machine, but to use that machine
to liberate ourselves to do more of what is most essentially human: to
conduct the on-the-ground investigation, to engage in practice with the
communities we serve, and to connect our critical thinking with
tangible, real-world experience.

[^1]: Permission to make digital or hard copies of all or part of this
    work for personal or classroom use is granted without fee provided
    that copies are not made or distributed for profit or commercial
    advantage and that copies bear this notice and the full citation on
    the first page. To copy otherwise, to republish, to post on servers
    or to redistribute to lists, requires prior specific permission. A
    preliminary version of this paper was presented in a writers'
    workshop at the 32nd Conference on Pattern Languages of Programs,
    People, and Practices (PLoP). PLoP'25, October 12--15, Skamania
    Lodge, Columbia River Gorge, Washington, USA. Copyright 2026 is held
    by the author(s). HILLSIDE 978-1-941652-22-0

    https://doi.org/10.64346/PLoP2025p02

[^2]: Liu, P., Yuan, W., Fu, J., Jiang, Z., Hayashi, H. and Neubig, G.,
    2023. Pre-train, prompt, and predict: A systematic survey of
    prompting methods in natural language processing. *ACM Computing
    Surveys*, *55*(9), pp.1-35.

[^3]: Alexander, C., 1977. A pattern language: towns, buildings,
    construction. Oxford university press.

[^4]: Alexander, C., 1979. *The timeless way of building* (Vol. 1). New
    york: Oxford university press.

[^5]: White, J., Fu, Q., Hays, S., Sandborn, M., Olea, C., Gilbert, H.,
    Elnashar, A., Spencer-Smith, J. and Schmidt, D.C., 2023. A Prompt
    Pattern Catalog to Enhance Prompt Engineering with ChatGPT. *arXiv
    preprint arXiv:2302.11384*.

[^6]: Schulhoff, S., Shapira, L., and Gunasekar, S., 2024. The Prompt
    Report: A Systematic Survey of Prompt Engineering Techniques. *arXiv
    preprint arXiv:2406.06608*.

[^7]: White, J., Fu, Q., Hays, S., Sandborn, M., Olea, C., Gilbert, H.,
    Elnashar, A., Spencer-Smith, J. and Schmidt, D.C., 2023. A Prompt
    Pattern Catalog to Enhance Prompt Engineering with ChatGPT. *arXiv
    preprint arXiv:2302.11382*.

[^8]: Ji, Z., Lee, N., Frieske, R., Yu, T., Su, D., Xu, Y., Ishii, E.,
    Bang, Y., Madotto, A. and Fung, P., 2023. Survey of hallucination in
    natural language generation. *ACM Computing Surveys*, *55*(12),
    pp.1-38.

[^9]: Parnas, D.L., 1972. On the criteria to be used in decomposing
    systems into modules. *Communications of the ACM*, *15*(12),
    pp.1053-1058.

[^10]: Simpson, P., 2004. *Stylistics: A resource book for students*.
    Psychology Press.

[^11]: Wiener, N. (1950). The human use of human beings: cybernetics and
    society. Houghton Mifflin.
