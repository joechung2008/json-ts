import { parse } from "@json-ts/parser";
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";

@Controller("/api/v1")
export class ParseController {
  @Post("/parse")
  parseText(@Body() body: string) {
    if (typeof body !== "string") {
      throw new HttpException(
        {
          code: 415,
          message: "Unsupported Media Type. Expected text/plain.",
        },
        HttpStatus.UNSUPPORTED_MEDIA_TYPE
      );
    }
    try {
      const result = parse(body);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          code: 400,
          message: error instanceof Error ? error.message : String(error),
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
