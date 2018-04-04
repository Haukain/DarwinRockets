import { Modal } from "../displayer/modal.js";
import { Title } from "../displayer/title.js";
import { Text } from "../displayer/text.js";
import { Button } from "../displayer/button.js";

export class Alert{
  constructor(title,text){
    let that = this;
    this._modal = new Modal();

    this._titleW = new Title(title);
    this._textW = new Text(text);
    this._buttonW = new Button("Ok","skyblue");

    this._modal.addChild(this._titleW);
    this._modal.addChild(this._textW);
    this._modal.addChild(this._buttonW);

    this._buttonW.on("click",e=>{that._close();});

    document.body.appendChild(this._modal.element);
    this._modal.show();

  }
  _close(){
    this._modal.hide();
    this._modal.destroy();
    document.body.removeChild(this._modal.element);
    delete this._modal;
  }
}
