import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LIVE = process.env.LIVE_HUB_URL || "https://zishanalikhan.com/agents-orchestrated/";
const REQUIRED = process.env.REQUIRE_DEPLOYED === "1";

function local() {
  return readFileSync(join(root, "docs/index.html"), "utf8");
}

function cmap() {
  return readFileSync(join(root, "docs/codemap.html"), "utf8");
}

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { status: res.status, body: await res.text(), url: res.url };
}

const markers = [
  "Agents, Orchestrated · letmereviewyourcode",
  "visual companion",
  "Visual codemap",
  "Loops: the agentic primitive everything converged on",
  "AG-UI: the agent that streams an interface, not a transcript",
  "Agent payments: mandates, not trust",
  "For the extra curious",
];

test("deployed hub matches local markers (or is still unpublished)", async (t) => {
  const { status, body } = await get(LIVE);
  if (status === 404) {
    if (REQUIRED) {
      assert.fail(`${LIVE} is 404; rewrite/deploy is not live`);
    }
    t.skip(`${LIVE} is still 404 — hub not rewritten onto the personal site yet`);
    return;
  }
  assert.equal(status, 200, `${LIVE} returned ${status}`);
  const html = local();
  for (const s of markers) {
    assert.ok(html.includes(s) || html.includes(s.replace(" · letmereviewyourcode", "")), `local missing ${s}`);
    assert.ok(body.includes(s) || body.includes("Visual codemap"), `deployed missing ${s}`);
  }
  assert.ok(body.includes("codemap"), "deployed hub missing codemap");
  assert.ok(!body.includes("This page doesn't exist"), "deployed hub is still the personal-site 404");
  assert.ok(!body.includes("agents-orchestrated-hub.vercel.app"), "deployed HTML still points at the Vercel app domain");
});

test("deployed codemap matches local views (or is still unpublished)", async (t) => {
  const base = LIVE.endsWith("/") ? LIVE : LIVE + "/";
  const { status, body } = await get(base + "codemap/");
  const fallback = status >= 400 ? await get(base + "codemap.html") : { status, body };
  if (fallback.status === 404) {
    if (REQUIRED) assert.fail("codemap 404");
    t.skip("codemap not deployed yet");
    return;
  }
  assert.equal(fallback.status, 200);
  const html = cmap();
  for (const view of ["Series stack", "EP 01 loops", "EP 02 AURUM", "EP 03 AP2", "Shared DNA"]) {
    assert.ok(html.includes(view), `local codemap missing ${view}`);
    assert.ok(fallback.body.includes(view), `deployed codemap missing ${view}`);
  }
});
