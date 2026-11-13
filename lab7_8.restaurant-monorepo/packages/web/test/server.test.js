import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../server.js";

test("Статичний сервер віддає дозволені файли і блокує заборонені шляхи", async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const homeRes = await fetch(`${baseUrl}/`);
    assert.equal(homeRes.status, 200);

    const coreRes = await fetch(`${baseUrl}/node_modules/@restaurant/core/index.js`);
    assert.equal(coreRes.status, 200);

    const secretRes = await fetch(`${baseUrl}/server.js`);
    assert.equal(secretRes.status, 404);

    const traversalRes = await fetch(`${baseUrl}/node_modules/@restaurant/core/../../package.json`);
    assert.equal(traversalRes.status, 404);
  } finally {
    server.close();
  }
});