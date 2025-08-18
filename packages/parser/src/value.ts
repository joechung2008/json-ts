import { parse as parseArray } from "./array.js";
import {
  type FalseToken,
  type NullToken,
  type TrueToken,
  Type,
  type ValueToken,
} from "./json.js";
import { parse as parseNumber } from "./number.js";
import { parse as parseObject } from "./object.js";
import { parse as parseString } from "./string.js";

enum Mode {
  Array,
  End,
  False,
  Null,
  Number,
  Object,
  String,
  Scanning,
  True,
}

export function parse(expression: string, delimiters?: RegExp) {
  let ch: string;
  let mode = Mode.Scanning;
  let pos = 0;
  let token: ValueToken | undefined = undefined;

  while (pos < expression.length && mode !== Mode.End) {
    ch = expression.charAt(pos);

    switch (mode) {
      case Mode.Scanning:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === "[") {
          mode = Mode.Array;
        } else if (ch === "f") {
          mode = Mode.False;
        } else if (ch === "n") {
          mode = Mode.Null;
        } else if (/[-\d]/.test(ch)) {
          mode = Mode.Number;
        } else if (ch === "{") {
          mode = Mode.Object;
        } else if (ch === '"') {
          mode = Mode.String;
        } else if (ch === "t") {
          mode = Mode.True;
        } else if (delimiters && delimiters.test(ch)) {
          mode = Mode.End;
        } else {
          throw new SyntaxError(
            `expected array, false, null, number, object, string, or true, actual '${ch}'`
          );
        }
        break;

      case Mode.Array:
        {
          const slice = expression.slice(pos);
          const array = parseArray(slice);
          token = array.token;
          pos += array.skip;
          mode = Mode.End;
        }
        break;

      case Mode.False:
        {
          const slice = expression.slice(pos, pos + 5);
          if (slice === "false") {
            token = <FalseToken>{
              type: Type.False,
              value: false,
            };
            pos += 5;
            mode = Mode.End;
          } else {
            throw new SyntaxError(`expected false, actual ${slice}`);
          }
        }
        break;

      case Mode.Null:
        {
          const slice = expression.slice(pos, pos + 4);
          if (slice === "null") {
            token = <NullToken>{
              type: Type.Null,
              value: null,
            };
            pos += 4;
            mode = Mode.End;
          } else {
            throw new SyntaxError(`expected null, actual ${slice}`);
          }
        }
        break;

      case Mode.Number:
        {
          const slice = expression.slice(pos);
          const number = parseNumber(slice, delimiters);
          token = number.token;
          pos += number.skip;
          mode = Mode.End;
        }
        break;

      case Mode.Object:
        {
          const slice = expression.slice(pos);
          const object = parseObject(slice);
          token = object.token;
          pos += object.skip;
          mode = Mode.End;
        }
        break;

      case Mode.String:
        {
          const slice = expression.slice(pos);
          const string = parseString(slice);
          token = string.token;
          pos += string.skip;
          mode = Mode.End;
        }
        break;

      case Mode.True:
        {
          const slice = expression.slice(pos, pos + 4);
          if (slice === "true") {
            token = <TrueToken>{
              type: Type.True,
              value: true,
            };
            pos += 4;
            mode = Mode.End;
          } else {
            throw new SyntaxError(`expected true, actual ${slice}`);
          }
        }
        break;
    }
  }

  if (token === undefined) {
    throw new SyntaxError("value cannot be empty");
  }

  return {
    skip: pos,
    token,
  };
}
