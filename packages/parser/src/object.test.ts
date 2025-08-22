import { describe, expect, it } from "vitest";
import { type NumberToken } from "./json";
import * as object from "./object";

describe("object module", () => {
  it("parses an empty object", () => {
    const result = object.parse("{}");
    expect(result.token.members).toEqual([]);
  });

  it("parses a single key-value pair", () => {
    const result = object.parse('{"a":1}');
    expect(result.token.members.length).toBe(1);
  });

  it("parses multiple key-value pairs", () => {
    const result = object.parse('{"a":1,"b":2}');
    expect(result.token.members.length).toBe(2);
  });

  it("parses object with extra whitespace", () => {
    const result = object.parse('  {  "a"  :  1  ,  "b"  :  2  }  ');
    expect(result.token.members.length).toBe(2);
    expect(result.token.members[0]?.key?.value).toBe("a");
    expect((result.token.members[0]?.value as NumberToken)?.value).toBe(1);
    expect(result.token.members[1]?.key?.value).toBe("b");
    expect((result.token.members[1]?.value as NumberToken)?.value).toBe(2);
  });

  it("throws on invalid key-value pair ending", () => {
    expect(() => object.parse('{"a":1; "b":2}')).toThrow(SyntaxError);
    expect(() => object.parse('{"a":1. "b":2}')).toThrow(SyntaxError);
  });

  it("throws on missing opening brace", () => {
    expect(() => object.parse('"a":1}')).toThrow(SyntaxError);
  });

  it("throws on missing closing brace", () => {
    expect(() => object.parse('{"a":1')).toThrow(SyntaxError);
  });

  it("throws on trailing comma", () => {
    expect(() => object.parse('{"a":1,}')).toThrow(SyntaxError);
  });
});
