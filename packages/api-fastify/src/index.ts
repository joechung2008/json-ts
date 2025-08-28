import { parse } from "@json-ts/parser";
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.post("/api/v1/parse", async (request, reply) => {
  if (request.headers["content-type"] !== "text/plain") {
    reply.code(415).send({
      code: 415,
      message: "Unsupported Media Type. Expected text/plain.",
    });
    return;
  }

  try {
    const result = parse(request.body as string);
    reply.send(result);
  } catch (error) {
    reply.code(400).send({
      code: 400,
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

const port = 3000;

fastify.listen({ port, host: "0.0.0.0" }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
