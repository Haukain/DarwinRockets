import { CanvasWidget } from "./CanvasWidget.js";

export class RocketViewer extends CanvasWidget{
  constructor(rocket) {
    super("white","white");
    this._rocket = rocket;
    this.draw();
  }
  draw(){
    this._rocket.draw(this._ctx);
  }
}
