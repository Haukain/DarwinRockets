import { Modal } from "../displayer/Modal.js";
import { Title } from "../displayer/Title.js";
import { Text } from "../displayer/Text.js";
import { Button } from "../displayer/Button.js";

export class Confirm{
  constructor(title,text,callback){
    let that = this;
    this._callback = callback;
    this._modal = new Modal();

    this._titleW = new Title(title);
    this._textW = new Text(text);

    this._button1W = new Button("Ok","skyblue");
    this._button2W = new Button("Cancel","pink");

    this._modal.addChild(this._titleW);
    this._modal.addChild(this._textW);
    this._modal.addChild(this._button1W);
    this._modal.addChild(this._button2W);

    this._button1W.on("click",e=>{that._confirm();});
    this._button2W.on("click",e=>{that._cancel();});

    document.body.appendChild(this._modal.element);
    this._modal.show();

  }
  _confirm(){
    this._callback();
    this._cancel();
  }
  _cancel(){
    this._modal.hide();
    this._modal.destroy();
    document.body.removeChild(this._modal.element);
    delete this._modal;
  }
}
