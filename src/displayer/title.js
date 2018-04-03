import { Text } from "./text.js";

export class Title extends Text{
  constructor(text) {
    super(text);
    this.element = document.createElement("H5");
    this.element.className = "card-title";
    this.text = text;
  }
}
