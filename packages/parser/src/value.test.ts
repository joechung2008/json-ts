import { describe, it, expect } from "vitest";
import * as value from "./value";

describe("value module", () => {
  it("parses a number", () => {
    const result = value.parse("42");
    expect(result.token.type).toBeDefined();
  });

  it("parses a string", () => {
    const result = value.parse('"hello"');
    expect(result.token.type).toBeDefined();
  });

  it("parses an array", () => {
    const result = value.parse("[1,2]");
    expect(result.token.type).toBeDefined();
  });

  it("parses an object", () => {
    const result = value.parse('{"a":1}');
    expect(result.token.type).toBeDefined();
  });

  it("parses true", () => {
    const result = value.parse("true");
    expect(result.token.type).toBeDefined();
  });

  it("parses false", () => {
    const result = value.parse("false");
    expect(result.token.type).toBeDefined();
  });

  it("parses null", () => {
    const result = value.parse("null");
    expect(result.token.type).toBeDefined();
  });

  it("parses a value with leading whitespace", () => {
    const result = value.parse("   42");
    expect(result.token.type).toBeDefined();
    if ("value" in result.token) {
      expect(result.token.value).toBe(42);
    }
  });

  it("parses a value with delimiters parameter", () => {
    // Example: parse '42,' with /[,]/ as delimiter
    const result = value.parse("42,", /[,]/);
    expect(result.token.type).toBeDefined();
    if ("value" in result.token) {
      expect(result.token.value).toBe(42);
    }
    expect(result.skip).toBe(2); // Should skip '42'
  });

  it("throws on empty input", () => {
    expect(() => value.parse("")).toThrow(SyntaxError);
  });

  it("throws on invalid input", () => {
    expect(() => value.parse("invalid")).toThrow(SyntaxError);
  });

  it("throws on typo in 'null'", () => {
    expect(() => value.parse("nul")).toThrow(SyntaxError);
    expect(() => value.parse("nall")).toThrow(SyntaxError);
    expect(() => value.parse("nulL")).toThrow(SyntaxError);
  });

  it("throws on typo in 'false'", () => {
    expect(() => value.parse("falze")).toThrow(SyntaxError);
    expect(() => value.parse("fa1se")).toThrow(SyntaxError);
    expect(() => value.parse("falsy")).toThrow(SyntaxError);
  });

  it("throws on typo in 'true'", () => {
    expect(() => value.parse("tru")).toThrow(SyntaxError);
    expect(() => value.parse("trua")).toThrow(SyntaxError);
    expect(() => value.parse("ture")).toThrow(SyntaxError);
    expect(() => value.parse("treu")).toThrow(SyntaxError);
  });
});
