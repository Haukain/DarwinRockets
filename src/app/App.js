import { Row } from "../displayer/Row.js";
import { Header } from "./Header.js";
import { StartScreen } from "./StartScreen.js";
import { EditScreen } from "./EditScreen.js";
import { GridScreen } from "./GridScreen.js";
import { ChartScreen } from "./ChartScreen.js";
import { PhysicsDisplayer } from "../displayer/PhysicsDisplayer.js";
import { Modal } from "../displayer/Modal.js";
import { Generation } from "../worker/Generation.js";
import { Configuration } from "../worker/Configuration.js";
import { WorkerCommander } from "../worker/WorkerCommander.js";
import Worker from 'worker-loader!../worker/mainWorker.js';
import SubWorker from 'worker-loader!../worker/subWorker.js';
export class App{
  constructor(el) {
    this._DEBUG = true;
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
    this._subWorkers = [];
    for(let i=0;i<4;i++){
			let w = new SubWorker();
      let channel = new MessageChannel();
      let wc = new WorkerCommander(w);
      this._com.send("addSubWorker",channel.port1,false,true);
      wc.send("setWorker",channel.port2,false,true);
			this._subWorkers.push(w);
		}
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
    this._header.hideButtons();
    if(!this._DEBUG)history.pushState({fake: true},"Darwin Rockets","start.html");
  }
  goEdit() {
    this._currentScreen = new EditScreen(this);
    this._state = "edit";
    this._header.hideButtons();
    if(!this._DEBUG)history.pushState({fake: true},"Edit config","edit.html");
  }
  goSimulation() {
    this._currentScreen = new GridScreen(this,this._currentGeneration);
    this._state = "gen";
    this._header.showButtons();
    if(!this._DEBUG)history.pushState({fake: true},"Simulation screen","gen.html");
  }
  goChart() {
    console.log("going edit");
    this._header.showButtons();
    this._currentScreen = new ChartScreen(this,this._currentGeneration);
    this._state = "chart";
    this._header.showButtons();
    if(!this._DEBUG)history.pushState({fake: true},"chart screen","chart.html");
  }
  //trainer interface
  initTrainer(){
    let that = this;
    this._currentGeneration = Generation.random(this._configuration.populationSize,5);
    this._generations=[];
    this.addGeneration(this._currentGeneration);
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
  }

  displayRockets(rockets){
    let modal=new Modal();
    let displayer = new PhysicsDisplayer(this._configuration.terrain,rockets);
    modal.addChild(displayer);
    this._container.addChild(modal);
    modal.show();
  }
  selectTutorial(t){
    this._configuration = Configuration.fromStructure(t.config);
    /*this.initTrainer();
    this.goSimulation();*/
    this.goEdit();
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
  get configuration(){
    return this._configuration;
  }
  get state(){
    return this._state;
  }
  get _currentScreen(){
    return this.__currentScreen;
  }
  set _currentScreen(s){
    if(this.__currentScreen)this.__currentScreen.destroy();
    this.__currentScreen = s;
    this._container.addChild(this.__currentScreen.container);
  }
  get currentGeneration(){
    return this._currentGeneration;
  }
  get DEBUG(){return this._DEBUG;}
}
