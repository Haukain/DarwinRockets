import { Navbar } from "../displayer/navbar/Navbar.js";
import { NavbarItem } from "../displayer/navbar/NavbarItem.js";
import { IconButton } from "../displayer/IconButton.js";
import { Text } from "../displayer/Text.js";
import { RangeInput } from "../displayer/RangeInput.js";
import { NumericPrompt } from "../dialogs/NumericPrompt.js";
import { Alert } from "../dialogs/Alert.js";

export class Header{
  constructor(app){
    let that = this;
    this._app = app;
    this.container = new Navbar("./assets/svg/Logo DarwinRockets without text.svg","Darwin Rockets");
    //back button
    this._addButton("arrow_back","Edition",e=>{that._app.goEdit();if(genItem2){console.log("if");genItem2.destroy();genItem2.addChild(new Text("Current generation : 1"))}});
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

    //generation range and text which indicates the current generation
    let genItem = new NavbarItem();
    let genItem2 = new NavbarItem();
    let numberCurrentGenText = new Text("Current generation : 1");
    this._genRange = new RangeInput("Generations");
    this._genRange.min=1;
    this._genRange.step=1;
    this._genRange.value=1;
    this._genRange.on("change",()=>{
      that._app.selectGeneration(that._app.generations[this._genRange.value-1]);
      numberCurrentGenText = new Text("Current generation : "+String(this._genRange.value));
      genItem2.destroy();
      genItem2.addChild(numberCurrentGenText);
    });
    this.updateGen();

    genItem.addChild(this._genRange);
    this.container.addChild(genItem);
    if(this._app.state == "edit"){console.log("if");genItem2.destroy();genItem2.addChild("1");}
    this.container.addChild(genItem2);
  }
  _addButton(icon,label,action){
    let item = new NavbarItem();
    let button = new IconButton(icon,label);
    button.on("click",()=>action(button));
    item.addChild(button);
    this.container.addChild(item);
  }
  hideButtons(){
    for(let child of this.container.children) child.disabled = true;
  }
  showButtons(){
    for(let child of this.container.children) child.disabled = false;
  }
  updateGen(){
    this._genRange.max=this._app.generations.length;
    this._genRange.disabled = this._genRange.max<=this._genRange.min;
  }
}
