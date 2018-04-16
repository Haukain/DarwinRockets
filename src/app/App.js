import { Row } from "../displayer/Row.js";
import { Header } from "./Header.js";
import { StartScreen } from "./StartScreen.js";
import { EditScreen } from "./EditScreen.js";
import { GridScreen } from "./GridScreen.js";
import { Generation } from "../worker/Generation.js";
import { Configuration } from "../worker/Configuration.js";
import { WorkerCommander } from "../worker/WorkerCommander.js";
import Worker from 'worker-loader!../worker/Worker.js';
export class App{
  constructor(el) {
    let that = this;
    this._generations=[];
    this._header = new Header(this);
    el.appendChild(this._header.container.element);
    this._container = new Row();
    el.appendChild(this._container._element);
    //Worker
    this._worker = new Worker();
    this._com = new WorkerCommander(this._worker);
    this._com.addCommandListener("newGen",g=>{
			that.addGeneration(Generation.fromStructure(g));
		});
    //generations
    this._currentGeneration = null;
    this._generations=[];
    //configuration
    this._configuration = new Configuration();
    //screens
    window.onpopstate= e=>{
      that.goBack();
      e.preventDefault();
      return false;
    };
    this.goStart();
  }
  init() {}
  //go methods
  goBack() {
    if     (this._state == "edit") this.goStart();
    else if(this._state == "gen") this.goEdit();
    else if(this._state == "chart" || this._state == "display") this.goSimulation();
    else {
      let i =Array.from(history).reduce((a,b)=>a+(!!b.state.fake),0); // TODO: repair the history back out of site feature
      history.back(-i);
    }
  }
  goStart(){
    this._currentScreen = new StartScreen(this);
    this._state = "start";
    history.pushState({fake: true},"Darwin Rockets","start.html");
  }
  goEdit() {
    this._currentScreen = new EditScreen(this);
    this._state = "edit";
    history.pushState({fake: true},"Edit config","edit.html");
  }
  goSimulation() {
    this._currentScreen = new GridScreen(this,this._currentGeneration);
    this._state = "gen";
    history.pushState({fake: true},"Simulation screen","gen.html");
  }
  goChart() {
    console.log("going edit");
  }
  //trainer interface
  initTrainer(){
    let that = this;
    this._currentGeneration = Generation.random(this._configuration.populationSize,5);
    this._generations=[this._currentGeneration];
    this._com.send("initTrainer",{gen:that._generations[0].toStructure(),conf:this._configuration.toStructure()});
  }
  startGen() {
    console.log("starting generation");
    this._com.send("startGen");
  }
  stopGen() {
    console.log("stopping generation");
    this._com.send("stopGen");
  }
  makeNGen(n) {
    console.log(`making ${n}  generation`);
    this._com.send("nGen",n);
  }
  trainerRunning(){//return Promise<boolean>
    return com.send("isRunning",null,true)
  }
  //other methods
  addGeneration(gen){
    this._generations.push(gen);
    this._header.updateGen();
    console.log(this._generations);
  }

  displayRocket(rocket){
    console.log(`displaying rocket`);
  }
  selectTutorial(t){
    this._configuration = new Configuration(tutorial.config);
    this._initTrainer();
    this.goSimulation();
  }
  selectGeneration(gen){
    this._currentGeneration = gen;
    if(this._state == "gen") this.goSimulation();
    if(this._state == "chart") this.goChart();
  }

  get generations(){return this._generations}
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
