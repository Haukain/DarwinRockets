import { Input } from "./input.js";

export class NumericInput extends Input{
  constructor(text) {
    super(text);
    this.innerElement.type = `number`;

  }
}
