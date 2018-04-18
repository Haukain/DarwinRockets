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
    this._ctx.save();
    this._ctx.translate(50,50);
    this._ctx.rotate(Math.PI*1.25);
    this._rocket.draw(this._ctx);
    this._ctx.restore();
  }
}
