import { Text } from "./Text.js";

export class Button extends Text{
  constructor(text,color) {
    super(text);
    this._element = document.createElement("BUTTON");
    this._innerElement = this._element;
    this._element.className = `btn ${color}-bg`;
    this.text = text;
  }
}
