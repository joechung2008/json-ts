import { parse as parseValue } from "./value.js";

export enum Type {
  Unknown = 0,
  Array,
  False,
  Null,
  Number,
  Pair,
  Object,
  String,
  True,
  Value,
}

export interface ArrayToken extends Token {
  values: ValueToken[];
}

export interface FalseToken extends Token {
  value: boolean;
}

export interface NullToken extends Token {
  value: null;
}

export interface NumberToken extends Token {
  value: number | undefined;
}

export interface ObjectToken extends Token {
  members: PairToken[];
}

export interface PairToken extends Token {
  key: StringToken | undefined;
  value: ValueToken | undefined;
}

export interface StringToken extends Token {
  value: string | undefined;
}

export interface Token {
  type: Type;
}

export interface TrueToken extends Token {
  value: boolean;
}

export type ValueToken =
  | ArrayToken
  | FalseToken
  | NullToken
  | NumberToken
  | ObjectToken
  | StringToken
  | TrueToken;

enum Mode {
  End,
  Scanning,
  Value,
}

export function parse(expression: string) {
  if (typeof expression !== "string") {
    throw new TypeError("expression expected string");
  }

  let mode = Mode.Scanning;
  let pos = 0;
  let token: ValueToken | undefined = undefined;

  while (pos < expression.length && mode !== Mode.End) {
    const ch = expression.charAt(pos);

    switch (mode) {
      case Mode.Scanning:
        if (/\s/.test(ch)) {
          pos++;
        } else {
          mode = Mode.Value;
        }
        break;

      case Mode.Value:
        const slice = expression.slice(pos);
        const value = parseValue(slice);
        token = value.token;
        pos += value.skip;
        mode = Mode.End;
        break;
    }
  }

  return {
    skip: pos,
    token,
  };
}
