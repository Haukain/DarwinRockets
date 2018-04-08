import { Text } from "./Text.js";

export class Title extends Text{
  constructor(text) {
    super(text);
    this.element = document.createElement("H5");
    this.innerElement = this.element;
    this.element.className = "card-title";
    this.text = text;
  }
}
