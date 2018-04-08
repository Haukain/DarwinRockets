class PhysicsComputer {
	constructor(realTime, simDuration);
	this._realTime = realTime;
	this._simDuration = simDuration;
	this._rockets = [];
	this._terrain = [];

	init() {}

	update() {}

	isEnded() {}
}

addRockets(rockets) {
	if (this._rockets.length >= 1) {return;}
	this._rockets.push(rockets);
}

addTerrain(terrain) {
	if (this._terrain.length >= 1) {return;}
	this._terrain.push(terrain);
}

getRealTime() {return this._realTime;}
setRealTime(realTime) {this._realTime = realTime;}

getSimDuration() {return this._simDuration;}
setSimDuration(simDuration) {this._simDuration = simDuration;}

getRockets() {return this._rockets;}
setRockets(rockets) {this._rockets = rockets;}

getTerrain() {return this._terrain;}
setTerrain(terrain) {this._terrain = terrain;}
