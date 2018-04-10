import { Widget } from "./Widget.js";

export class Text extends Widget{
  constructor(text) {
    super();
    this._element = document.createElement("P");
    this._innerElement = this._element;
    this._element.className = "card-text";
    this.text = text;
  }

  addChild() {}
  removeChild() {}

  set text(t){
    this._innerElement.textContent = t;
  }
  get text(){
    return this._innerElement.textContent;
  }
}
