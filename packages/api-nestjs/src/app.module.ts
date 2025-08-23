import { Module } from "@nestjs/common";
import { ParseController } from "./modules/parse/parse.controller.js";

@Module({
  controllers: [ParseController],
})
export class AppModule {}
