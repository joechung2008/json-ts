import { describe, it, expect } from "vitest";
import * as array from "./array";
import type { NumberToken } from "./json";

describe("array module", () => {
  it("parses an empty array", () => {
    const result = array.parse("[]");
    expect(result.token.values).toEqual([]);
  });

  it("parses a single-element array", () => {
    const result = array.parse("[1]");
    expect(result.token.values.length).toBe(1);
  });

  it("parses a multi-element array", () => {
    const result = array.parse("[1, 2, 3]");
    expect(result.token.values.length).toBe(3);
  });

  it("parses array with extra whitespace", () => {
    const result = array.parse("[  1  ,   2 , 3   ]");
    expect(result.token.values.length).toBe(3);
    expect((result.token.values[0] as NumberToken).value).toBe(1);
    expect((result.token.values[1] as NumberToken).value).toBe(2);
    expect((result.token.values[2] as NumberToken).value).toBe(3);
  });

  it("parses array with leading whitespace", () => {
    const result = array.parse("   [1,2,3]");
    expect(result.token.values.length).toBe(3);
    expect((result.token.values[0] as NumberToken).value).toBe(1);
    expect((result.token.values[1] as NumberToken).value).toBe(2);
    expect((result.token.values[2] as NumberToken).value).toBe(3);
  });

  it("throws on invalid delimiter between elements", () => {
    expect(() => array.parse("[1;2]")).toThrow(SyntaxError);
    expect(() => array.parse("[1 2]")).toThrow(SyntaxError);
  });

  it("throws on missing opening bracket", () => {
    expect(() => array.parse("1,2,3]")).toThrow(SyntaxError);
  });

  it("throws on missing closing bracket", () => {
    expect(() => array.parse("[1,2,3")).toThrow(SyntaxError);
  });

  it("throws on trailing comma", () => {
    expect(() => array.parse("[1,2,]")).toThrow(SyntaxError);
  });
});
