import { Row } from "../displayer/Row.js";
import { Header } from "./Header.js";
import { StartScreen } from "./StartScreen.js";
import { EditScreen } from "./EditScreen.js";
import { GridScreen } from "./GridScreen.js";
import { ChartScreen } from "./ChartScreen.js";
import { RocketScreen } from "./RocketScreen.js";
import { PhysicsDisplayer } from "../displayer/PhysicsDisplayer.js";
import { Modal } from "../displayer/Modal.js";
import { Confirm } from "../dialogs/Confirm.js";
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
    for(let i=0;i<navigator.hardwareConcurrency;i++){
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
    else if(this._state == "gen") new Confirm("Are you sure you want to go back?","all the progress you made will be lost.",()=>this.goEdit());
    else if(this._state == "chart" || this._state == "rocket") this.goSimulation();
    else {
      let i =Array.from(history).reduce((a,b)=>a+(!!b.state.fake),0);
      history.back(-i);
    }
  }
  goStart(){
    this._currentScreen = new StartScreen(this);
    this._state = "start";
    this._configuration = new Configuration();
    this._header.hideButtons();
    history.pushState({fake: true},"Darwin Rockets","start.html");
  }
  goEdit(locked=false) {
    console.log("Going to the Edit Screen");
    this._currentScreen = new EditScreen(this,locked);
    this._state = "edit";
    this._currentGeneration = null;
    this._generations=[];
    this._header.hideButtons();
    this.stopGen();
    history.pushState({fake: true},"Edit config","edit.html");
  }
  goSimulation() {
    this._currentScreen = new GridScreen(this,this._currentGeneration);
    this._state = "gen";
    this._header.showButtons();
    history.pushState({fake: true},"Simulation screen","gen.html");
  }
  goChart() {
    console.log("Going to the Chart Screen");
    this._header.showButtons();
    this._currentScreen = new ChartScreen(this,this._currentGeneration);
    this._state = "chart";
    history.pushState({fake: true},"chart screen","chart.html");
  }
  goRocket(r) {
    if(!r)return;
    console.log("Going to the Rocket Screen");
    this._header.showButtons();
    this._currentScreen = new RocketScreen(this,r);
    this._state = "rocket";
    history.pushState({fake: true},"rocket screen","rocket.html");
  }
  //trainer interface
  async initTrainer(){
    let gen = Generation.random(this._configuration.populationSize,5);
    this._currentGeneration = Generation.fromStructure(await this._com.send("initTrainer",{gen:gen.toStructure(),conf:this._configuration.toStructure()},true));
    this._generations=[];
    this.addGeneration(this._currentGeneration);
    return true;
  }
  startGen() {
    console.log("Starting generation");
    this._com.send("startGen");
  }
  stopGen() {
    console.log("Stopping generation");
    this._com.send("stopGen");
  }
  isGenerating(){//Promise<boolean>
    return this._com.send("isRunning",null,true);
  }
  makeNGen(n) {
    console.log(`Making ${n} generation(s)`);
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
    this.goEdit(true);
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
