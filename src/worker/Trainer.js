import { WorkerCommander } from "./WorkerCommander.js";
import { Generation } from "./Generation.js";
import { Configuration } from "./Configuration.js";
import { Rocket } from "./Rocket.js";
import { Reactor } from "./Reactor.js";
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
		await this.evaluateGen(newGen);
		this.addGeneration(newGen);
		this._com.send("newGen",newGen.toStructure());
	}

	async evaluateGen(g) {}

	applyNauralSelection(g) {
		// TODO: make it real
		return g.rockets;
	}

	reproduce(p1,p2) {
		// TODO: Make the real reproduction
		let baby = new Rocket();
		let reactorNumber = p1.reactors.length<p2.reactors.length?p1.reactors.length:p2.reactors.length;
		for(let i=0;i<reactorNumber;i++){
			let position = {x:p1.reactors[i].position.x/2+p2.reactors[i].position.x/2,y:p1.reactors[i].position.y/2+p2.reactors[i].position.y/2};
			let thrust = p1.reactors[i].thrust/2 + p2.reactors[i].thrust/2;
			let activationTime = p1.reactors[i].activationTime/2 + p2.reactors[i].activationTime/2;
			let extinctionTime = p1.reactors[i].extinctionTime/2 + p2.reactors[i].extinctionTime/2;
			let angle = p1.reactors[i].angle/2 + p2.reactors[i].angle/2;
			baby.addReactor(position, thrust, activationTime, extinctionTime, angle);
		}
		baby.parents.push(p1);
		baby.parents.push(p2);
		return baby;
	}

	startContinuousGeneration() {
		this._continuousGeneration = true;
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
