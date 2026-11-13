import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreEntryUrl = import.meta.resolve("@restaurant/core");
const coreDir = path.dirname(fileURLToPath(coreEntryUrl));

const ALLOWED_STATIC = new Map([
  ["/", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/index.html", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/script.js", { file: "script.js", type: "application/javascript; charset=utf-8" }],
  ["/style.css", { file: "style.css", type: "text/css; charset=utf-8" }],
  ["/localStorageAdapter.js", { file: "localStorageAdapter.js", type: "application/javascript; charset=utf-8" }]
]);

const CORE_PREFIX = "/node_modules/@restaurant/core/";

export function createServer() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

    if (urlPath.includes("..")) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    if (ALLOWED_STATIC.has(urlPath)) {
      const entry = ALLOWED_STATIC.get(urlPath);
      const fullPath = path.join(__dirname, entry.file);
      res.writeHead(200, { "Content-Type": entry.type });
      fs.createReadStream(fullPath).pipe(res);
      return;
    }

    if (urlPath.startsWith(CORE_PREFIX)) {
      const relFile = urlPath.slice(CORE_PREFIX.length);
      const resolved = path.resolve(coreDir, relFile);
      if (!resolved.startsWith(coreDir + path.sep) || !resolved.endsWith(".js") || !fs.existsSync(resolved)) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "application/javascript; charset=utf-8" });
      fs.createReadStream(resolved).pipe(res);
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = 3000;
  createServer().listen(PORT, () => {
    console.log(`Веб-клієнт ресторану запущено: http://localhost:${PORT}`);
  });
}