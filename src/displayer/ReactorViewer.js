import { CanvasWidget } from "./CanvasWidget.js";

export class ReactorViewer extends CanvasWidget{
  constructor(r) {
    super("white","white");
    this._canvas.width = 100;
    this._canvas.height = 100;
    this._reactor = r;
    this._rank = null;
    this._time = 0;
    this.draw();
  }
  draw(){
    this._ctx.clearRect(0,0,100,100);
    this._ctx.save();
    this._ctx.translate(50,50);
    this._ctx.rotate(Math.PI*0.25+this._reactor.angle);
    this._reactor.draw(this._ctx);
    this._ctx.restore();
    this._ctx.fillStyle="#d65b73";
    this._ctx.fillRect(this._reactor.activationTime/20*100,90,this._reactor.extinctionTime/20*100,10);
    this._ctx.fillStyle="#1a233a";
    this._ctx.fillRect(this._time/20*100,90,1,10);

  }
  set time(t){
    this._time=t;
    this.draw();
  }
  get time(){
    return this._time;
  }
}
