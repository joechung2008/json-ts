import { parse } from "@json-ts/parser";
import * as readline from "readline";

/**
 * CLI tool to parse JSON input from stdin or interactive input,
 * and pretty print the resulting object structure.
 *
 * Usage:
 * - Pipe JSON data into this script.
 * - Or run interactively and enter JSON data.
 */

// Function to pretty print an object with indentation
function prettyPrint(obj: unknown, indent: number = 0): string {
  const pad = "  ".repeat(indent);

  if (obj === null || obj === undefined) {
    return String(obj);
  }

  if (typeof obj !== "object") {
    return String(obj);
  }

  const className = obj.constructor?.name ?? "Object";
  const props = Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return `\n${pad}  ${key}={\n${prettyPrint(
          value,
          indent + 1
        )}\n${pad}  }`;
      }

      return `\n${pad}  ${key}=${value}`;
    })
    .join("");

  return `${pad}${className}:${props}`;
}

// Read all input from stdin
let input = "";

process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    const result = parse(input);
    console.log(prettyPrint(result));
  } catch (err) {
    console.error("Parse error:", err);
    process.exit(1);
  }
});

// If input is piped, 'end' will fire. If run interactively, prompt for input and process line.
if (process.stdin.isTTY) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let ttyInput = "";

  console.log("Enter input (Ctrl+D to finish):");

  rl.on("line", (line) => {
    ttyInput += line + "\n";
  });

  rl.on("close", () => {
    try {
      const result = parse(ttyInput);
      console.log(prettyPrint(result));
    } catch (err) {
      console.error("Parse error:", err);
      process.exit(1);
    }
  });
}
