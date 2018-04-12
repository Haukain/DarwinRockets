import { Widget } from "./Widget.js";

export class ImageWidget extends Widget{
  constructor(source,width) {
    super();
    this._element = new Image();
    this._innerElement = this._element;
    this._element.className = "card-text";
    this.source = source;
    this.width = width;
  }

  addChild() {}
  removeChild() {}

  set source(s){
    this._innerElement.src = s;
  }
  get source(){
    return this._innerElement.src;
  }
  set width(width){
    if(!width) width="100%";
    if(typeof width == "number") width = ""+ width +"px";
    this._innerElement.style.width = width;
  }
  get width(){
    return this._innerElement.style.width;
  }
}
