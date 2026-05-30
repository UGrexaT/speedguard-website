import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 8080);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function safePath(url) {
  const parsed = new URL(url, "http://localhost");
  const pathname = parsed.pathname === "/" ? "index.html" : parsed.pathname.replace(/^\/+/, "");
  const resolved = normalize(join(root, decodeURIComponent(pathname)));
  return resolved === root || resolved.startsWith(root + sep) ? resolved : null;
}

createServer(async (request, response) => {
  const filePath = safePath(request.url || "/");
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "content-type": types[extname(filePath)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(body);
  } catch {
    try {
      const body = await readFile(join(root, "404.html"));
      response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  }
}).listen(port, () => {
  console.log(`Vehicle Speeding Guard preview: http://localhost:${port}/`);
});
