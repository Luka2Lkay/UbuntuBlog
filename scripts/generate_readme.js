import { execSync } from "child_process";
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

const readJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const formatDependencies = (dependencies = {}) => {
  return Object.keys(dependencies)
    .sort()
    .map((dependency) => `- ${dependency}`)
    .join("\n");
};

const frontend = readJson(frontdendPackageJson);
const backend = readJson(backendPackageJson);

const generateTree = () => {
  try {
    return execSync("tree -I 'node_modules|dist|build|.git' -L 2", {
      cwd: ROOT_DIR,
      encoding: "utf-8",
    }).trim();
  } catch (error) {
    return `UbuntuBlog/
├── frontend/
├── backend/
├── scripts/
└── .github/`;
  }
};

const version = frontend.version || backend.version || "0.0.0";

let readme = fs.readFileSync(templatePath, "utf-8");

readme = readme.replaceAll("{{VERSION}}", version);

fs.writeFileSync(readmePath, readme);

console.log("README.md generated successfully!");
