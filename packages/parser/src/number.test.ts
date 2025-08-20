import { describe, it, expect } from "vitest";
import * as number from "./number";

describe("number module", () => {
  it("parses an integer", () => {
    const result = number.parse("123");
    expect(result.token.value).toBe(123);
  });

  it("parses a negative integer", () => {
    const result = number.parse("-42");
    expect(result.token.value).toBe(-42);
  });

  it("parses a decimal", () => {
    const result = number.parse("3.14");
    expect(result.token.value).toBeCloseTo(3.14);
  });

  it("parses scientific notation", () => {
    const result = number.parse("1e3");
    expect(result.token.value).toBe(1000);
  });

  it("parses positive exponent", () => {
    const result = number.parse("1e5");
    expect(result.token.value).toBe(100000);
  });

  it("parses large positive exponent", () => {
    const result = number.parse("1e10");
    expect(result.token.value).toBe(10000000000);
  });

  it("parses large negative exponent", () => {
    const result = number.parse("2e-10");
    expect(result.token.value).toBeCloseTo(2e-10);
  });

  it("parses negative exponent", () => {
    const result = number.parse("2e-3");
    expect(result.token.value).toBeCloseTo(0.002);
  });

  it("parses number with delimiter", () => {
    const result = number.parse("123,", /[,]/);
    expect(result.token.value).toBe(123);
    expect(result.skip).toBe(3);
  });

  it("parses negative decimal with delimiter", () => {
    const result = number.parse("-3.14]", /[\]]/);
    expect(result.token.value).toBeCloseTo(-3.14);
    expect(result.skip).toBe(5);
  });

  it("parses number with multi-digit exponent and delimiter", () => {
    const result = number.parse("1e12,", /[,]/);
    expect(result.token.value).toBe(1e12);
    expect(result.skip).toBe(4);
  });

  it("parses zero", () => {
    const result = number.parse("0");
    expect(result.token.value).toBe(0);
  });

  it("parses negative zero", () => {
    const result = number.parse("-0");
    expect(result.token.value).toBe(-0);
  });

  it("parses number with leading/trailing whitespace", () => {
    const result = number.parse("   42  ");
    expect(result.token.value).toBe(42);
  });

  it("parses small decimal", () => {
    const result = number.parse("0.00001");
    expect(result.token.value).toBeCloseTo(0.00001);
  });

  it("parses large number", () => {
    const result = number.parse("123456789012345");
    expect(result.token.value).toBe(123456789012345);
  });

  it("parses negative decimal", () => {
    const result = number.parse("-3.14");
    expect(result.token.value).toBeCloseTo(-3.14);
  });

  it("parses scientific notation with negative exponent", () => {
    const result = number.parse("2e-2");
    expect(result.token.value).toBeCloseTo(0.02);
  });

  it("throws on invalid input", () => {
    expect(() => number.parse("abc")).toThrow(SyntaxError);
  });

  it("throws on incomplete exponent", () => {
    expect(() => number.parse("1e")).toThrow(SyntaxError);
  });

  it("throws on invalid character after exponent", () => {
    expect(() => number.parse("1eA")).toThrow(SyntaxError);
    expect(() => number.parse("2E-")).toThrow(SyntaxError);
    expect(() => number.parse("3e+ ")).toThrow(SyntaxError);
    expect(() => number.parse("1.2e12E")).toThrow(SyntaxError);
    expect(() => number.parse("5e10X")).toThrow(SyntaxError);
  });

  it("throws on plus sign", () => {
    expect(() => number.parse("+123")).toThrow(SyntaxError);
  });

  it("throws on lone decimal", () => {
    expect(() => number.parse(".5")).toThrow(SyntaxError);
  });

  it("throws on invalid mantissa", () => {
    expect(() => number.parse("1.-23")).toThrow(SyntaxError);
    expect(() => number.parse("1.2.3")).toThrow(SyntaxError);
  });

  it("throws on NaN", () => {
    expect(() => number.parse("NaN")).toThrow(SyntaxError);
  });

  it("throws on Infinity", () => {
    expect(() => number.parse("Infinity")).toThrow(SyntaxError);
  });
});
