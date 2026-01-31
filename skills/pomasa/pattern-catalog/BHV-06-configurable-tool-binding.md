# Configurable Tool Binding

**Category**: Behavior
**Necessity**: Recommended

## Problem

How to select and prioritize web research tools in a cost-effective and reliable way?

In declarative MAS systems, agents need tools for web search and content fetching. Different tools have different trade-offs:

1. **AI Provider Default Tools** (e.g., `WebSearch`, `WebFetch`)
   - Always available in the runtime
   - But often more expensive (consume AI provider API quota)
   - May have limitations on access to certain content

2. **MCP Tools** (e.g., crawl4ai, serper, oxylabs)
   - Often free or cheaper than AI provider tools
   - May offer enhanced capabilities (better content extraction, paywall bypass)
   - But may not always be available or may fail for certain URLs

The challenge is to provide a sensible default that optimizes for cost and capability while ensuring reliability.

## Context

This pattern applies when:

- Agents need to perform web research (search and fetch)
- Cost optimization is desirable
- Multiple tool options are available in the runtime

This pattern should be applied by default for all systems that include web research capabilities.

## Forces

- **Cost vs Reliability**: Cheaper tools may be less reliable
- **Capability vs Availability**: Powerful tools may not always be available
- **Simplicity vs Flexibility**: Default configuration should work for most cases, but allow overrides

## Solution

**Provide a default tool priority list that prefers MCP tools (free/powerful) over AI provider default tools (expensive). Agent blueprints use conceptual terms ("search tool", "web fetch tool") while the tool priority is defined in one central location.**

### Default Tool Priorities

**Search Tools** (priority from high to low):
1. `mcp__serper-search__google_search` - Google search via Serper API
2. `WebSearch` - AI provider default (fallback)

**Web Fetch Tools** (priority from high to low):
1. `mcp__crawl4ai__read_url` - Free, good for most pages
2. `mcp__oxylabs__universal_scraper` - Powerful, handles difficult pages
3. `mcp__oxylabs__ai_scraper` - AI-powered extraction
4. `WebFetch` - AI provider default (fallback)

### Tool Selection Strategy

```
┌─────────────────────────────────┐
│  Need to search/fetch web       │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Try tools in priority order    │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Tool succeeded?                │
└──────────────┬──────────────────┘
               │
        ┌──────┴──────┐
        │ Yes         │ No
        ▼             ▼
┌────────────┐  ┌─────────────────┐
│   Done     │  │ More tools in   │
│            │  │ priority list?  │
└────────────┘  └────────┬────────┘
                         │
                  ┌──────┴──────┐
                  │ Yes         │ No
                  ▼             ▼
          ┌─────────────┐ ┌────────────┐
          │ Try next    │ │ Report     │
          │ tool        │ │ failure    │
          └─────────────┘ └────────────┘
```

### Rationale for Default Priorities

**Why prefer MCP tools over AI provider defaults:**
- AI provider tools (WebSearch, WebFetch) typically consume API quota and are more expensive
- MCP tools like crawl4ai are free and often sufficient for most use cases

**Why crawl4ai before oxylabs:**
- crawl4ai is free and handles most standard web pages well
- oxylabs is more powerful (handles JavaScript rendering, paywalls) but may have usage costs
- Try the free option first, escalate to powerful option when needed

**Why keep AI provider tools as final fallback:**
- They are always available in the runtime
- Ensures the system can still function even if all MCP tools fail

## Consequences

### Benefits

- **Cost Optimization**: Free/cheap tools are tried first
- **Graceful Degradation**: Multiple fallbacks ensure reliability
- **Simplicity**: Default configuration works without user intervention
- **Consistency**: Tool priority is defined once, used everywhere

### Liabilities

- **Slightly Slower**: May need multiple attempts if preferred tools fail
- **MCP Dependency**: Optimal cost requires MCP tools to be configured

## Implementation Guidelines

### In Agent Blueprints

Use conceptual terms, not specific tool names:

```markdown
## Web Research Method

When collecting information from the web, use the **search tool** to find sources
and the **web fetch tool** to retrieve content.

For tool priorities, see the "Tool Priorities" section below.
```

### Tool Priorities Section (include once in each blueprint that does web research)

```markdown
## Tool Priorities

**Search Tools** (try in order):
1. `mcp__serper-search__google_search`
2. `WebSearch`

**Web Fetch Tools** (try in order):
1. `mcp__crawl4ai__read_url`
2. `mcp__oxylabs__universal_scraper`
3. `mcp__oxylabs__ai_scraper`
4. `WebFetch`

When a tool fails (error, timeout, or returns empty), try the next tool in the list.
Only report failure when all tools have been exhausted.
```

### Advanced: User Overrides

For advanced users who need to customize tool priorities, they can specify overrides in the user input:

```markdown
## Tool Priority Overrides (Advanced)

**Search Tools**: [custom priority list, or "default"]
**Web Fetch Tools**: [custom priority list, or "default"]
```

Most users should leave this section empty or omit it entirely to use the defaults.

## Examples

### Standard Usage (No Override)

User input does not specify tool overrides. The system uses default priorities.

Agent attempts to fetch a web page:
1. Try `mcp__crawl4ai__read_url` → times out
2. Try `mcp__oxylabs__universal_scraper` → succeeds
3. Return content

### Advanced: Override for Specific Needs

A user needs to access paywalled content and wants to use oxylabs exclusively:

```markdown
## Tool Priority Overrides (Advanced)

**Search Tools**: default
**Web Fetch Tools**: mcp__oxylabs__universal_scraper, mcp__oxylabs__ai_scraper
```

The system will only use oxylabs tools for fetching, with no fallback to free tools.

## Related Patterns

- **[Intelligent Runtime](./COR-02-intelligent-runtime.md)**: Provides the default WebSearch and WebFetch tools
- **[Grounded Web Research](./BHV-05-grounded-web-research.md)**: Defines how to use search and fetch tools correctly; this pattern defines which tools to use

## Checklist

When implementing this pattern, confirm:

- [ ] Agent blueprints use conceptual terms ("search tool", "web fetch tool")?
- [ ] Tool priority list is included in each blueprint that does web research?
- [ ] Priority list is not duplicated across multiple sections within the same blueprint?
- [ ] Default priorities prefer free/MCP tools over AI provider defaults?
- [ ] Fallback chain includes AI provider defaults as final option?
