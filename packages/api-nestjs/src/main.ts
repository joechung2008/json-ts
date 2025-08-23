import { NestFactory } from "@nestjs/core";
import type { NextFunction, Request, Response } from "express";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(); // No custom pipes needed for text/plain
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers["content-type"] === "text/plain") {
      let data = "";
      req.setEncoding("utf8");
      req.on("data", (chunk: string) => (data += chunk));
      req.on("end", () => {
        req.body = data;
        next();
      });
    } else {
      next();
    }
  });

  await app.listen(3000);
}

bootstrap();
