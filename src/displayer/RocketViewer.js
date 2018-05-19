import { CanvasWidget } from "./CanvasWidget.js";

export class RocketViewer extends CanvasWidget{
  constructor(rocket) {
    super("white","white");
    this._canvas.width = 100;
    this._canvas.height = 100;
    this._rocket = rocket;
    this._rank = null;
    this.draw();
  }
  draw(){
    this._ctx.save();
    this._ctx.translate(50,50);
    this._ctx.rotate(Math.PI*1.25);
    this._rocket.draw(this._ctx);
    this._ctx.restore();
  }
  get rank(){
    return this._rank;
  }
  set rank(r){
    if(this._rank){
      this._element.className.replace("rv-"+this._rank,"rv-"+r);
    }else{
      this._element.className += " rv-"+r;
    }
    this._rank=r;
  }
}
