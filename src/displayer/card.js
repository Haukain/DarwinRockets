import { Widget } from "./widget.js";

export class Card extends Widget{
  constructor(bg,fg) {
    super();
    this.element.className = "card";
    this.innerElement = document.createElement("DIV");
    this.element.appendChild(this.innerElement);
    this.innerElement.className = `card-body ${bg}-bg ${fg}`;
  }
}
