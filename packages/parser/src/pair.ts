import { type PairToken, Type } from "./json.js";
import { parse as parseString } from "./string.js";
import { parse as parseValue } from "./value.js";

enum Mode {
  Colon,
  End,
  Scanning,
  String,
  Value,
}

export function parse(expression: string, delimiters?: RegExp) {
  let mode = Mode.Scanning;
  let pos = 0;
  const token: PairToken = {
    type: Type.Pair,
    key: undefined,
    value: undefined,
  };

  while (pos < expression.length && mode !== Mode.End) {
    const ch = expression.charAt(pos);

    switch (mode) {
      case Mode.Scanning:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else {
          mode = Mode.String;
        }
        break;

      case Mode.String:
        {
          const slice = expression.slice(pos);
          const string = parseString(slice);
          token.key = string.token;
          pos += string.skip;
          mode = Mode.Colon;
        }
        break;

      case Mode.Colon:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === ":") {
          pos++;
          mode = Mode.Value;
        } else {
          throw new SyntaxError(`expected ':', actual '${ch}'`);
        }
        break;

      case Mode.Value:
        {
          const slice = expression.slice(pos);
          const value = parseValue(slice, delimiters);
          token.value = value.token;
          pos += value.skip;
          mode = Mode.End;
        }
        break;
    }
  }

  if (mode !== Mode.End) {
    throw new SyntaxError(`incomplete expression, mode ${Mode[mode]}`);
  }

  return {
    skip: pos,
    token,
  };
}
