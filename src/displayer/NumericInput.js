import { Input } from "./Input.js";

export class NumericInput extends Input{
  constructor(text) {
    super(text);
    this._innerElement.type = `number`;
  }
  set value(v){
    this._innerElement.value = parseFloat(v);
  }
  get value(){
    return parseFloat(this._innerElement.value);
  }
}
