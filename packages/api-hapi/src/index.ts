import { parse } from "@json-ts/parser";
import Hapi from "@hapi/hapi";

const server = Hapi.server({
  port: Number(process.env.PORT) || 3000,
  host: "localhost",
});

server.route({
  method: "POST",
  path: "/api/v1/parse",
  handler: (request, h) => {
    try {
      const result = parse(request.payload as string);
      return h.response(result).code(200);
    } catch (error) {
      return h
        .response({
          code: 400,
          message: error instanceof Error ? error.message : String(error),
        })
        .code(400);
    }
  },
});

const start = async () => {
  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

start();
