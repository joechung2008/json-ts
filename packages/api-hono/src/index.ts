import { serve } from "@hono/node-server";
import { parse } from "@json-ts/parser";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json("Hello Hono!");
});

app.post("/api/v1/parse", async (c) => {
  try {
    const text = await c.req.text();
    const result = parse(text);
    return c.json(result);
  } catch (error) {
    return c.json(
      {
        code: 400,
        message: error instanceof Error ? error.message : String(error),
      },
      400
    );
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
