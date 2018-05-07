import { WorkerCommander } from "./WorkerCommander.js";
import { Generation } from "./Generation.js";
import { Configuration } from "./Configuration.js";
import { Rocket } from "./Rocket.js";
import { Reactor } from "./Reactor.js";
import { Start } from "./Start.js";
import { End } from "./End.js";
import { PhysicsComputer } from "./physics/PhysicsComputer.js";
export class Trainer {
	constructor(worker){
		let that = this;
		this._continuousGeneration = false;
		this._config = null;
		this._generations = [];
		this._com = new WorkerCommander(self);
		this._com.addCommandListener("initTrainer",d=>{
			that._generations = [Generation.fromStructure(d.gen)];
			this._config = Configuration.fromStructure(d.conf);
			this.evaluateGen(that._generations[0])
		});
		this._com.addCommandListener("startGen",d=>{
			that.startContinuousGeneration();
		});
		this._com.addCommandListener("stopGen",d=>{
			that.stopContinuousGeneration();
		});
		this._com.addCommandListener("nGen",n=>{
			that.makeNGenerations(n);
		});
		this._com.addCommandListener("isRunning",d=>Promise.resolve(that.continuousGeneration()));
	}

	async makeNewGen() {
		let oldGen = this.generations[this.generations.length-1];
		//killing the old
		let survivors = this.applyNauralSelection(oldGen);
		//making the new
		let newGen = new Generation();
		for(let i=0;i<this._config.populationSize;i++){
			let p1 = survivors[Math.floor(Math.random()*survivors.length)];
			let p2 = survivors[Math.floor(Math.random()*survivors.length)];
			newGen.addRocket(this.reproduce(p1,p2));
		}
		//evaluate the generation
		this.evaluateGen(newGen);
		this.addGeneration(newGen);
		this._com.send("newGen",newGen.toStructure());
	}

	evaluateGen(g) {
		let startPos = this._config.terrain.objects.filter(o=>o instanceof Start)[0].position;
		let targetPos = this._config.terrain.objects.filter(o=>o instanceof End)[0].position;
		// console.log("start",startPos,"end:",targetPos);
		for(let r of g.rockets){
			let minDist = 9999999999;
			let topSpeed = 0; // TODO: code topSpeed
			let complexity = r.reactors.length;
			let completionTime = 0;
			let traveledDistance = 0;
			let engine = new PhysicsComputer(this._config.terrain,[r]);
			let prevPos = {x:engine.rockets[0].position.x,y:engine.rockets[0].position.y};
			while(minDist>30 && !engine.isEnded()){
				engine.update();
				let distTarget=Math.sqrt( Math.pow(engine.rockets[0].position.x-targetPos.x,2) + Math.pow(engine.rockets[0].position.y-targetPos.y,2) );
				if(!isNaN(distTarget))minDist = Math.min(distTarget,minDist);
				let delta=Math.sqrt( Math.pow(engine.rockets[0].position.x-prevPos.x,2) + Math.pow(engine.rockets[0].position.y-prevPos.y,2) );
				if(!isNaN(delta) && delta != Infinity)traveledDistance+=delta;
				prevPos = {x:engine.rockets[0].position.x,y:engine.rockets[0].position.y};
			}
			// console.log("mD :",minDist,"cT :", completionTime, "tD :",traveledDistance,"cplx :",complexity);
			completionTime = !isNaN(engine.time)?engine.time:engine.simDuration;
			r.score = this._config.fitnessFunction.compute(minDist, completionTime, traveledDistance, complexity);
			// console.log("rx :",engine.rockets[0].position.x,"ry :",engine.rockets[0].position.y);
			// console.log(r.score);
		}
		console.log("av score :",g.getAverageScore());
		return true;
	}

	applyNauralSelection(g) {
		// TODO: ajouter random
		let selectedRockets = g.rockets.sort(function(a,b){
			return b.score - a.score;
		}).slice(0,Math.ceil(g.rockets.length/2));
		return selectedRockets;
	}

	reproduce(p1,p2) {
		// TODO: Make the real reproduction
		let baby = new Rocket();
		// console.log(p1,p2);
		let parentWMostReactors = p1.reactors.length>p2.reactors.length?p1:p2;
		let reactorMean = Math.ceil( (p1.reactors.length+p2.reactors.length)/2 ) ;
		let reactorNumber = p1.reactors.length<p2.reactors.length?p1.reactors.length:p2.reactors.length;
		// console.log("parentWMostReactors :",parentWMostReactors,'reactorMean :',reactorMean,"reactorNumber:",reactorNumber);
		for(let i=0;i<reactorNumber;i++){
			let position = {x:p1.reactors[i].position.x/2+p2.reactors[i].position.x/2,y:p1.reactors[i].position.y/2+p2.reactors[i].position.y/2};
			let thrust = p1.reactors[i].thrust/2 + p2.reactors[i].thrust/2;
			let activationTime = p1.reactors[i].activationTime/2 + p2.reactors[i].activationTime/2;
			let extinctionTime = p1.reactors[i].extinctionTime/2 + p2.reactors[i].extinctionTime/2;
			let angle = p1.reactors[i].angle/2 + p2.reactors[i].angle/2;
			baby.addReactor(position, thrust, activationTime, extinctionTime, angle);
		}
		while(reactorNumber < reactorMean){
			let position = {x:parentWMostReactors.reactors[reactorNumber].position.x,y:parentWMostReactors.reactors[reactorNumber].position.y};
			let thrust = parentWMostReactors.reactors[reactorNumber].thrust;
			let activationTime = parentWMostReactors.reactors[reactorNumber].activationTime;
			let extinctionTime = parentWMostReactors.reactors[reactorNumber].extinctionTime;
			let angle = parentWMostReactors.reactors[reactorNumber].angle;
			baby.addReactor(position, thrust, activationTime, extinctionTime, angle);
			reactorNumber += 1;
		}
		if ( Math.random()<this._config.reproductionParameters.newGeneAppearanceRate/5 ){
			console.log(" - GENE");
			baby.parents.splice(Math.floor(Math.random()*baby.parents.length));
		}
		if ( Math.random()<this._config.reproductionParameters.newGeneAppearanceRate/5 ){
			console.log(" +  GENE");
			baby.addReactor({x:Math.random()*20-10,y:Math.random()*40-20}, Math.random()*0.0001+0.0001, Math.random()*10, Math.random()*10, Math.random()*Math.PI*2-Math.PI);
		}
		baby.parents.push(p1);
		baby.parents.push(p2);
		// console.log(baby);
		return baby;
	}

	async startContinuousGeneration() {
		this._continuousGeneration = true;
		while(this._continuousGeneration){
			await this.makeNewGen();
			await new Promise((res,rej)=>setTimeout(()=>res(),1));
		}
	}

	stopContinuousGeneration() {
		this._continuousGeneration = false;
	}

	async makeNGenerations(n) {
		for(let i=0;i<n;i++){
			await this.makeNewGen();
			await new Promise((res,rej)=>setTimeout(()=>res(),1));
		}
	}

	addGeneration(generation) {
		this._generations.push(generation);
	}

	get config() {return this._config;}
	set config(config) {this._config = config;}

	get generations() {return this._generations;}

}
