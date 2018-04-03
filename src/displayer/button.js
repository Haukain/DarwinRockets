import { Widget } from "./widget.js";

export class Button extends Widget{
  constructor(text) {
    super();
    this.element = document.createElement("BUTTON");
    this.element.className = `btn btn-primary`;
    this.text = text;
  }

  addChild() {}
  removeChild() {}
  
  set text(t){
    this.element.textContent = t;
  }
  get text(){
    return this.element.textContent;
  }
}
