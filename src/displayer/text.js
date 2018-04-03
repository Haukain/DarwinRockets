import { Widget } from "./widget.js";

export class Text extends Widget{
  constructor(text) {
    super();
    this.element = document.createElement("P");
    this.element.className = "card-text";
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
