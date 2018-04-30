import { Terrain } from "../../worker/Terrain.js";
import { CanvasWidget } from "../CanvasWidget.js";

export class TerrainConfigurator extends CanvasWidget{
  constructor(terrain) {
    super("white","white");
    terrain = terrain||new Terrain();
    this._canvas.width = terrain.size.width;
    this._canvas.height = terrain.size.height;
    let that = this;
    this._tool = null;
    this._terrain = terrain;
    this._canvas.addEventListener("mousedown",e=>{
      if(that._tool) this._terrain.objects = that._tool.downCallback(this._eventRelativeCoords(e),this._terrain.objects);
      this.draw();
    },false);
    this._canvas.addEventListener("mousemove",e=>{
      if(that._tool) this._terrain.objects = that._tool.moveCallback(this._eventRelativeCoords(e),this._terrain.objects);
      this.draw();
    },false);
    this._canvas.addEventListener("mouseup",e=>{
      if(that._tool) this._terrain.objects = that._tool.upCallback(this._eventRelativeCoords(e),this._terrain.objects);
      this.draw();
    },false);
    this.draw();
  }
  draw(){
    this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);
    for(let object of this._terrain.objects){
      this._ctx.save();
      this._ctx.translate(object.position.x,object.position.y);
      object.draw(this._ctx);
      this._ctx.restore();
    }
  }
  selectTool(tool){
    this._tool = tool;
  }
  _eventRelativeCoords(e){
    let container = this._canvas;
    let pos = {}, offset = {}, ref;
    ref = container.offsetParent;
    pos.x = !! e.touches ? e.touches[ 0 ].pageX : e.pageX;
    pos.y = !! e.touches ? e.touches[ 0 ].pageY : e.pageY;
    offset.left = container.offsetLeft;
    offset.top = container.offsetTop;
    while ( ref ) {
      offset.left += ref.offsetLeft;
      offset.top += ref.offsetTop;
      ref = ref.offsetParent;
    }
    return {
      x :(pos.x - offset.left)*this._canvas.width/this._canvas.clientWidth,
      y :(pos.y - offset.top)*this._canvas.height/this._canvas.clientHeight,
    };
  }

  get terrain(){return this._terrain;}
}
