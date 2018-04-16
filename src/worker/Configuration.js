import { Terrain } from "./Terrain.js";
import { ReproductionParameters } from "./ReproductionParameters.js";
import { FitnessFunction } from "./FitnessFunction.js";
export class Configuration {
	static fromStructure(s){
		let c = new Configuration();
		c._commentary = s.commentary||c._commentary;
		c._populationSize = s.populationSize||c._populationSize;
		c._terrain = s.terrain?Terrain.fromStructure(s.terrain):c._terrain;
		c._reproductionParameters = s.reproductionParameters?ReproductionParameters.fromStructure(s.reproductionParameters):c._reproductionParameters;
		c._fitnessFunction = s.fitnessFunction?FitnessFunction.fromStructure(s.fitnessFunction):c._fitnessFunction;
		return c;
	}
	constructor(){
		this._commentary = "";
		this._populationSize = 100;
		this._terrain = new Terrain();
		this._reproductionParameters = new ReproductionParameters();
		this._fitnessFunction = new FitnessFunction();
	}

	get commentary() {return this._commentary;}
	set comentary(comentary) {this._commentary = commentary;}

	get populationSize() {return this._populationSize;}
	set populationSize(populationSize) {this._populationSize = populationSize;}

	get terrain() {return this._terrain;}

	get reproductionParameters() {return this._reproductionParameters;}

	get fitnessFunction() {return this._fitnessFunction;}

	toStructure(){
		return {
			commentary:this._commentary,
			populationSize:this._populationSize,
			terrain:this._terrain.toStructure(),
			reproductionParameters:this._reproductionParameters.toStructure(),
			fitnessFunction:this._fitnessFunction.toStructure(),
		};
	}
}
