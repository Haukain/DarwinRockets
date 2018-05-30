import { CanvasWidget } from "./CanvasWidget.js";

export class ReactorViewer extends CanvasWidget{
  constructor(r,w=150,h=150) {
    super("white","white");
    this._canvas.width = w;
    this._canvas.height = h;
    this._ctx.scale(w/100,h/100);
    this._reactor = r;
    this._rank = null;
    this._time = 0;
    this.draw();
  }
  draw(){
    this._ctx.clearRect(0,0,100,100);
    this._ctx.save();
    this._ctx.translate(50,50);
    if(this._time>this._reactor.activationTime && this._time<this._reactor.activationTime+this._reactor.extinctionTime){
      this._ctx.rotate(Math.PI*0.25 +Math.random()/20 +this._reactor.angle);
      this._reactor.draw(this._ctx);
      this._ctx.beginPath();
      this._ctx.fillStyle='rgba(255, 170, 0, 0.5)';
      this._ctx.moveTo(9,-20);
      this._ctx.lineTo(-4+Math.random()*8,-45+Math.random()*2);
      this._ctx.lineTo(-9,-20);
      this._ctx.closePath();
      this._ctx.fill();
      this._ctx.beginPath();
      this._ctx.fillStyle='rgba(255, 76, 0, 0.4)';
      this._ctx.moveTo(9,-20);
      this._ctx.lineTo(-4+Math.random()*8,-35+Math.random()*2);
      this._ctx.lineTo(-9,-20);
      this._ctx.closePath();
      this._ctx.fill();
    }
    else {
      this._ctx.rotate(Math.PI*0.25+this._reactor.angle);
      this._reactor.draw(this._ctx);
    }
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
