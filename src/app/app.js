import { Row } from "../displayer/row.js";
import { Header } from "./header.js";
export class App{
  constructor(el) {
    this.generations=[];
    this.container = new Row();
    el.appendChild(this.container.element);
    this._header = new Header(this);
    el.appendChild(this._header.container.element);
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
}
