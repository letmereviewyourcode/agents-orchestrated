/* Visual codemap for Agents, Orchestrated.
   Click a node → inspector. Hash (#ep01|#ep02|#ep03|#shared|#stack) selects a view. */

const REPOS = {
  ep01: "https://github.com/letmereviewyourcode/what-are-loops",
  ep02: "https://github.com/letmereviewyourcode/camunda-agui-wealth-demo",
  ep03: "https://github.com/letmereviewyourcode/camunda-ap2-payments-demo",
};

const VIEWS = {
  stack: {
    title: "The series as one system",
    subtitle: "Three repos, one control plane. Humans at the top, cryptography at the bottom. Click any box.",
  },
  ep01: {
    title: "EP 01 · what-are-loops",
    subtitle: "A verification loop that made a film about verification loops. The Remotion renderer is private; this repo is the spec, the check, and the result.",
  },
  ep02: {
    title: "EP 02 · camunda-agui-wealth-demo",
    subtitle: "AURUM. One SSE stream, three surfaces, Camunda holding the token. Expand a layer by clicking it.",
  },
  ep03: {
    title: "EP 03 · camunda-ap2-payments-demo",
    subtitle: "Open mandate → closed mandate → merchant verifies the chain. Four demo paths, one spending table.",
  },
  shared: {
    title: "Shared DNA",
    subtitle: "EP 03 did not start from a blank folder. These files recur, renamed only when the job changed.",
  },
};

const NODES = {
  stack: [
    { id: "humans", x: 80, y: 28, w: 840, h: 56, label: "Humans — customer · advisor · operator · merchant", sub: "three browsers, one truth", fill: "#161618", repo: "ep02",
      kicker: "Surface",
      body: "Customer, advisor, and operator views subscribe to the same AG-UI stream. The operator view is the raw wire — the “don’t take my word for it” surface from the films. EP 03 adds the merchant (TicketVault) as a fourth party that independently verifies signatures.",
      path: "frontend/src/views/*", links: ["ep02", "ep03"] },
    { id: "agui", x: 80, y: 108, w: 840, h: 56, label: "AG-UI · Server-Sent Events", sub: "the wire — EP 02 invented the pattern, EP 03 reused it", fill: "#13261f", repo: "ep02",
      kicker: "Protocol",
      body: "Typed events over one EventSource: TEXT_MESSAGE, TOOL_CALL, GENERATIVE_UI, USER_TASK, RUN_FINISHED. The UI is a reducer over that stream. Swap a donut for a mandate card — same wire.",
      path: "frontend/src/agui-client.js  ·  backend/src/sseHub.js" },
    { id: "loop", x: 80, y: 188, w: 840, h: 56, label: "The loop — generate → run → check → repeat", sub: "EP 01 named it; every later episode runs one", fill: "#2a2114", repo: "ep01",
      kicker: "EP 01",
      body: "A loop is an agent that runs itself. Continuation is either a trigger or a goal. Verification is the moat: independent judge, tests-until-green, or artifacts a human can audit. “Done” is evidence, not vibes.",
      path: "LOOPS_DEEP_DIVE.md" },
    { id: "bff", x: 80, y: 268, w: 400, h: 64, label: "Node BFF", sub: "sseHub · workers · task poller", fill: "#161618", repo: "ep02",
      kicker: "Bridge",
      body: "Thin on purpose. Workers implement tool jobs and emit AG-UI events. The LLM loop itself lives in Camunda (AI Agent Connector), not in this Node process — that’s the point of EP 02’s learning guide.",
      path: "backend/src/" },
    { id: "camunda", x: 520, y: 268, w: 400, h: 64, label: "Camunda 8", sub: "BPMN · DMN · Operate · Tasklist", fill: "#161618", repo: "ep02",
      kicker: "Orchestrator",
      body: "The process is the orchestrator. User tasks pause a token until a human acts. DMN tables route wealth tiers (EP 02) and spending policy (EP 03). Operate is the audit trail the films keep cutting to.",
      path: "bpmn/  ·  dmn/" },
    { id: "ground", x: 80, y: 360, w: 400, h: 64, label: "Grounding", sub: "KB seed + query as BPMN steps", fill: "#161618", repo: "ep02",
      kicker: "EP 02",
      body: "Retrieval is a process step, not a system prompt. client-kb-seed.bpmn / client-kb-query.bpmn + kbQueryWorker.js. Guardrail: what it can’t verify, it doesn’t invent.",
      path: "bpmn/client-kb-*.bpmn  ·  backend/src/workers/kbQueryWorker.js" },
    { id: "auth", x: 520, y: 360, w: 400, h: 64, label: "AP2 authority", sub: "ES256 JWS open → closed mandate", fill: "#1f1c14", repo: "ep03",
      kicker: "EP 03",
      body: "jose + ES256. User signs the open checkout mandate (cap $7,000). Agent signs the closed mandate bound to a sha256 cart hash. Merchant runs three checks: user sig, agent sig, constraints. Tamper the cap inside the token and checkout is refused — cryptography, not a database flag.",
      path: "backend/src/mandateService.js" },
    { id: "policy", x: 80, y: 452, w: 840, h: 56, label: "Governance — DMN first-hit tables, visible in Operate", sub: "wealth routing · spending policy", fill: "#161618", repo: "ep03",
      kicker: "Policy",
      body: "EP 02: wealth-routing.dmn sends private-wealth tiers to a human user task. EP 03: spending-policy.dmn (5 rules, first-hit) auto-approves, escalates at 98% of cap, or declines a breach. The table result is linked to the process instance.",
      path: "bpmn/wealth-routing.dmn  ·  dmn/spending-policy.dmn" },
  ],
  ep01: [
    { id: "goal", x: 360, y: 24, w: 280, h: 52, label: "/goal  + spec", sub: "one command, four checks", fill: "#2a2114",
      kicker: "The loop",
      body: "The video was not hand-edited. A Claude Code /goal was pointed at VIDEO_SPEC.md + CAPTION_SCRIPT.md. It built the film, then verified itself frame-by-frame before calling the job done. A verification loop, to make a video about verification loops.",
      path: "VIDEO_SPEC.md", repo: "ep01" },
    { id: "spec", x: 40, y: 120, w: 200, h: 52, label: "VIDEO_SPEC.md", sub: "objective · storyboard · DoD", fill: "#161618",
      kicker: "Spec",
      body: "Source of truth for the /goal. Design system (stage #0B0B0C, amber #EF9F27, Inter + JetBrains Mono), storyboard at 30fps / 1740 frames (~58s), and the locked GOAL_TEXT typed identically into all three tools.",
      path: "VIDEO_SPEC.md", repo: "ep01" },
    { id: "captions", x: 260, y: 120, w: 220, h: 52, label: "CAPTION_SCRIPT.md", sub: "locked copy + 4-layer check", fill: "#161618",
      kicker: "Verification",
      body: "Every on-screen word, timed. Layer 0 compile; layer 1 frame stills with the correct caption actually on screen; layer 2 content accuracy (shared GOAL_TEXT, 7 map pills, only own imagery); layer 3 full render. The build is not done when an .mp4 exists.",
      path: "CAPTION_SCRIPT.md", repo: "ep01" },
    { id: "dive", x: 500, y: 120, w: 220, h: 52, label: "LOOPS_DEEP_DIVE.md", sub: "field guide · the 2×2", fill: "#161618",
      kicker: "Field guide",
      body: "What a loop is, the four components (continuation, verification, goal anatomy, locus), and how Claude Code, Codex, Antigravity, and Cursor each implement them as of early 2026. Read this first.",
      path: "LOOPS_DEEP_DIVE.md", repo: "ep01" },
    { id: "narr", x: 740, y: 120, w: 220, h: 52, label: "NARRATION.md", sub: "teleprompter.html", fill: "#161618",
      kicker: "Voice",
      body: "Voiceover script plus a synced teleprompter for recording on time. LinkedIn autoplays muted — the film is designed to read with sound off; narration is backup.",
      path: "NARRATION.md  ·  teleprompter.html", repo: "ep01" },
    { id: "shots", x: 140, y: 230, w: 280, h: 52, label: "Screenshots/", sub: "own captures only", fill: "#161618",
      kicker: "Guardrail",
      body: "claude-goal, codex-goal, antigravity-goal, claude-routines. Only the author’s screenshots and headshot appear as real imagery. Conceptual graphics are original, inspired by OpenAI’s Goals cookbook, never copied.",
      path: "Screenshots/", repo: "ep01" },
    { id: "out", x: 480, y: 230, w: 280, h: 52, label: "out/", sub: "loops-vertical.mp4 · map-2x2.png", fill: "#161618",
      kicker: "Result",
      body: "The rendered film and the two-axis map. The Remotion implementation that produced them is kept private — this repo is the spec, the verification approach, and the result.",
      path: "out/loops-vertical.mp4", repo: "ep01" },
    { id: "l0", x: 40, y: 340, w: 220, h: 70, label: "0 · Build & static", sub: "compiles · assets resolve", fill: "#161618",
      kicker: "Layer 0", body: "Both compositions register. Every asset resolves. Compiles clean. If this fails, nothing else runs.", path: "CAPTION_SCRIPT.md", repo: "ep01" },
    { id: "l1", x: 280, y: 340, w: 220, h: 70, label: "1 · Frame stills", sub: "caption actually on screen", fill: "#161618",
      kicker: "Layer 1", body: "Render a still per scene. Confirm the locked caption is on screen, legible, not clipped. Evidence, not vibes.", path: "CAPTION_SCRIPT.md", repo: "ep01" },
    { id: "l2", x: 520, y: 340, w: 220, h: 70, label: "2 · Content", sub: "GOAL_TEXT identical ×3", fill: "#161618",
      kicker: "Layer 2", body: "One shared GOAL_TEXT typed identically in all three tools. Every locked string verbatim. Seven map pills correct. Only own imagery.", path: "CAPTION_SCRIPT.md", repo: "ep01" },
    { id: "l3", x: 760, y: 340, w: 200, h: 70, label: "3 · Full render", sub: "~58s, audio synced", fill: "#2a2114",
      kicker: "Layer 3", body: "Both .mp4s render error-free, ~58 seconds, audio synced. Only then is the loop allowed to stop.", path: "out/loops-vertical.mp4", repo: "ep01" },
  ],
  ep02: [
    { id: "cust", x: 40, y: 24, w: 180, h: 48, label: "CustomerView", sub: "#/customer", fill: "#13261f",
      kicker: "Surface", body: "Sarah Chen (straight-through) or James Rodriguez (HITL). Generative cards land here: identity, risk gauge, allocation donut, document requests.", path: "frontend/src/views/CustomerView.jsx", repo: "ep02" },
    { id: "adv", x: 240, y: 24, w: 180, h: 48, label: "AdvisorView", sub: "#/advisor · desk", fill: "#13261f",
      kicker: "Surface", body: "The approval queue. Completing a card completes the Camunda user task — the paused token moves.", path: "frontend/src/views/AdvisorView.jsx", repo: "ep02" },
    { id: "ops", x: 440, y: 24, w: 180, h: 48, label: "OperatorView", sub: "raw AG-UI log", fill: "#13261f",
      kicker: "Surface", body: "Open #/operator/{pid} next to a customer session and watch the raw wire produce the UI. The film’s honesty device.", path: "frontend/src/views/OperatorView.jsx", repo: "ep02" },
    { id: "cards", x: 640, y: 24, w: 180, h: 48, label: "Cards.jsx", sub: "generative UI", fill: "#13261f",
      kicker: "UI", body: "PortfolioAllocationChart, ProjectedGrowthChart, IdentityResultCard, RiskGauge, AccountOpenedCard, UserTaskCard… each is a GENERATIVE_UI component name + props.", path: "frontend/src/components/Cards.jsx", repo: "ep02" },
    { id: "agui2", x: 280, y: 100, w: 300, h: 48, label: "agui-client.js · useAGUI", sub: "~150 lines, no framework", fill: "#2a2114",
      kicker: "Client", body: "EventSource in, reducer out. events / cards / pendingTasks / steps. The learning-path item #1 in the README: this is how little a client needs.", path: "frontend/src/agui-client.js", repo: "ep02" },
    { id: "sse2", x: 280, y: 176, w: 300, h: 48, label: "sseHub.js", sub: "pub/sub keyed by pid", fill: "#2a2114",
      kicker: "Bus", body: "In-process fan-out. Workers, pollers, and REST handlers call emit(pid, event). Late subscribers get history replay (max 500). A global channel feeds the advisor dashboard.", path: "backend/src/sseHub.js", repo: "ep02" },
    { id: "intake", x: 40, y: 256, w: 160, h: 48, label: "intakeAgent", sub: "docs by profile", fill: "#161618",
      kicker: "Worker", body: "Resolves document requirements per customer, emits DocumentRequestCards. Dual intake: form or chat.", path: "backend/src/workers/intakeAgent.js", repo: "ep02" },
    { id: "ident", x: 220, y: 256, w: 160, h: 48, label: "identityAgent", sub: "KYC · PEP", fill: "#161618",
      kicker: "Worker", body: "Doc validation, sanctions, PEP. Emits IdentityResultCard.", path: "backend/src/workers/identityAgent.js", repo: "ep02" },
    { id: "risk", x: 400, y: 256, w: 160, h: 48, label: "riskAgent", sub: "score · tier", fill: "#161618",
      kicker: "Worker", body: "riskScore, aumTier, investorClass. Emits the gauge the customer actually wants instead of a sentence.", path: "backend/src/workers/riskAgent.js", repo: "ep02" },
    { id: "kb", x: 580, y: 256, w: 180, h: 48, label: "kbQueryWorker", sub: "grounded answers", fill: "#161618",
      kicker: "Grounding", body: "RAG: retrieve, then synthesise a cited answer. Emits KbAnswerCard. Guardrail lives here.", path: "backend/src/workers/kbQueryWorker.js", repo: "ep02" },
    { id: "chat", x: 780, y: 256, w: 180, h: 48, label: "chatTools.js", sub: "~14 tools", fill: "#161618",
      kicker: "Tools", body: "lookupApplicationStatus, readDocument, estimateTimeline… the deterministic jobs the AI Agent Connector may pick from the ad-hoc sub-process.", path: "backend/src/workers/chatTools.js", repo: "ep02" },
    { id: "onb", x: 40, y: 344, w: 280, h: 56, label: "wealth-onboarding.bpmn", sub: "intake → KYC → risk → DMN → HITL", fill: "#161618",
      kicker: "Process", body: "The orchestrator. After risk, wealth-routing.dmn branches STP / ADVISOR_REVIEW / COMPLIANCE_ESCALATION. The AI did not decide to wait — the process did.", path: "bpmn/wealth-onboarding.bpmn", repo: "ep02" },
    { id: "conv", x: 340, y: 344, w: 300, h: 56, label: "customer-conversation.bpmn", sub: "AI Agent Connector · ad-hoc tools", fill: "#161618",
      kicker: "Process", body: "THE pattern. A long-lived conversation process. The connector hosts the LLM-with-tools loop inside Camunda, not in Node. Memory persists because agent.context flows turn-to-turn.", path: "bpmn/customer-conversation.bpmn", repo: "ep02" },
    { id: "dmn2", x: 660, y: 344, w: 300, h: 56, label: "wealth-routing.dmn", sub: "who sees a human", fill: "#2a2114",
      kicker: "Policy", body: "Decision table. Private-wealth tiers go to a user task with a Camunda Form. Paused token, visible in Operate, completed from the advisor card.", path: "bpmn/wealth-routing.dmn", repo: "ep02" },
    { id: "seed", x: 40, y: 428, w: 280, h: 48, label: "client-kb-seed / query", sub: "vector store as a step", fill: "#161618",
      kicker: "Grounding", body: "Embeddings Vector DB connector. Seed chunks the corpus; query retrieves. VECTORDB_LOCAL_SETUP.md if you want it local.", path: "bpmn/client-kb-seed.bpmn", repo: "ep02" },
    { id: "arch", x: 340, y: 428, w: 280, h: 48, label: "architecture.html", sub: "the poster, in-repo", fill: "#161618",
      kicker: "Docs", body: "The whole shape on one page — expandable marchitecture. presentation.html for a guided walkthrough. LEARNING_GUIDE.md if you want the prose.", path: "architecture.html", repo: "ep02" },
    { id: "shadow", x: 640, y: 428, w: 320, h: 48, label: "shadow mode", sub: "zero API keys, full stream", fill: "#13261f",
      kicker: "Run", body: "Without ANTHROPIC_API_KEY the workers replay a scripted scenario. AG-UI stream, HITL pause, and Operate choreography all work before you spend a cent.", path: "backend/src/seed/scenarios.js", repo: "ep02" },
  ],
  ep03: [
    { id: "shop", x: 40, y: 24, w: 200, h: 52, label: "Shopping agent", sub: "Claude + tools", fill: "#161618",
      kicker: "Party 1", body: "search_inventory, create_mandate. Holds the open mandate, watches TicketVault for a price drop, signs the closed mandate at purchase time.", path: "backend/src/shoppingAgent.js", repo: "ep03" },
    { id: "merch", x: 280, y: 24, w: 200, h: 52, label: "Merchant", sub: "TicketVault :5177", fill: "#161618",
      kicker: "Party 2", body: "Fake merchant site. Independently verifies the mandate chain (user sig, agent sig, constraints) before accepting checkout. The tamper test lands here.", path: "merchant-site/src/", repo: "ep03" },
    { id: "cred", x: 520, y: 24, w: 200, h: 52, label: "Credentials", sub: "issueToken stub", fill: "#161618",
      kicker: "Party 3", body: "credentials.issueToken — stubbed. MAKE_IT_REAL.md maps this onto a real credentials provider.", path: "backend/src/workers/index.js", repo: "ep03" },
    { id: "proc", x: 760, y: 24, w: 200, h: 52, label: "Processor", sub: "checkout rail", fill: "#161618",
      kicker: "Party 4", body: "merchant.completeCheckout drives TicketVault through AP2 checkout steps 1–6 over SSE (MERCHANT_SITE_STEP).", path: "backend/src/workers/index.js", repo: "ep03" },
    { id: "openm", x: 80, y: 120, w: 240, h: 56, label: "Open mandate", sub: "user signs the rules", fill: "#2a2114",
      kicker: "AP2", body: "createOpenCheckoutMandate. Constraints: 2 tickets, target $3,500, cap $7,000. ES256 JWS via jose. The user signed this; the agent cannot rewrite it.", path: "backend/src/mandateService.js", repo: "ep03" },
    { id: "closed", x: 380, y: 120, w: 240, h: 56, label: "Closed mandate", sub: "agent signs the cart", fill: "#2a2114",
      kicker: "AP2", body: "closeMandate binds a sha256 checkout hash of the actual cart. This is the v0.2 open→closed lifecycle.", path: "backend/src/mandateService.js", repo: "ep03" },
    { id: "verify", x: 680, y: 120, w: 260, h: 56, label: "Merchant verify ×3", sub: "user · agent · constraints", fill: "#2a2114",
      kicker: "AP2", body: "merchantVerifyMandate. Change one number inside the signed token (tamperSignedMandate) and this check fails — even if the agent proceeds and the DMN passes. That is the difference between a protocol and a database record.", path: "backend/src/mandateService.js", repo: "ep03" },
    { id: "cust3", x: 40, y: 216, w: 200, h: 48, label: "CustomerView", sub: "mandate + cart cards", fill: "#13261f",
      kicker: "Surface", body: "Watching, waiting, then the four endings: receipt, cryptographic refusal, HITL wait, or MandateBreachCard.", path: "frontend/src/views/CustomerView.jsx", repo: "ep03" },
    { id: "desk3", x: 260, y: 216, w: 200, h: 48, label: "PaymentDeskView", sub: "HITL at 98% of cap", fill: "#13261f",
      kicker: "Surface", body: "When the DMN requires a human, the token sits here. Approve and the merchant still verifies the chain.", path: "frontend/src/views/PaymentDeskView.jsx", repo: "ep03" },
    { id: "ops3", x: 480, y: 216, w: 200, h: 48, label: "OperatorView", sub: "PARTY_HOP strip", fill: "#13261f",
      kicker: "Surface", body: "Four-party AP2 chain lights up hop by hop: shopping_agent → merchant → credentials → processor.", path: "frontend/src/views/OperatorView.jsx", repo: "ep03" },
    { id: "sse3", x: 700, y: 216, w: 260, h: 48, label: "sseHub.js (replay)", sub: "same bus as EP 02", fill: "#13261f",
      kicker: "Shared DNA", body: "Copied forward. History replay so a late OperatorView still sees the mandate cards. Also fans out to the merchant-site channel.", path: "backend/src/sseHub.js", repo: "ep03" },
    { id: "bpmn3", x: 40, y: 300, w: 280, h: 52, label: "consumer-payment.bpmn", sub: "monitor → close → policy → verify", fill: "#161618",
      kicker: "Process", body: "Service tasks: setup, start monitoring, close mandate, emit policy UI, merchant verify, issue credentials, complete checkout. Plus the breach path.", path: "bpmn/consumer-payment.bpmn", repo: "ep03" },
    { id: "stand", x: 340, y: 300, w: 280, h: 52, label: "standing-purchase.bpmn", sub: "epilogue path", fill: "#161618",
      kicker: "Process", body: "The $7,600 standing purchase that exceeds the $7,000 cap. Auto-decline, MandateBreachCard.", path: "bpmn/standing-purchase.bpmn", repo: "ep03" },
    { id: "dmn3", x: 640, y: 300, w: 320, h: 52, label: "spending-policy.dmn", sub: "5 rules, first-hit", fill: "#2a2114",
      kicker: "Policy", body: "Native Camunda DMN. Result linked to the process instance, visible in Operate. Approves the golden path, escalates HITL near the cap, declines a breach. Does not catch a tampered token — that’s the merchant’s job.", path: "dmn/spending-policy.dmn", repo: "ep03" },
    { id: "g", x: 40, y: 384, w: 220, h: 48, label: "Golden", sub: "$6,300 auto", fill: "#13261f",
      kicker: "Path", body: "Price drops to $3,150. Agent signs closed mandate. DMN approves. Merchant verifies 3 ✓. Autonomous checkout.", path: "CLICKPATH.md", repo: "ep03" },
    { id: "t", x: 280, y: 384, w: 220, h: 48, label: "Tamper", sub: "crypto refuses", fill: "#2a140f",
      kicker: "Path", body: "Cap altered inside the signed token. Agent proceeds. DMN passes. Merchant ES256 check fails. No credentials issued. The point of the episode.", path: "backend/src/mandateService.js", repo: "ep03" },
    { id: "h", x: 520, y: 384, w: 220, h: 48, label: "HITL", sub: "98% of cap", fill: "#161618",
      kicker: "Path", body: "Price $3,430, cart $6,860. DMN requires human sign-off at the Payment Desk, then verified checkout.", path: "frontend/src/views/PaymentDeskView.jsx", repo: "ep03" },
    { id: "e", x: 760, y: 384, w: 200, h: 48, label: "Epilogue", sub: "breach $7,600", fill: "#161618",
      kicker: "Path", body: "Standing purchase exceeds the cap. Auto-decline. MandateBreachCard. The mandate still holds after the happy path.", path: "bpmn/standing-purchase.bpmn", repo: "ep03" },
  ],
  shared: [
    { id: "s-sse", x: 80, y: 40, w: 400, h: 70, label: "sseHub.js", sub: "EP 02 → EP 03  ·  emit + history replay", fill: "#2a2114",
      kicker: "Copied forward", body: "The AG-UI bus. Keyed channels, 500-event replay, global fan-out. EP 03 adds a merchant-site channel so TicketVault can be driven as a fourth surface. If you only read one file in both repos, read this one.", path: "backend/src/sseHub.js", repo: "ep02" },
    { id: "s-agui", x: 520, y: 40, w: 400, h: 70, label: "agui-client.js", sub: "EventSource → reducer → views", fill: "#2a2114",
      kicker: "Copied forward", body: "No agent-UI framework. ~150 lines. Views are functions of the stream. EP 03 extends the reducer with mandate cards and PARTY_HOP.", path: "frontend/src/agui-client.js", repo: "ep02" },
    { id: "s-work", x: 80, y: 140, w: 400, h: 70, label: "workers/index.js", sub: "Zeebe jobs that emit UI", fill: "#161618",
      kicker: "Pattern", body: "Every service task is a worker that does a deterministic thing, then emit()s an AG-UI event. The LLM does not paint the DOM. The process does not paint the DOM. The worker translates a job into a card.", path: "backend/src/workers/index.js", repo: "ep02" },
    { id: "s-poll", x: 520, y: 140, w: 400, h: 70, label: "taskPoller + Tasklist", sub: "HITL as a user task", fill: "#161618",
      kicker: "Pattern", body: "User tasks are Camunda’s, not a homemade modal. The poller surfaces them as USER_TASK_PENDING; completing the card completes the job. EP 02 advisor desk and EP 03 payment desk are the same shape.", path: "backend/src/taskPoller.js", repo: "ep02" },
    { id: "s-bpmn", x: 80, y: 240, w: 400, h: 70, label: "BPMN owns the loop", sub: "connector inside the process", fill: "#161618",
      kicker: "Pattern", body: "EP 01 said the loop you can audit is the only one that ships. EP 02 put that loop inside Camunda (AI Agent Connector). EP 03 put payment inside the same engine so Operate shows every hop.", path: "bpmn/", repo: "ep02" },
    { id: "s-dmn", x: 520, y: 240, w: 400, h: 70, label: "DMN owns the fork", sub: "humans when the table says so", fill: "#161618",
      kicker: "Pattern", body: "Routing (wealth) and spending policy are tables, not if-statements in the agent. First-hit, linked to the process instance, visible in Operate. The agent does not get a vote on whether a human is required.", path: "dmn/  ·  bpmn/*.dmn", repo: "ep03" },
    { id: "s-ops", x: 80, y: 340, w: 400, h: 70, label: "OperatorView", sub: "the audit surface in the film", fill: "#13261f",
      kicker: "Pattern", body: "Always a raw-wire view next to the pretty one. If the card appeared, the event existed. That is the series’ honesty contract.", path: "frontend/src/views/OperatorView.jsx", repo: "ep02" },
    { id: "s-shadow", x: 520, y: 340, w: 400, h: 70, label: "Runnable without the pitch", sub: "shadow mode · MIT · public", fill: "#13261f",
      kicker: "Contract", body: "EP 02 runs with zero API keys. EP 03 is fully runnable with a free Camunda cluster. Specs and field guides live beside the code. The films are the trailer; the repos are the product.", path: "README.md", repo: "ep02" },
  ],
};

const EDGES = {
  stack: [
    ["humans", "agui"], ["agui", "loop"], ["loop", "bff"], ["loop", "camunda"],
    ["bff", "ground"], ["camunda", "auth"], ["ground", "policy"], ["auth", "policy"],
  ],
  ep01: [
    ["goal", "spec"], ["goal", "captions"], ["goal", "dive"], ["goal", "narr"],
    ["spec", "shots"], ["captions", "out"],
    ["captions", "l0"], ["l0", "l1"], ["l1", "l2"], ["l2", "l3"],
  ],
  ep02: [
    ["cust", "agui2"], ["adv", "agui2"], ["ops", "agui2"], ["cards", "agui2"],
    ["agui2", "sse2"],
    ["sse2", "intake"], ["sse2", "ident"], ["sse2", "risk"], ["sse2", "kb"], ["sse2", "chat"],
    ["intake", "onb"], ["ident", "onb"], ["risk", "onb"], ["onb", "dmn2"],
    ["chat", "conv"], ["kb", "seed"],
  ],
  ep03: [
    ["shop", "openm"], ["openm", "closed"], ["closed", "verify"], ["verify", "merch"],
    ["shop", "cust3"], ["merch", "ops3"], ["cred", "proc"],
    ["cust3", "sse3"], ["desk3", "sse3"], ["ops3", "sse3"],
    ["sse3", "bpmn3"], ["bpmn3", "dmn3"], ["stand", "e"],
    ["dmn3", "g"], ["dmn3", "t"], ["dmn3", "h"],
  ],
  shared: [
    ["s-sse", "s-agui"], ["s-sse", "s-work"], ["s-agui", "s-ops"],
    ["s-work", "s-bpmn"], ["s-poll", "s-dmn"], ["s-bpmn", "s-ops"],
  ],
};

function el(tag, attrs, children) {
  const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs || {}).forEach(([k, v]) => n.setAttribute(k, v));
  (children || []).forEach((c) => n.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return n;
}

function center(node) {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
}

function renderView(viewId, selectedId) {
  const stage = document.getElementById("cmap-stage");
  const nodes = NODES[viewId];
  const edges = EDGES[viewId] || [];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const svg = el("svg", {
    viewBox: "0 0 1000 520",
    role: "img",
    "aria-label": VIEWS[viewId].title,
  });

  const defs = el("defs", {}, [
    el("marker", { id: "arrow", viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" }, [
      el("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "currentColor" }),
    ]),
  ]);
  svg.appendChild(defs);

  edges.forEach(([a, b]) => {
    const na = byId[a], nb = byId[b];
    if (!na || !nb) return;
    const ca = center(na), cb = center(nb);
    const hi = selectedId && (selectedId === a || selectedId === b);
    svg.appendChild(el("path", {
      class: hi ? "edge hi" : "edge",
      d: `M ${ca.x} ${ca.y} C ${ca.x} ${(ca.y + cb.y) / 2}, ${cb.x} ${(ca.y + cb.y) / 2}, ${cb.x} ${cb.y}`,
      "marker-end": "url(#arrow)",
    }));
  });

  nodes.forEach((node) => {
    const g = el("g", {
      class: "cmap-node" + (selectedId === node.id ? " is-active" : ""),
      tabindex: "0",
      role: "button",
      "data-id": node.id,
      "aria-label": node.label,
    });
    const kind =
      node.fill === "#13261f" ? "is-surface" :
      (node.fill === "#2a2114" || node.fill === "#2a140f" || node.fill === "#1f1c14") ? "is-check" :
      "is-base";
    g.classList.add(kind);
    g.appendChild(el("rect", {
      x: node.x, y: node.y, width: node.w, height: node.h, rx: "10",
      "stroke-width": selectedId === node.id ? "2" : "1",
    }));
    g.appendChild(el("text", {
      class: "n-label",
      x: node.x + 16, y: node.y + (node.sub ? node.h / 2 - 4 : node.h / 2 + 5),
      "font-size": "13", "font-weight": "600",
      "font-family": '"Inter Variable", system-ui, sans-serif',
    }, [node.label]));
    if (node.sub) {
      g.appendChild(el("text", {
        class: "n-sub",
        x: node.x + 16, y: node.y + node.h / 2 + 14,
        "font-size": "11",
        "font-family": '"JetBrains Mono Variable", ui-monospace, monospace',
      }, [node.sub]));
    }
    g.addEventListener("click", (e) => {
      e.stopPropagation();
      selectNode(viewId, node.id);
    });
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectNode(viewId, node.id);
      }
    });
    svg.appendChild(g);
  });

  stage.replaceChildren(svg);
}

function inspect(node) {
  const box = document.getElementById("inspector");
  if (!node) {
    box.innerHTML = `
      <div class="kicker">Inspector</div>
      <h3>Click a node</h3>
      <p>Every box is a real file, protocol, or demo path from the public repos. Edges are runtime or verification flow, not folder nesting.</p>
      <p>Keyboard: Tab through nodes, Enter to inspect.</p>`;
    return;
  }
  const repoUrl = REPOS[node.repo];
  const fileUrl = node.path && repoUrl
    ? `${repoUrl}/blob/main/${node.path.split(" ")[0].replace(/\/$/, "")}`
    : repoUrl;
  box.innerHTML = `
    <div class="kicker">${node.kicker || "Node"}</div>
    <h3>${node.label}</h3>
    <p>${node.body}</p>
    ${node.path ? `<div class="path">${node.path}</div>` : ""}
    <div class="links">
      ${fileUrl ? `<a class="btn" href="${fileUrl}">Open on GitHub</a>` : ""}
      ${node.repo ? `<span class="node-chip">${node.repo}</span>` : ""}
    </div>`;
}

let currentView = "stack";
let currentNode = null;

function selectNode(viewId, nodeId) {
  currentNode = NODES[viewId].find((n) => n.id === nodeId) || null;
  renderView(viewId, nodeId);
  inspect(currentNode);
}

function setView(viewId, nodeId) {
  if (!VIEWS[viewId]) viewId = "stack";
  currentView = viewId;
  document.querySelectorAll(".view-tabs button").forEach((b) => {
    b.setAttribute("aria-selected", String(b.dataset.view === viewId));
  });
  const meta = VIEWS[viewId];
  document.getElementById("cmap-title").textContent = meta.title;
  document.getElementById("cmap-sub").textContent = meta.subtitle;
  const first = nodeId || null;
  currentNode = first ? NODES[viewId].find((n) => n.id === first) : null;
  renderView(viewId, first);
  inspect(currentNode);
  history.replaceState(null, "", "#" + viewId);
}

function init() {
  document.querySelectorAll(".view-tabs button").forEach((b) => {
    b.addEventListener("click", () => setView(b.dataset.view));
  });
  document.getElementById("cmap-stage").addEventListener("click", () => {
    currentNode = null;
    renderView(currentView, null);
    inspect(null);
  });
  const hash = (location.hash || "#stack").slice(1).toLowerCase();
  setView(["stack", "ep01", "ep02", "ep03", "shared"].includes(hash) ? hash : "stack");
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("hashchange", () => {
  const hash = (location.hash || "#stack").slice(1).toLowerCase();
  if (hash !== currentView && VIEWS[hash]) setView(hash);
});
