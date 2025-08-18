import { type PairToken, Type } from "./json.js";
import { parse as parsePair } from "./pair.js";

enum Mode {
  Delimiter,
  End,
  LeftBrace,
  Pair,
  Scanning,
}

export function parse(expression: string) {
  let mode = Mode.Scanning;
  let pos = 0;
  const members: PairToken[] = [];

  while (pos < expression.length && mode !== Mode.End) {
    const ch = expression.charAt(pos);

    switch (mode) {
      case Mode.Scanning:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === "{") {
          pos++;
          mode = Mode.Pair;
        } else {
          throw new SyntaxError(`expected '{', actual '${ch}'`);
        }
        break;

      case Mode.Pair:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch == "}") {
          if (members.length > 0) {
            throw new SyntaxError(`unexpected ','`);
          }
          pos++;
          mode = Mode.End;
        } else {
          const slice = expression.slice(pos);
          const pair = parsePair(slice, /[ \n\r\t\},]/);
          members.push(pair.token);
          pos += pair.skip;
          mode = Mode.Delimiter;
        }
        break;

      case Mode.Delimiter:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === ",") {
          pos++;
          mode = Mode.Pair;
        } else if (ch === "}") {
          pos++;
          mode = Mode.End;
        } else {
          throw new SyntaxError(`expected ',' or '}', actual '${ch}'`);
        }
        break;
    }
  }

  if (mode !== Mode.End) {
    throw new SyntaxError(`incomplete expression, mode ${Mode[mode]}`);
  }

  return {
    skip: pos,
    token: {
      members,
      type: Type.Object,
    },
  };
}
