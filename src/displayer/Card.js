import { Widget } from "./Widget.js";

export class Card extends Widget{
  constructor(bg,fg) {
    super();
    this._element.className = "card";
    this._innerElement = document.createElement("DIV");
    this._element.appendChild(this._innerElement);
    this._innerElement.className = `card-body ${bg}-bg ${fg}`;
  }
}
