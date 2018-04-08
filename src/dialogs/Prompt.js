import { Modal } from "../displayer/Modal.js";
import { Title } from "../displayer/Title.js";
import { Text } from "../displayer/Text.js";
import { Input } from "../displayer/Input.js";
import { Button } from "../displayer/Button.js";

export class Prompt{
  constructor(title,text,callback){
    let that = this;
    this._callback = callback;
    this._modal = new Modal();

    this._titleW = new Title(title);
    this._inputW = new Input(text);
    this._buttonW = new Button("Ok","skyblue");

    this._modal.addChild(this._titleW);
    this._modal.addChild(this._inputW);
    this._modal.addChild(this._buttonW);

    this._buttonW.on("click",e=>{that._confirm();});
    this._inputW.on("keyup",e=>{if(e.keyCode == 13)that._confirm();});

    document.body.appendChild(this._modal.element);
    this._modal.show();

  }
  _confirm(){
    this._callback(this._inputW.value);
    this._modal.hide();
    this._modal.destroy();
    document.body.removeChild(this._modal.element);
    delete this._modal;
  }
}
