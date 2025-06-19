const fs = require("fs");
const path = require("path");

const dir = path.resolve("src"); // o 'dist' según donde hiciste el cambio

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".ts") || fullPath.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf-8");

      content = content.replace(
        /import\s+(.+?)\s+from\s+['"](.+?)\.js['"]/g,
        (match, p1, p2) => {
          return `import ${p1} from '${p2}'`;
        }
      );

      content = content.replace(
        /export\s+(.+?)\s+from\s+['"](.+?)\.js['"]/g,
        (match, p1, p2) => {
          return `export ${p1} from '${p2}'`;
        }
      );

      fs.writeFileSync(fullPath, content, "utf-8");
      console.log(`Removed .js in imports in ${fullPath}`);
    }
  }
}

walk(dir);
