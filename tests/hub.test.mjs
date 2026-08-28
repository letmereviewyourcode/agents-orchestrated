import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docs = join(root, "docs");

function read(rel) {
  return readFileSync(join(docs, rel), "utf8");
}

test("hub files exist", () => {
  for (const f of [
    "index.html",
    "codemap.html",
    "assets/site.css",
    "assets/site.js",
    "assets/codemap.js",
    "assets/favicon.svg",
  ]) {
    assert.equal(existsSync(join(docs, f)), true, `missing ${f}`);
  }
});

test("hub is a companion, not the essay index", () => {
  const html = read("index.html");
  assert.match(html, /visual companion/i);
  assert.match(html, /https:\/\/zishanalikhan\.com\/series\/agents-orchestrated\//);
  assert.match(html, /canonical" href="https:\/\/zishanalikhan\.com\/agents-orchestrated\//);
  assert.doesNotMatch(html, /This page doesn't exist/);
});

test("hub title and chrome match the personal site", () => {
  const html = read("index.html");
  const css = read("assets/site.css");
  assert.match(html, /<title>Agents, Orchestrated · letmereviewyourcode<\/title>/);
  assert.match(html, /letmereview/);
  assert.match(html, /yourcode/);
  assert.match(html, /theme-toggle/);
  assert.match(css, /Newsreader/);
});

test("shipped episodes plus queued arc are listed", () => {
  const html = read("index.html");
  for (const s of [
    "Loops: the agentic primitive everything converged on",
    "AG-UI: the agent that streams an interface, not a transcript",
    "Agent payments: mandates, not trust",
    "Multi-LLM Polyglot",
    "Agent-to-Agent",
    "Verification, Deployed",
    "what-are-loops",
    "camunda-agui-wealth-demo",
    "camunda-ap2-payments-demo",
  ]) {
    assert.match(html, new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("assets are relative so a path prefix still works", () => {
  const index = read("index.html");
  const cmap = read("codemap.html");
  assert.match(index, /href="assets\/site\.css"/);
  assert.match(index, /src="assets\/site\.js"/);
  assert.doesNotMatch(index, /href="\/assets\//);
  assert.match(cmap, /href="assets\/site\.css"/);
  assert.match(cmap, /src="assets\/codemap\.js"/);
  assert.match(index, /href="codemap\.html"/);
});

test("codemap has the five views and inspector", () => {
  const html = read("codemap.html");
  const js = read("assets/codemap.js");
  for (const view of ["stack", "ep01", "ep02", "ep03", "shared"]) {
    assert.match(html, new RegExp(`data-view="${view}"`));
    assert.match(js, new RegExp(`${view}:`));
  }
  assert.match(html, /id="cmap-stage"/);
  assert.match(html, /id="inspector"/);
  assert.match(js, /selectNode/);
});

test("this repo does not ship the essay routes", () => {
  assert.equal(existsSync(join(docs, "series")), false);
  const index = read("index.html");
  assert.doesNotMatch(index, /href="\/series\/agents-orchestrated\/"/);
});

test("root vercel.json serves docs and prefixes /agents-orchestrated", () => {
  const cfg = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
  assert.equal(cfg.outputDirectory, "docs");
  assert.equal(cfg.trailingSlash, true);
  const sources = (cfg.rewrites || []).map((r) => r.source);
  assert.ok(sources.includes("/agents-orchestrated"));
  assert.ok(sources.includes("/agents-orchestrated/:path*"));
  assert.ok(!sources.some((s) => s.includes("/series/")), "must not rewrite essay routes");
});
