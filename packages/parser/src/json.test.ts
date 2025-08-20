import { describe, it, expect } from "vitest";
import * as json from "./json";

describe("json module", () => {
  it("parses JSON with leading whitespace", () => {
    const result = json.parse("   123");
    expect(result.token?.type).toBeDefined();
    expect((result.token as json.NumberToken)?.value).toBe(123);
  });
});

describe("json module", () => {
  it("parses a number", () => {
    const result = json.parse("42");
    expect(result.token?.type).toBe(json.Type.Number);
  });

  it("parses a string", () => {
    const result = json.parse('"hello"');
    expect(result.token?.type).toBe(json.Type.String);
  });

  it("parses an array", () => {
    const result = json.parse("[1,2]");
    expect(result.token?.type).toBe(json.Type.Array);
  });

  it("parses an object", () => {
    const result = json.parse('{"a":1}');
    expect(result.token?.type).toBe(json.Type.Object);
  });

  it("parses true", () => {
    const result = json.parse("true");
    expect(result.token?.type).toBe(json.Type.True);
  });

  it("parses false", () => {
    const result = json.parse("false");
    expect(result.token?.type).toBe(json.Type.False);
  });

  it("parses null", () => {
    const result = json.parse("null");
    expect(result.token?.type).toBe(json.Type.Null);
  });

  it("throws on non-string input", () => {
    // @ts-expect-error Passing non-string to json.parse to test error handling
    expect(() => json.parse(123)).toThrow(TypeError);
  });
});
