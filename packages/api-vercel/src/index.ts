import { parse } from "@json-ts/parser";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ code: 405, message: "Method Not Allowed" });
    return;
  }

  if (!req.headers["content-type"]?.startsWith("text/plain")) {
    res.status(415).json({ code: 415, message: "Unsupported Media Type" });
    return;
  }

  const expression = typeof req.body === "string" ? req.body : undefined;
  console.log("expression", expression);
  console.log("typeof expression", typeof expression);

  if (typeof expression !== "string") {
    res
      .status(400)
      .json({ error: "Missing or invalid 'expression' in request body" });
    return;
  }

  try {
    const result = parse(expression);
    res.status(200).json(result);
  } catch (err) {
    const expected = isError(err);
    const code = expected ? 400 : 500;
    res.status(code).json({
      code,
      message: expected && err.message ? err.message : "Internal Server Error",
    });
  }
}

function isError(err: unknown): err is Error {
  return (
    err !== null &&
    err !== undefined &&
    typeof err === "object" &&
    "message" in err
  );
}
