export class Widget{
  constructor() {
    if (this.constructor === Widget) {
      throw new Error("Widget is an abstract class");
    }
    this.children = [];
    this.element = document.createElement("DIV");
    this.innerElement = this.element;
    this.disabled = false;
  }
  addChild(child) {
    this.children.push(child);
    this.innerElement.appendChild(child.element);
  }
  removeChild(child) {
    if(this.children.indexOf(child)==-1) return;
    this.children.splice(this.children.indexOf(child),1);
    this.innerElement.removeChild(child.element);
  }
  on(evt,callback) {
    this.element.addEventListener(evt,callback,false);
  }
  destroy() {
    for(let child of children) {
      child.destroy();
      this.removeChild(child);
    }
  }
}
