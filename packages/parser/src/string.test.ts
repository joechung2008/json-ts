import { describe, it, expect } from "vitest";
import * as string from "./string";

describe("string module", () => {
  it("parses a normal string", () => {
    const result = string.parse('"hello"');
    expect(result.token.value).toBe("hello");
  });

  it("parses an empty string", () => {
    const result = string.parse('""');
    expect(result.token.value).toBe("");
  });

  it("parses escaped quotes", () => {
    const result = string.parse('"he\\"llo"');
    expect(result.token.value).toBe('he"llo');
  });

  it("parses escaped backslash", () => {
    const result = string.parse('"he\\\\llo"');
    expect(result.token.value).toBe("he\\llo");
  });

  it("parses Unicode escape", () => {
    const result = string.parse('"hi\\u0041"');
    expect(result.token.value).toBe("hiA");
  });

  it("parses string with whitespace", () => {
    const result = string.parse('"  spaced  "');
    expect(result.token.value).toBe("  spaced  ");
  });

  it("parses string with newline", () => {
    const result = string.parse('"line\\nend"');
    expect(result.token.value).toBe("line\nend");
  });

  it("parses string with tab", () => {
    const result = string.parse('"tab\\tend"');
    expect(result.token.value).toBe("tab\tend");
  });

  it("parses string with multiple escapes", () => {
    const result = string.parse('"a\\nb\\tc\\\\"');
    expect(result.token.value).toBe("a\nb\tc\\");
  });

  it("parses long string", () => {
    const longStr = '"' + "a".repeat(1000) + '"';
    const result = string.parse(longStr);
    expect(result.token.value).toBe("a".repeat(1000));
  });

  it("parses Unicode escape sequence", () => {
    const result = string.parse('"A=\\u0041"');
    expect(result.token.value).toBe("A=A");
  });

  it("parses surrogate pair (emoji)", () => {
    const result = string.parse('"smile=\\uD83D\\uDE00"');
    expect(result.token.value).toBe("smile=😀");
  });

  it("parses string with mixed escapes", () => {
    const result = string.parse('"mix\\n\\t"');
    expect(result.token.value).toBe("mix\n\t");
  });

  it("parses string with backspace escape", () => {
    const result = string.parse('"a\\b"');
    expect(result.token.value).toBe("a\b");
  });

  it("parses string with form feed escape", () => {
    const result = string.parse('"a\\f"');
    expect(result.token.value).toBe("a\f");
  });

  it("parses string with carriage return escape", () => {
    const result = string.parse('"a\\r"');
    expect(result.token.value).toBe("a\r");
  });

  it("parses single character string", () => {
    const result = string.parse('"x"');
    expect(result.token.value).toBe("x");
  });

  it("parses string with only escape", () => {
    const result = string.parse('"\\n"');
    expect(result.token.value).toBe("\n");
  });

  it("parses string with leading whitespace", () => {
    const result = string.parse('   "abc"');
    expect(result.token.value).toBe("abc");
  });

  it("throws on unescaped newline in string", () => {
    const input = `"abc\ndef"`;
    expect(() => string.parse(input)).toThrow(Error);
  });

  it("throws on invalid Unicode escape", () => {
    expect(() => string.parse('"bad\\uZZZZ"')).toThrow(SyntaxError);
  });

  it("throws on incomplete escape", () => {
    expect(() => string.parse('"bad\\')).toThrow(Error);
  });

  it("throws on invalid escape", () => {
    expect(() => string.parse('"bad\\xescape"')).toThrow(SyntaxError);
  });

  it("throws on missing opening quote", () => {
    expect(() => string.parse('hello"')).toThrow(SyntaxError);
  });

  it("throws on missing closing quote", () => {
    expect(() => string.parse('"hello')).toThrow(Error);
  });

  it("throws on incomplete Unicode escape", () => {
    expect(() => string.parse('"hi\\u00"')).toThrow(SyntaxError);
  });
});
