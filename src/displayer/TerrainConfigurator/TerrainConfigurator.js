import { CanvasWidget } from "../CanvasWidget.js";

export class TerrainConfigurator extends CanvasWidget{
  constructor() {
    super("white","white");
    this._canvas.width = 1000;
    this._canvas.height = 700;
    let that = this;
    this._tool = null;
    this._objects = [];
    this._canvas.addEventListener("mousedown",e=>{
      this._objects = that._tool.downCallback(this._eventRelativeCoords(e),this._objects);
      this.draw();
    },false);
    this._canvas.addEventListener("mousemove",e=>{
      this._objects = that._tool.moveCallback(this._eventRelativeCoords(e),this._objects);
      this.draw();
    },false);
    this._canvas.addEventListener("mouseup",e=>{
      this._objects = that._tool.upCallback(this._eventRelativeCoords(e),this._objects);
      this.draw();
    },false);
  }
  draw(){
    this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);
    for(let object of this._objects){
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
}
