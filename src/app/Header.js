import { Navbar } from "../displayer/navbar/Navbar.js";
import { NavbarItem } from "../displayer/navbar/NavbarItem.js";
import { IconButton } from "../displayer/IconButton.js";
import { Text } from "../displayer/Text.js";
import { RangeInput } from "../displayer/RangeInput.js";
import { NumericPrompt } from "../dialogs/NumericPrompt.js";
import { Alert } from "../dialogs/Alert.js";
import { ExternalPopup } from "../dialogs/ExternalPopup.js";

export class Header{
  constructor(app){
    let that = this;
    this._app = app;
    this.container = new Navbar("./assets/svg/Logo DarwinRockets without text.svg","Darwin Rockets");
    //back button
    this._addButton("arrow_back","Back",e=>{
      that._app.goBack();
    });
    //start/stop gen Button
    let continuousGenButton=this._addButton("play_arrow","toggle continuous generation",e=>{
      if(e.icon=="play_arrow"){
        that._app.startGen();
      }else{
        that._app.stopGen();
      }
    });
    setInterval(()=>{
      that._app.isGenerating().then(a=>{
        continuousGenButton.icon = a?"pause":"play_arrow";
      });
    },300);
    //make N gen button
    let nGenButton=this._addButton("chevron_right","make N generations",e=>{
      new NumericPrompt("Number of generations","",d=>{
        that._app.makeNGen(d);
      });
    });

    //help Button
    let helpButton = this._addButton("help_outline","help",e=>{/*new Alert("HELP !",
      "The rockets will try to find the best path between the start and the end you set\n"+
      "The planets will stop and the black hole attract the rockets to their doom\n"+
      "The best rockets (blue aura) will reproduce between each generation, the worst (red aura) will disappear\n"+
      "Experiment differents routes and configuration to see if and how they will survive\n\n"+

      "Controls :\n"+
      "You can create continuous generations with the play button, or a defined number the angle bracket button.\n"+
      "You can navigate between the generations by using the slider and/or the keyboard arrows.\n"+
      "You can sort the rockets of the generation by clicking on the sort button.\n"+
      "You can switch between the chart/simulation screen by clicking on the chart/home button.\n"+
      "You can see a rocket flight by clicking on it."
    )*/
    new ExternalPopup("./assets/html/help.html");
    });
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
      numberCurrentGenText.text = "Current generation : "+this._genRange.value;

    });

    this._disablables = [continuousGenButton,nGenButton,helpButton,genItem,genItem2];

    this.updateGen();

    genItem.addChild(this._genRange);
    genItem2.addChild(numberCurrentGenText);
    this.container.addChild(genItem);
    this.container.addChild(genItem2);
  }
  _addButton(icon,label,action){
    let item = new NavbarItem();
    let button = new IconButton(icon,label);
    button.on("click",()=>action(button));
    item.addChild(button);
    this.container.addChild(item);
    return button;
  }
  hideButtons(){
    for(let child of this._disablables) child.disabled = true;
  }
  showButtons(){
    for(let child of this._disablables) child.disabled = false;
  }
  updateGen(){
    this._genRange.max=this._app.generations.length;
    this._genRange.disabled = this._genRange.max<=this._genRange.min;
    if(this._genRange.value>=this._genRange.max){
      this._genRange.value = this._genRange.max;
      this._genRange.trigger("change");
    }
  }
}
