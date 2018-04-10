import { Text } from "./Text.js";

export class Title extends Text{
  constructor(text) {
    super(text);
    this._element = document.createElement("H5");
    this._innerElement = this._element;
    this._element.className = "card-title";
    this.text = text;
  }
}
