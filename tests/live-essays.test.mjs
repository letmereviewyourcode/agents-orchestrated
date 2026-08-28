import assert from "node:assert/strict";
import { test } from "node:test";

const ESSAYS = [
  {
    url: "https://zishanalikhan.com/series/agents-orchestrated/",
    must: [
      "Agents, Orchestrated",
      "Loops: the agentic primitive everything converged on",
      "AG-UI: the agent that streams an interface, not a transcript",
      "Agent payments: mandates, not trust",
      "Multi-LLM Polyglot",
    ],
    mustNot: ["This page doesn't exist"],
  },
  {
    url: "https://zishanalikhan.com/series/agents-orchestrated/loops/",
    must: ["All roads led to /goal", "the loop you can audit"],
  },
  {
    url: "https://zishanalikhan.com/series/agents-orchestrated/ag-ui/",
    must: ["AURUM", "One process. Three models. Zero glue code."],
  },
  {
    url: "https://zishanalikhan.com/series/agents-orchestrated/agent-payments/",
    must: ["mandates, not trust", "AP2"],
  },
];

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  const body = await res.text();
  return { status: res.status, body };
}

test("essay index and episode pages still ship", async () => {
  for (const page of ESSAYS) {
    const { status, body } = await get(page.url);
    assert.equal(status, 200, `${page.url} returned ${status}`);
    for (const s of page.must || []) {
      assert.ok(body.includes(s), `${page.url} missing: ${s}`);
    }
    for (const s of page.mustNot || []) {
      assert.ok(!body.includes(s), `${page.url} unexpectedly contains: ${s}`);
    }
  }
});

test("the reserved hub path is not an essay page", async () => {
  const { status, body } = await get("https://zishanalikhan.com/agents-orchestrated/");
  // Before the rewrite lands this is a 404. After deploy it is the hub.
  // Either way it must never serve the essay index HTML.
  assert.ok(
    !body.includes("One layer of the agentic stack per episode. Built for real, reviewed in public.") ||
      body.includes("visual companion") ||
      status === 404,
    "hub path collided with the essay index"
  );
  if (status === 200) {
    assert.match(body, /visual companion/i);
    assert.match(body, /codemap/i);
  }
});
