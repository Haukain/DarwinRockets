import { Prompt } from "./Prompt.js";
import { NumericInput } from "../displayer/NumericInput.js";

export class NumericPrompt extends Prompt{
  constructor(title,text,callback){
    super(title,text,callback);
    let that = this;
    this._modal.removeChild(this._inputW);
    this._modal.removeChild(this._buttonW);
    this._inputW = new NumericInput(text);
    this._modal.addChild(this._inputW);
    this._modal.addChild(this._buttonW);
    this._inputW.on("keyup",e=>{if(e.keyCode == 13)that._confirm();});
    this._modal.hide();
    this._modal.show();
  }
}
