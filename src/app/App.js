import { Row } from "../displayer/Row.js";
import { Header } from "./Header.js";
export class App{
  constructor(el) {
    this.generations=[];
    this._header = new Header(this);
    el.appendChild(this._header.container.element);
    this.container = new Row();
    el.appendChild(this.container._element);
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
}
