import { CanvasWidget } from "./CanvasWidget.js";

export class RocketViewer extends CanvasWidget{
  constructor(bg,fg,rocket) {
    super(bg,fg);
    this._rocket = rocket;
  }
}