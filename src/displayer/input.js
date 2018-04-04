import { Text } from "./text.js";

export class Input extends Text{
  constructor(text) {
    super(text);
    this.element = document.createElement("DIV");
    this.element.className = `inputContainer`;
    this.innerElement = document.createElement("INPUT");
    this.innerElement.type = `text`;
    this.element.appendChild(this.innerElement);
    this.text = text;
  }

  set value(v){
    this.innerElement.value = v;
  }
  get value(){
    return this.innerElement.value;
  }
  set text(v){
    this.innerElement.placeholder = v;
  }
  get text(){
    return this.innerElement.placeholder;
  }
}
