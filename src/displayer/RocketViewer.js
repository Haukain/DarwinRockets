import { CanvasWidget } from "./CanvasWidget.js";

export class RocketViewer extends CanvasWidget{
  constructor(rocket) {
    super("white","white");
    this._canvas.width = 100;
    this._canvas.height = 100;
    this._rocket = rocket;
    this.draw();
  }
  draw(){
    let matrix = Object.assign({},this._ctx.currentTransform);
    this._rocket.draw(this._ctx);
    this._ctx.currentTransform = matrix;
  }
}
