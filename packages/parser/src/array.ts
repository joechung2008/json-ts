import { type ArrayToken, Type } from "./json.js";
import { parse as parseValue } from "./value.js";

enum Mode {
  Comma,
  Elements,
  End,
  Scanning,
}

export function parse(expression: string) {
  let mode = Mode.Scanning;
  let pos = 0;
  const token: ArrayToken = {
    type: Type.Array,
    values: [],
  };

  while (pos < expression.length && mode !== Mode.End) {
    const ch = expression.charAt(pos);

    switch (mode) {
      case Mode.Scanning:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === "[") {
          pos++;
          mode = Mode.Elements;
        } else {
          throw new SyntaxError(`expected '[', actual '${ch}'`);
        }
        break;

      case Mode.Elements:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === "]") {
          if (token.values.length > 0) {
            throw new SyntaxError(`unexpected ','`);
          }

          pos++;
          mode = Mode.End;
        } else {
          const slice = expression.slice(pos),
            value = parseValue(slice, /[ \n\r\t\],]/);
          token.values.push(value.token);
          pos += value.skip;
          mode = Mode.Comma;
        }
        break;

      case Mode.Comma:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === "]") {
          pos++;
          mode = Mode.End;
        } else if (ch === ",") {
          pos++;
          mode = Mode.Elements;
        } else {
          throw new SyntaxError(`expected ',', actual '${ch}'`);
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
