class Configuration {
	constructor(comentary, populationSize);
	this._comentary = comentary;
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

getComentary() {return this._comentary;}
setComentary(comentary) {this._comentary = comentary;}

getPopulationSize() {return this._populationSize;}
setPopulationSize(populationSize) {this._populationSize = populationSize;}

getTerrain() {return this._terrain;}
setTerrain(terrain) {this._terrain = terrain;}

getReproductionParameters() {return this._reproductionParameters;}
setReproductionParameters(reproductionParameters) {this._reproductionParameters = reproductionParameters;}

getFitnessFunction() {return this._fitnessFunction;}
setFitnessFunction(fitnessFunction) {this._fitnessFunction = fitnessFunction;}
