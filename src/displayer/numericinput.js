import { Input } from "./input.js";

export class NumericInput extends Input{
  constructor(text) {
    super(text);
    this.innerElement.type = `number`;
  }
  set value(v){
    this.innerElement.value = parseFloat(v);
  }
  get value(){
    return parseFloat(this.innerElement.value);
  }
}
