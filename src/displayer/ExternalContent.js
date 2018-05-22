import { Widget } from "./Widget.js";

export class ExternalContent extends Widget{
  constructor(src) {
    super();
    this._element = document.createElement("IFRAME");
    this._innerElement = this._element;
    this._element.className = "fluidframe";
    this.src = src;
  }
  get src(){
    return this._element.src;
  }
  set src(s){
    this._element.src=s;
  }
}
