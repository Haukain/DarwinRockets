import { WorkerCommander } from "./WorkerCommander.js";
import { Generation } from "./Generation.js";
import { Configuration } from "./Configuration.js";
import { Rocket } from "./Rocket.js";
import { Reactor } from "./Reactor.js";
import { PhysicsComputer } from "./physics/PhysicsComputer.js";

 export class Trainer {
	constructor(worker){
		let that = this;
		this._continuousGeneration = false;
    this._remainingGenerations = 0;
		this._config = null;
		this._generation = null;
		this._com = new WorkerCommander(worker);
		this._com.addCommandListener("initTrainer",d=>{
      that._continuousGeneration = false;
      this._remainingGenerations = 0;
			that._generation = Generation.fromStructure(d.gen);
			this._config = Configuration.fromStructure(d.conf);
			for(let s of that._subWorkers) s.send("setConfig",d.conf)
			return this.evaluateGen(that._generation).then(s=>that._generation.toStructure());
		});
		this._com.addCommandListener("startGen",d=>{ // Command listener for the "play" button
			that.startContinuousGeneration();
		});
		this._com.addCommandListener("stopGen",d=>{ // Command Listener for the "pause" button
			that.stopContinuousGeneration();
		});
		this._com.addCommandListener("nGen",n=>{
			that.makeNGenerations(n);
		});
		this._com.addCommandListener("isRunning",d=>Promise.resolve(that._continuousGeneration||this._remainingGenerations>0));
		this._subWorkers = [];
		this._com.addCommandListener("addSubWorker",s=>{
			s.start();
			that._subWorkers.push(new WorkerCommander(s));
		});

	}

	async makeNewGen() { // New generation creation
		let oldGen = this.generation;
		//killing the old
		let survivors = this.applyNauralSelection(oldGen); // Keeping only top rocket
		//making the new
		let newGen = new Generation();
		for(let i=0;i<this._config.populationSize;i++){
			let p1 = survivors[Math.floor(Math.random()*survivors.length)]; // Selecting the parents at random
			let p2 = survivors[Math.floor(Math.random()*survivors.length)];
			newGen.addRocket(this.reproduce(p1,p2));  //Filling the new gen
		}
		//evaluate the generation
		await this.evaluateGen(newGen);
		this._generation=newGen;
		this._com.send("newGen",newGen.toStructure());
	}

	async evaluateGen(g) { // Evaluation of a generation on the field (made by the Evaluator Class)
		let trays = this._subWorkers.map(s=>[]);
		for(let i=0;i<g.rockets.length;i++){
			trays[i%trays.length].push(g.rockets[i]); // Letting worker do parallel evaluation
		}
		let promises = this._subWorkers.map(s=>s.send("evaluateGen",trays.pop().map(r=>r.toStructure()),true));
		let results = await Promise.all(promises);
		g.rockets = results.reduce((acc, val) => acc.concat(val), []).map(r=>Rocket.fromStructure(r));
		return true;
	}

	applyNauralSelection(g) { // Keep only the best rockets
		let selectedRockets = g.rockets.sort(function(a,b){
			return b.score - a.score;
		}).slice(0,Math.ceil(g.rockets.length/2)); // Keeping top half of the generation
		return selectedRockets;
	}

	reproduce(p1,p2) { // Take 2 parent rocket from the previous gen and make 1 child in the new gen
    // All the multiplication by parameters on every gene (reactor caracteristic) is the divergence of genes after the reproduction
		let baby = new Rocket();
		let parentWMostReactors = p1.reactors.length>p2.reactors.length?p1:p2;
		let reactorMean = Math.ceil( (p1.reactors.length+p2.reactors.length)/2 ) ;
		let reactorNumber = p1.reactors.length<p2.reactors.length?p1.reactors.length:p2.reactors.length;
		for(let i=0;i<reactorNumber;i++){ //Mean of genes (reactor caracteristics) on every reactor both parents have
			let position = {x:(p1.reactors[i].position.x/2+p2.reactors[i].position.x/2)
												*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor), //RandomDeviation
											y:(p1.reactors[i].position.y/2+p2.reactors[i].position.y/2)
												*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor)
			};
			let thrust = (p1.reactors[i].thrust/2 + p2.reactors[i].thrust/2)*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor);
			let activationTime = (p1.reactors[i].activationTime/2 + p2.reactors[i].activationTime/2)*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor);
			let extinctionTime = (p1.reactors[i].extinctionTime/2 + p2.reactors[i].extinctionTime/2)*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor);
			let angle = (p1.reactors[i].angle/2 + p2.reactors[i].angle/2)*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor);
			baby.addReactor(position, thrust, activationTime, extinctionTime, angle);
		}
		while(reactorNumber < reactorMean){ // Then keeping exact reactor that the parent with most reactor had until the mean of reactor between both parents
			let position = {x:parentWMostReactors.reactors[reactorNumber].position.x*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor),
											y:parentWMostReactors.reactors[reactorNumber].position.y*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor)};
			let thrust = parentWMostReactors.reactors[reactorNumber].thrust*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor);
			let activationTime = parentWMostReactors.reactors[reactorNumber].activationTime*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor);
			let extinctionTime = parentWMostReactors.reactors[reactorNumber].extinctionTime*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor);
			let angle = parentWMostReactors.reactors[reactorNumber].angle*(1+(Math.random()*2*this._config.reproductionParameters.geneDistributionDeviationFactor)-this._config.reproductionParameters.geneDistributionDeviationFactor);
			baby.addReactor(position, thrust, activationTime, extinctionTime, angle);
			reactorNumber += 1;
		}
		if ( Math.random()<this._config.reproductionParameters.newGeneAppearanceRate*(1 - 1/1/baby.reactors.length)){ // Probabilty of a reactor disappearing (increasing with the number of reactors)
			baby.parents.splice(Math.floor(Math.random()*baby.parents.length));
		}
		if ( Math.random()<this._config.reproductionParameters.newGeneAppearanceRate*(1/baby.reactors.length)){ // Probabilty of a reactor appearing  (decreasing with the number of reactors)
			baby.addReactor({x:Math.random()*20-10,y:Math.random()*40-20}, Math.random()*0.0001+0.0001, Math.random()*10, Math.random()*10, Math.random()*Math.PI*2-Math.PI);
		}
		/*baby.parents.push(p1);
		baby.parents.push(p2);*/
		return baby;
	}

	async startContinuousGeneration() {
		this._continuousGeneration = true;
    this._remainingGenerations = 0;
		while(this._continuousGeneration){
			await this.makeNewGen();
			await new Promise((res,rej)=>setTimeout(()=>res(),1));
		}
	}

	stopContinuousGeneration() {
		this._continuousGeneration = false;
    this._remainingGenerations = 0;
	}

	async makeNGenerations(n) {
    this._remainingGenerations = n;
		while(this._remainingGenerations>0){
			await this.makeNewGen();
      this._remainingGenerations--;
			await new Promise((res,rej)=>setTimeout(()=>res(),1));
		}
	}

	get config() {return this._config;}
	set config(config) {this._config = config;}

	get generation() {return this._generation;}

}
