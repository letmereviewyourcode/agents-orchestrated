/**
 * Copy the hub under docs/agents-orchestrated/ so a reverse-proxy
 * that forwards the original path still finds files.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const docs = join(dirname(fileURLToPath(import.meta.url)), "..", "docs");
const dest = join(docs, "agents-orchestrated");

if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

for (const name of ["index.html", "codemap.html", "assets"]) {
  cpSync(join(docs, name), join(dest, name), { recursive: true });
}

console.log("staged", dest);
