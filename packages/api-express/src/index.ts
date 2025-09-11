import { parse } from "@json-ts/parser";
import express, { type Express } from "express";

const app: Express = express();
app.use(express.text());

app.post("/api/v1/parse", (req, res) => {
  try {
    const result = parse(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
