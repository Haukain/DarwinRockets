import { Row } from "../displayer/Row.js";
import { Header } from "./Header.js";
import { StartScreen } from "./StartScreen.js";
export class App{
  constructor(el) {
    this.generations=[];
    this._header = new Header(this);
    el.appendChild(this._header.container.element);
    this._container = new Row();
    el.appendChild(this._container._element);
    this._currentScreen = new StartScreen(this);
  }
  init() {}
  //go methods
  goBack() {
    console.log("going back");
  }
  goEdit() {
    console.log("going edit");
  }
  goSimulation() {
    console.log("going edit");
  }
  goChart() {
    console.log("going edit");
  }
  //trainer control
  startGen() {
    console.log("starting generation");
  }
  stopGen() {
    console.log("stopping generation");
  }
  makeNGen(n) {
    console.log(`making ${n}  generation`);
  }

  displayRocket(rocket){
    console.log(`displaying rocket`);
  }
  selectTutorial(t){
    console.log(`launching ${t.name}  generation`);
  }

  get container(){
    return this._container;
  }
  get _currentScreen(){
    return this.__currentScreen;
  }
  set _currentScreen(s){
    if(this.__currentScreen)this.__currentScreen.destroy();
    this.__currentScreen = s;
    this._container.addChild(this.__currentScreen.container);
  }
}
