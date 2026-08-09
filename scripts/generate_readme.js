import { execSync } from "child_process";
import console from "console";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const frontdendPackageJson = path.join(ROOT_DIR, "frontend", "package.json");
const backendPackageJson = path.join(ROOT_DIR, "backend", "package.json");

const templatePath = path.join(ROOT_DIR, "README.template.md");
const readmePath = path.join(ROOT_DIR, "README.md");
const technologiesPath = path.join(
  ROOT_DIR,
  "scripts",
  "data",
  "technologies.json",
);

const readJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const getInstalledPackages = (packageJson) => {
  return new Set([
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
  ]);
};

const generateTechnologyList = (installedPackages, technologyMap) => {
  return Object.entries(technologyMap)
    .filter(([packageName]) => installedPackages.has(packageName))
    .map(([, technologyName]) => `- ${technologyName}`)
    .join("\n");
};
const frontend = readJson(frontdendPackageJson);
const backend = readJson(backendPackageJson);
const technologies = readJson(technologiesPath);

const frontendPackages = getInstalledPackages(frontend);
const backendPackages = getInstalledPackages(backend);

const frontendStack = generateTechnologyList(
  frontendPackages,
  technologies.frontend,
);

const backendStack = generateTechnologyList(
  backendPackages,
  technologies.backend,
);

const generateTree = (directory, prefix = "") => {
  const ignored = new Set(["node_modules", "dist", "build", ".git", ".github"]);

  const entries = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => !ignored.has(entry.name))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) {
        return -1;
      }

      if (a.isDirectory() && b.isDirectory()) {
        return 1;
      }

      return a.name.localeCompare(b.name);
    });

  return entries
    .map((entry, index) => {
      const isLast = index === entries.length - 1;
      const connector = isLast ? "└──" : "├──";
      const nextPrefix = prefix + (isLast ? "   " : "|   ");

      if (entry.isDirectory()) {
        return (
          `${prefix}${connector}${entry.name}/\n` +
          generateTree(path.join(directory, entry.name), nextPrefix)
        );
      }

      return `${prefix}${connector}${entry.name}\n`;
    })
    .join("");
};

const version = frontend.version || backend.version || "0.0.0";

const frontendDependencies = {
  ...frontend.dependencies,
  ...frontend.devDependencies,
};
const backendDependencies = {
  ...backend.dependencies,
  ...backend.devDependencies,
};

const tree = generateTree(ROOT_DIR);

let readme = fs.readFileSync(templatePath, "utf-8");

readme = readme
  .replaceAll("{{VERSION}}", version)
  .replaceAll("{{FRONTEND_STACK}}", frontendStack)
  .replaceAll("{{BACKEND_STACK}}", backendStack)
  .replaceAll("{{TREE}}", tree);

fs.writeFileSync(readmePath, readme);

console.log("README.md generated successfully!");
