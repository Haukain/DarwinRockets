import { Input } from "./Input.js";

export class RangeInput extends Input{
  constructor(text) {
    super(text);
    this._maxText = document.createElement("div");
    this._maxText.className = "rangeText rangeMax";
    this._element.appendChild(this._maxText);
    this._minText = document.createElement("div");
    this._minText.className = "rangeText rangeMin";
    this._element.appendChild(this._minText);
    this.titleText = document.createElement("div");
    this.titleText.className = "rangeText rangeTitle";
    this.element.appendChild(this.titleText);
    this.innerElement.type = `range`;
    this.max = 1;
    this.min = -1;
    this.step = 0.01;
    this.value = 0;
    this.text = text;
  }
  set max(v) {
    this.innerElement.max = v;
    this.maxText.textContent = v;
  }
  get max() {
    return this.innerElement.max;
  }
  set min(v) {
    this.innerElement.min = v;
    this.minText.textContent = v;
  }
  get min() {
    return this.innerElement.min;
  }
  set step(v) {
    this.innerElement.step = v;
  }
  get step() {
    return this.innerElement.step;
  }
  set text(v){
    if(this.titleText) this.titleText.textContent = v;
  }
  get text(){
    if(this.titleText) return this.titleText.textContent;
  }
}
