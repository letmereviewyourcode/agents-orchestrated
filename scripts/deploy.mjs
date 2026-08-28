#!/usr/bin/env node
/**
 * Deploy this hub as its own Vercel project.
 * Never attaches zishanalikhan.com (that would take over the personal site).
 * After deploy, prints the rewrite to add on the personal-site project.
 */
import { spawnSync } from "node:child_process";

const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error("VERCEL_TOKEN is not set");
  process.exit(1);
}

function run(args) {
  const r = spawnSync("npx", ["--yes", "vercel@latest", ...args], {
    encoding: "utf8",
    env: { ...process.env, VERCEL_TOKEN: token },
  });
  process.stdout.write(r.stdout || "");
  process.stderr.write(r.stderr || "");
  if (r.status !== 0) process.exit(r.status ?? 1);
  return (r.stdout || "").trim();
}

const prod = process.argv.includes("--prod");
const args = [
  "deploy",
  "--yes",
  "--token",
  token,
  "--name",
  "agents-orchestrated-hub",
];
if (prod) args.push("--prod");

const url = run(args);
console.log("\nDeployed:", url);
console.log(`
Add this rewrite on the zishanalikhan.com Vercel project (not this one):

{
  "source": "/agents-orchestrated",
  "destination": "${url.replace(/\/$/, "")}/"
}
{
  "source": "/agents-orchestrated/:path*",
  "destination": "${url.replace(/\/$/, "")}/:path*"
}

Do not point the personal-site domain at this project.
Do not rewrite /series/agents-orchestrated.
`);
