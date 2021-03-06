export class Widget{
  constructor() {
    if (this.constructor === Widget) {
      throw new Error("Widget is an abstract class");
    }
    this._children = [];
    this._element = document.createElement("DIV");
    this._innerElement = this._element;
    this.disabled = false;
  }
  addChild(child) {
    this.children.push(child);
    this._innerElement.appendChild(child.element);
  }
  removeChild(child) {
    if(this._children.indexOf(child)==-1) return;
    this._children.splice(this._children.indexOf(child),1);
    this._innerElement.removeChild(child._element);
  }
  on(evt,callback) {
    this._element.addEventListener(evt,callback,false);
  }
  trigger(evt){
    let event = document.createEvent("HTMLEvents");
    event.initEvent(evt, true, true );
    this._element.dispatchEvent(event);
  }
  destroy() {
    while(this._children.length){
      this._children[0].destroy();
      this.removeChild(this._children[0]);
    }
  }
  get disabled(){
    return this._element.style.display=="none";
  }
  set disabled(d) {
    this._element.style.display = d?"none":"";
  }
  get children(){
    return this._children;
  }
  get element(){
    return this._element;
  }
}
