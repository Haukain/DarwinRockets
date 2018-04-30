import { CanvasWidget } from "./CanvasWidget.js";
import { PhysicsComputer } from "../worker/physics/PhysicsComputer.js";

export class PhysicsDisplayer extends CanvasWidget{
  constructor(terrain,rockets,autoRefresh=true) {
    super("white","white");
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
    this.renderStatics();
    //render Loop
    if(autoRefresh){
      (function render(){
        if(!that._engine.isEnded()){
          window.requestAnimationFrame(render);
          that.tick();
        }else{
          console.log("ended");
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
  draw(){
    this.drawStatics();
    this.drawRockets();
  }
  tick(){
    this._engine.update();
    this.draw();
  }
}
