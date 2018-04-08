import { Text } from "./Text.js";

export class Button extends Text{
  constructor(text,color) {
    super(text);
    this.element = document.createElement("BUTTON");
    this.innerElement = this.element;
    this.element.className = `btn ${color}-bg`;
    this.text = text;
  }
}
