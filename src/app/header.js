import { Navbar } from "../displayer/navbar/navbar.js";
import { NavbarItem } from "../displayer/navbar/navbaritem.js";
import { IconButton } from "../displayer/iconbutton.js";
import { RangeInput } from "../displayer/rangeinput.js";
import { NumericPrompt } from "../dialogs/numericprompt.js";
import { Alert } from "../dialogs/alert.js";

export class Header{
  constructor(app){
    let that = this;
    this._app = app;
    this.container = new Navbar("./assets/icons/favicon-32x32.png");
    //back button
    this._addButton("arrow_back","go back",e=>{that._app.goBack()});
    //start/stop gen Button
    this._addButton("play_arrow","toggle continuous generation",e=>{
      if(e.icon=="play_arrow"){
        e.icon = "pause";
        that._app.startGen();
      }else{
        e.icon = "play_arrow";
        that._app.stopGen();
      }
    });
    //make N gen button
    this._addButton("chevron_right","make N generations",e=>{
      new NumericPrompt("number of generations","",d=>{
        that._app.makeNGen(d);
      });
    });
    //help Button
    this._addButton("help_outline","help",e=>{new Alert("Not yet written :/","sorry.")});
    //generation range
    let genItem = new NavbarItem();
    this._genRange = new RangeInput("generation");
    this._genRange.min=1;
    this._genRange.value=1;
    this.updateGen();

    genItem.addChild(this._genRange);
    this.container.addChild(genItem);
  }
  _addButton(icon,label,action){
    let item = new NavbarItem();
    let button = new IconButton(icon,label);
    button.on("click",()=>action(button));
    item.addChild(button);
    this.container.addChild(item);
  }
  hideButtons(){
    for(let child in this.container.children) chuld.disabled = true;
  }
  showButtons(){
    for(let child in this.container.children) chuld.disabled = false;
  }
  updateGen(){
    this._genRange.max=this._app.generations.length;
    this._genRange.disabled = this._genRange.max<=this._genRange.min;
  }
}
