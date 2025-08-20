import { serve } from "@hono/node-server";
import { parse } from "@json-ts/parser";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

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

if (process.env.VERCEL !== "1") {
  serve(
    {
      fetch: app.fetch,
      port: 3000,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    }
  );
}

export default app;
export const POST = handle(app);
