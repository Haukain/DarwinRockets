import { CanvasWidget } from "./CanvasWidget.js";
import { PhysicsComputer } from "../worker/physics/PhysicsComputer.js";

export class PhysicsDisplayer extends CanvasWidget{
  constructor(terrain,rockets,autoRefresh=true) {
    super("white","white");
    this._element.className += " physicsDisplayer";
    let that = this;
    //save data
    this._terrain = terrain;
    this._rockets = rockets;
    //creating engine
    this._engine = new PhysicsComputer(terrain,rockets);
    this._canvas.width = terrain.size.width;
    this._canvas.height = terrain.size.height;
    //static assets draw optimization canvas
    this._statics={};
    this._statics.canvas = document.createElement("CANVAS");
    this._statics.canvas.width = this._canvas.width;
    this._statics.canvas.height = this._canvas.height;
    this._statics.ctx = this._statics.canvas.getContext("2d");
    this._statics.img = new Image();
    //background plane
    this._background = new Image();
    this._background.src = './assets/images/starBackground.png';
    this._background.loaded = false;
    this._background.onload = ()=>{that._background.loaded = true;that.renderStatics();}
    //path
    this._path = [[]];
    //end graphics
    this._end = new Image();
    this._end.src = './assets/images/signal_lost.png';
    this._end.loaded = false;
    this._end.onload = ()=>{that._end.loaded = true;}
    this.renderStatics();
    //render Loop
    if(autoRefresh){
      (function render(){
        if(!that._engine.isEnded()){
          window.requestAnimationFrame(render);
          that.tick();
        }else{
          that.drawEnding();
          console.log("Simulation ended");
        }
      })();
    }
  }
  renderStatics(){
    //display everything onto the static canvas
    if (this._background.loaded){
      this._statics.ctx.drawImage(this._background,0,0,this._statics.canvas.width,this._background.height/this._background.width*this._statics.canvas.width);
    }
    else {
      this._statics.ctx.fillStyle = '#1a233a';
      this._statics.ctx.fillRect(0, 0, this._statics.canvas.width, this._statics.canvas.height);
    }
    for(let o of this._terrain.objects){
      this._statics.ctx.save();
      this._statics.ctx.translate(o.position.x,o.position.y);
      o.draw(this._statics.ctx);
      this._statics.ctx.restore();
    }
    //export the canvas into an image
    this._statics.img.src = this._statics.canvas.toDataURL("image/png");
  }
  drawStatics(){
    this._ctx.drawImage(this._statics.img,0,0);
  }
  drawRockets(){
    for(let rocket of this._engine.rockets){
      this._ctx.save();
      this._ctx.translate(rocket.position.x,rocket.position.y);
      this._ctx.rotate(rocket.angle + Math.PI);
      rocket.draw(this._ctx);
      this._ctx.restore();
    }
  }
  drawPath(){
    for (let r=0;r<this._engine.rockets.length;r++){
      this._ctx.beginPath();

      this._path[r].push(this._engine.rockets[r].position.x);
      this._path[r].push(this._engine.rockets[r].position.y);
      this._ctx.moveTo(this._path[r][0],this._path[r][1]);
      for(let i=2;i<this._path[r].length;i=i+2){
        this._ctx.lineTo(this._path[r][i],this._path[r][i+1]);
      }
      this._ctx.strokeStyle = 'rgba(214, 91, 115,0.5)';
      this._ctx.lineWidth = 3;
      this._ctx.stroke();
    }
  }
  drawEnding(){
    this._ctx.drawImage(this._end,0,0,this._canvas.width,this._end.height/this._end.width*this._canvas.width);
  }
  draw(){
    this.drawStatics();
    this.drawPath();
    this.drawRockets();
  }
  tick(){
    this._engine.update();
    this.draw();
  }
  get time(){
    return this._engine.time;
  }
}
