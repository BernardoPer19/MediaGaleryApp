import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf-8");

      content = content.replace(
        /import\s+([\s\S]+?)\s+from\s+['"](\.[^'"]+)(?!\.js|\/)['"]/g,
        (match, p1, p2) => {
          return `import ${p1} from '${p2}.js'`;
        }
      );

      fs.writeFileSync(fullPath, content, "utf-8");
      console.log(`Fixed imports in ${fullPath}`);
    }
  }
}

walk(distDir);
