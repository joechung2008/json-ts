import { Type } from "./json.js";

enum Mode {
  Char,
  End,
  EscapedChar,
  Scanning,
  Unicode,
}

export function parse(expression: string) {
  let mode = Mode.Scanning,
    pos = 0,
    value: string | undefined = undefined;

  while (pos < expression.length && mode !== Mode.End) {
    const ch = expression.charAt(pos);

    switch (mode) {
      case Mode.Scanning:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === '"') {
          value = "";
          pos++;
          mode = Mode.Char;
        } else {
          throw new SyntaxError(`expected '"', actual '${ch}'`);
        }
        break;

      case Mode.Char:
        if (ch === "\\") {
          pos++;
          mode = Mode.EscapedChar;
        } else if (ch === '"') {
          pos++;
          mode = Mode.End;
        } else if (ch !== "\n" && ch !== "\r") {
          value += ch;
          pos++;
        } else {
          throw new SyntaxError(`unexpected character '${ch}'`);
        }
        break;

      case Mode.EscapedChar:
        if (ch === '"' || ch === "\\" || ch === "/") {
          value += ch;
          pos++;
          mode = Mode.Char;
        } else if (ch === "b") {
          value += "\b";
          pos++;
          mode = Mode.Char;
        } else if (ch === "f") {
          value += "\f";
          pos++;
          mode = Mode.Char;
        } else if (ch === "n") {
          value += "\n";
          pos++;
          mode = Mode.Char;
        } else if (ch === "r") {
          value += "\r";
          pos++;
          mode = Mode.Char;
        } else if (ch === "t") {
          value += "\t";
          pos++;
          mode = Mode.Char;
        } else if (ch === "u") {
          pos++;
          mode = Mode.Unicode;
        } else {
          throw new SyntaxError(`unexpected escape character '${ch}'`);
        }
        break;

      case Mode.Unicode:
        const slice = expression.slice(pos, pos + 4);
        if (slice.length < 4) {
          throw new SyntaxError(`incomplete Unicode code '${slice}'`);
        }

        const hex = parseInt(slice, 16);
        if (isNaN(hex)) {
          throw new SyntaxError(`unexpected Unicode code '${slice}'`);
        }

        value += String.fromCharCode(hex);
        pos += 4;
        mode = Mode.Char;
        break;
    }
  }

  if (mode !== Mode.End) {
    throw new Error(`incomplete string, mode ${Mode[mode]}`);
  }

  return {
    skip: pos,
    token: {
      type: Type.String,
      value,
    },
  };
}
