import { Card } from "./Card.js";

export class CanvasWidget extends Card{
  constructor(bg,fg) {
    super(bg,fg);
    this.canvas = document.createElement("CANVAS");
    this.innerElement.appendChild(this.canvas);
  }
}
