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
    this._ctx.font="12px Arial";
    this._ctx.fillStyle="#d65b73";
    this._ctx.fillRect(0,100-22,40,22);
    this._ctx.fillStyle="white";
    this._ctx.fillText(this._rocket.score.toFixed(3),5,95);
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
