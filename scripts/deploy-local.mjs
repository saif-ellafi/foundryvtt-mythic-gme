import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const moduleId = "mythic-gme-tools";
const distDir = join(repoRoot, "dist");

function loadEnvFile() {
  const envPath = join(repoRoot, ".env");
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function defaultModulesPath() {
  if (process.platform === "win32") {
    const localAppData = process.env.LOCALAPPDATA;
    if (localAppData) return join(localAppData, "FoundryVTT", "Data", "modules");
  }
  return join(process.env.HOME ?? "", ".local", "share", "FoundryVTT", "Data", "modules");
}

loadEnvFile();

const modulesRoot = process.env.FOUNDRY_MODULES_PATH ?? defaultModulesPath();
const targetDir = join(modulesRoot, moduleId);

if (!existsSync(distDir)) {
  console.error("dist/ not found. Run `npm run buildWin` first.");
  process.exit(1);
}

mkdirSync(modulesRoot, { recursive: true });
if (existsSync(targetDir)) rmSync(targetDir, { recursive: true, force: true });
cpSync(distDir, targetDir, { recursive: true });

console.log(`Deployed ${moduleId} -> ${targetDir}`);
