import { Card } from "./Card.js";

export class CanvasWidget extends Card{
  constructor(bg,fg) {
    super(bg,fg);
    this._canvas = document.createElement("CANVAS");
    this._ctx = this._canvas.getContext('2d');
    this._innerElement.appendChild(this._canvas);
    this._element.className += " canvasWidget"
  }
}
