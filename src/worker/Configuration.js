class Configuration {
	constructor(commentary, populationSize);
	this._commentary = commentary;
	this._populationSize = populationSize;
	this._terrain = [];
	this._reproductionParameters = [];
	this._fitnessFunction = [];
}

addTerrain(terrain) {
	if (this._terrain.length >= 1) {return;}
	this._terrain.push(terrain);
}

addReproductionParameters(reproductionParameters) {
	if (this._reproductionParameters.length >= 1) {return;}
	this._reproductionParameters.push(reproductionParameters);
}

addFitnessFunction(fitnessFunction) {
	if (this._fitnessFunction.length >= 1) {return;}
	this._fitnessFunction.push(fitnessFunction);
}

get commentary() {return this._commentary;}
setComentary(comentary) {this._commentary = commentary;}

get populationSize() {return this._populationSize;}
setPopulationSize(populationSize) {this._populationSize = populationSize;}

get terrain() {return this._terrain;}
setTerrain(terrain) {this._terrain = terrain;}

get reproductionParameters() {return this._reproductionParameters;}
setReproductionParameters(reproductionParameters) {this._reproductionParameters = reproductionParameters;}

get fitnessFunction() {return this._fitnessFunction;}
setFitnessFunction(fitnessFunction) {this._fitnessFunction = fitnessFunction;}
