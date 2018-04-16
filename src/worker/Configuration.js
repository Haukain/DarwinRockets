import { Terrain } from "./Terrain.js";
import { ReproductionParameters } from "./ReproductionParameters.js";
import { FitnessFunction } from "./FitnessFunction.js";
export class Configuration {
	constructor(tutorial){
		this._commentary = "";
		this._populationSize = 100;
		this._terrain = new Terrain();
		this._reproductionParameters = new ReproductionParameters();
		this._fitnessFunction = new FitnessFunction();
		if(tutorial){
			this._commentary = tutorial.commentary||this._commentary;
			this._populationSize = tutorial.populationSize||this._populationSize;
			this._terrain = tutorial.terrain?new Terrain(tutorial.terrain):this._terrain;
			this._reproductionParameters = tutorial.reproductionParameters?new ReproductionParameters(tutorial.reproductionParameters):this._reproductionParameters;
			this._fitnessFunction = tutorial.fitnessFunction?new FitnessFunction(tutorial.fitnessFunction):this._fitnessFunction;
		}
	}

	get commentary() {return this._commentary;}
	set comentary(comentary) {this._commentary = commentary;}

	get populationSize() {return this._populationSize;}
	set populationSize(populationSize) {this._populationSize = populationSize;}

	get terrain() {return this._terrain;}

	get reproductionParameters() {return this._reproductionParameters;}

	get fitnessFunction() {return this._fitnessFunction;}
}
