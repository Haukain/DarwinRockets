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
    this._titleText = document.createElement("div");
    this._titleText.className = "rangeText rangeTitle";
    this._element.appendChild(this._titleText);
    this._innerElement.type = `range`;
    this.max = 1;
    this.min = -1;
    this.step = 0.01;
    this.value = 0;
    this.text = text;
  }
  set max(v) {
    this._innerElement.max = v;
    this._maxText.textContent = v;
  }
  get max() {
    return this._innerElement.max;
  }
  set min(v) {
    this._innerElement.min = v;
    this._minText.textContent = v;
  }
  get min() {
    return this._innerElement.min;
  }
  set step(v) {
    this._innerElement.step = v;
  }
  get step() {
    return this._innerElement.step;
  }
  set text(v){
    if(this._titleText) this._titleText.textContent = v;
  }
  get text(){
    if(this._titleText) return this._titleText.textContent;
  }
}
