import { describe, it, expect } from "vitest";
import * as pair from "./pair";

describe("pair module", () => {
  it("parses a valid key-value pair", () => {
    const result = pair.parse('"a":1');
    expect(result.token.key?.value).toBe("a");
    expect(result.token.value?.type).toBeDefined();
  });

  it("throws on missing colon", () => {
    expect(() => pair.parse('"a" 1')).toThrow(SyntaxError);
  });

  it("throws on missing key", () => {
    expect(() => pair.parse(":1")).toThrow(SyntaxError);
  });

  it("throws on missing value", () => {
    expect(() => pair.parse('"a":')).toThrow(SyntaxError);
  });

  it("throws on incomplete expression", () => {
    expect(() => pair.parse('"a"')).toThrow(SyntaxError);
  });
});
