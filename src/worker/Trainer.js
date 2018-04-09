class Trainer() {
	constructor(continuousGeneration);
	this._continuousGeneration = continousGeneration;
	this._config = [];
	this._physicsComputer = [];
	this._generation = [];

	makeNewGen() {}

	evaluateGen(g) {}

	applyNauralSelection(g) {}

	reproduce(p1,p2) {}

	startContinuousGeneration() {}

	stopContinuousGeneration() {}

	makeNGenerations(n) {}
}

addConfig(config) {
	if (this._config.length >= 1) {return;}
	this._config.push(config);
}

addPhysicsComputer(physicsComputer) {
	if (this._physicsComputer.length >= 1) {return;}
	this._physicsComputer.push(physicsComputer);
}

addGeneration(generation) {
	this._generation.push(generation);
}

get continuousGeneration() {return this._continuousGeneration;}
setContinousGeneration(continousGeneration) {this._continuousGeneration = continuousGeneration;}

get config() {return this._config;}
setConfig(config) {this._config = config;}

get physicsComputer() {return this._physicsComputer;}
setPhysicsComputer(physicsComputer) {this._physicsComputer = physicsComputer;}

get generation() {return this._generation;}
setGeneration(generation) {this._generation = generation;}
