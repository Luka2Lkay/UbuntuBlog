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
const technologiesPath = path.join(
  ROOT_DIR,
  "scripts",
  "data",
  "technologies.json",
);

const readJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// const formatDependencies = (dependencies = {}) => {
//   return Object.keys(dependencies)
//     .sort()
//     .map((dependency) => `- ${dependency}`)
//     .join("\n");
// };

const getInstalledPackages = (packageJson) => {
  return [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
  ];
};

const generateTechnologyList = (installedPackages, technologyMap) => {
  return Object.entries(technologyMap)
    .filter(([packageName]) => installedPackages.includes(packageName))
    .map(([, technologyName]) => `- ${technologyName}`)
    .join("\n");
};
const frontend = readJson(frontdendPackageJson);
const backend = readJson(backendPackageJson);
const technologies = readJson(technologiesPath);

const frontendPackages = getInstalledPackages(frontend);
const backendPackages = getInstalledPackages(backend);

// console.log("packages", frontendPackages)
// console.log("technologies", technologies.frontend)

const frontendStack = generateTechnologyList(
  frontendPackages,
  technologies.frontend,
);

console.log("stack", frontendStack);
// const backendStack = generateTechnologyList(backend, technologies.backend);

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

const frontendDependencies = {
  ...frontend.dependencies,
  ...frontend.devDependencies,
};
const backendDependencies = {
  ...backend.dependencies,
  ...backend.devDependencies,
};

// const tree = generateTree();

// const frontendStack = formatDependencies(frontendDependencies);
// const backendStack = formatDependencies(backendDependencies);

let readme = fs.readFileSync(templatePath, "utf-8");

readme = readme
  .replaceAll("{{VERSION}}", version)
  .replaceAll("{{FRONTEND_STACK}}", frontendStack);
// .replaceAll("{{BACKEND_STACK}}", backendStack);
// .replaceAll("{{TREE}}", tree);

fs.writeFileSync(readmePath, readme);

console.log("README.md generated successfully!");
