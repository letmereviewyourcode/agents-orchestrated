# Agents, Orchestrated

**Autonomy is table stakes. The moat is everything around the agent.**

A series of real builds on the agentic stack. Each episode takes one layer
everyone is talking about — agent loops, generative UI, agents that pay — and
turns it into a working system, then ships the film and the code. These aren't
toys: every build carries the parts that decide whether agents survive
production — verification, orchestration, human oversight, grounding, and an
audit trail.

📺 Episodes land on [LinkedIn](https://www.linkedin.com/in/zishanalikhan).
Every build is a public repo on this profile.

---

## Episodes

### EP 01 · Loops — *verification is the moat*

> He stopped writing code. He writes loops.

Every agentic coding tool converged on the same shape: goal in, iterate,
verify each pass. Why the loop you can **audit** is the only loop that ships.

**Code:** [`what-are-loops`](https://github.com/letmereviewyourcode/what-are-loops)

### EP 02 · AG-UI — *human-in-the-loop + orchestration + grounding is the moat*

> Agents can stream the whole **interface**, not just text.

AURUM: a (fictional) private bank onboarding clients on **Camunda 8**. Every
agent decision streams to the browser as live, clickable UI over the open
**AG-UI protocol** — and when the money gets serious, the *process* pauses for
a human, visibly, in Camunda Operate. Fully runnable, even without API keys.

**Watch:** [the 2:30 film](https://www.linkedin.com/posts/zishanalikhan_agenticai-agui-camunda-ugcPost-7480344185674313728-ffd8) ·
**Code:** [`camunda-agui-wealth-demo`](https://github.com/letmereviewyourcode/camunda-agui-wealth-demo)

### EP 03 · AP2 — *cryptographic authority + governance is the moat*

> An agent with a signed spending limit. Then three times it refuses to spend.

Agentic commerce comes down to one question: how do you let an AI buy things
for you *safely*? **AP2** (the Agent Payments Protocol, started by Google and
handed to the **FIDO Alliance**) answers it with signed mandates: you sign the
rules, the agent signs the actual cart, and the merchant verifies both before
taking a cent. I gave an agent a $7,000 ceiling, let it buy World Cup tickets
while I slept, then tried to break it. Tampering with the signed limit gets
refused by cryptography; getting close to the limit gets escalated to me by a
**Camunda 8** decision table. Every hop is one auditable process.

**Watch:** [the 3:47 film](https://www.linkedin.com/posts/zishanalikhan_agenticcommerce-ap2-camunda-ugcPost-7496996686808903680-UVxw) ·
**Code:** [`camunda-ap2-payments-demo`](https://github.com/letmereviewyourcode/camunda-ap2-payments-demo)

---

**Next up: EP 04 · model routing, and what it costs you to pick wrong.**

## Behind the series

**Zishan Ali Khan** — Enterprise AI GTM & Solutions at Camunda. My day job is
putting agents inside real business processes; this series is where I build
each layer end to end and publish what holds up. On
[LinkedIn](https://www.linkedin.com/in/zishanalikhan) if you're building on
any of these layers.
