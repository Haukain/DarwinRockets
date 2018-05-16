import { Text } from "./Text.js";

export class Input extends Text{
  constructor(text) {
    super(text);
    this._element = document.createElement("DIV");
    this._element.className = `inputContainer`;
    this._innerElement = document.createElement("INPUT");
    this._innerElement.type = `text`;
    this._element.appendChild(this._innerElement);
    this.text = text;
  }

  set value(v){
    this._innerElement.value = v;
  }
  get value(){
    return this._innerElement.value;
  }
  set text(v){
    this._innerElement.placeholder = v;
  }
  get text(){
    return this._innerElement.placeholder;
  }
  get locked(){
    return this._innerElement.disabled;

  }
  set locked(i){
    this._innerElement.disabled = i;
  }
}

