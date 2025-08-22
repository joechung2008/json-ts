import { parse } from "@json-ts/parser";
import Router from "@koa/router";
import Koa from "koa";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

router.post(
  "/api/v1/parse",
  bodyParser({ enableTypes: ["text"] }),
  async (ctx) => {
    if (ctx.is("text/plain") && typeof ctx.request.body === "string") {
      try {
        ctx.body = parse(ctx.request.body);
      } catch (error) {
        ctx.status = 400;
        ctx.body = {
          code: 400,
          message: error instanceof Error ? error.message : String(error),
        };
      }
    } else {
      ctx.status = 415;
      ctx.body = {
        code: 415,
        message: "Unsupported Media Type. Expected text/plain.",
      };
    }
  }
);

app.use(router.routes()).use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
