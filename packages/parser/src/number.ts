import { type NumberToken, Type } from "./json.js";

enum Mode {
  Characteristic,
  CharacteristicDigit,
  DecimalPoint,
  End,
  Exponent,
  ExponentDigits,
  ExponentFirstDigit,
  ExponentSign,
  Mantissa,
  Scanning,
}

export function parse(expression: string, delimiters = /[ \n\r\t]/) {
  let mode = Mode.Scanning;
  let pos = 0;
  let valueAsString = "";
  const token: NumberToken = {
    type: Type.Number,
    value: undefined,
  };

  while (pos < expression.length && mode !== Mode.End) {
    const ch = expression.charAt(pos);

    switch (mode) {
      case Mode.Scanning:
        if (/[ \n\r\t]/.test(ch)) {
          pos++;
        } else if (ch === "-") {
          valueAsString = "-";
          pos++;
          mode = Mode.Characteristic;
        } else {
          mode = Mode.Characteristic;
        }
        break;

      case Mode.Characteristic:
        if (ch === "0") {
          valueAsString += "0";
          pos++;
          mode = Mode.DecimalPoint;
        } else if (/[1-9]/.test(ch)) {
          valueAsString += ch;
          pos++;
          mode = Mode.CharacteristicDigit;
        } else {
          throw new SyntaxError(`Expected digit, actual '${ch}'`);
        }
        break;

      case Mode.CharacteristicDigit:
        if (/\d/.test(ch)) {
          valueAsString += ch;
          pos++;
        } else if (delimiters?.test(ch)) {
          mode = Mode.End;
        } else {
          mode = Mode.DecimalPoint;
        }
        break;

      case Mode.DecimalPoint:
        if (ch === ".") {
          valueAsString += ".";
          pos++;
          mode = Mode.Mantissa;
        } else if (delimiters?.test(ch)) {
          mode = Mode.End;
        } else {
          mode = Mode.Exponent;
        }
        break;

      case Mode.Mantissa:
        if (/\d/.test(ch)) {
          valueAsString += ch;
          pos++;
        } else if (/e/i.test(ch)) {
          mode = Mode.Exponent;
        } else if (delimiters?.test(ch)) {
          mode = Mode.End;
        } else {
          throw new SyntaxError(`unexpected character '${ch}'`);
        }
        break;

      case Mode.Exponent:
        if (/e/i.test(ch)) {
          valueAsString += "e";
          pos++;
          mode = Mode.ExponentSign;
        } else {
          throw new SyntaxError(`expected 'e' or 'E', actual '${ch}'`);
        }
        break;

      case Mode.ExponentSign:
        if (ch === "+" || ch === "-") {
          valueAsString += ch;
          pos++;
          mode = Mode.ExponentFirstDigit;
        } else {
          mode = Mode.ExponentFirstDigit;
        }
        break;

      case Mode.ExponentFirstDigit:
        if (/\d/.test(ch)) {
          valueAsString += ch;
          pos++;
          mode = Mode.ExponentDigits;
        } else {
          throw new SyntaxError(`expected digit, actual '${ch}'`);
        }
        break;

      case Mode.ExponentDigits:
        if (/\d/.test(ch)) {
          valueAsString += ch;
          pos++;
        } else if (delimiters?.test(ch)) {
          mode = Mode.End;
        } else {
          throw new SyntaxError(`expected digit, actual '${ch}'`);
        }
        break;
    }
  }

  switch (mode) {
    case Mode.Characteristic:
    case Mode.ExponentFirstDigit:
    case Mode.ExponentSign:
      throw new SyntaxError(`incomplete expression, mode ${Mode[mode]}`);

    default:
      token.value = parseFloat(valueAsString);
      break;
  }

  return {
    skip: pos,
    token,
  };
}
