class Rocket {
	constructor(physicsObject, dead);
	this._physicsObject = physicsObject;
	this._dead = dead;
	this._parents = [];
	this._reactors = [];
	this._generation = [];

	draw() {}
}

addParents(parentA, parentB) {
	this._parents.push(parentA);
	this._parents.push(parentB);
}

addReactors(physicsObject, position, thrust, activationTime, extinctionTime, angle) {
	this._reactors.push(physicsObject, position, thrust, activationTime, extinctionTime, angle);
}

addGeneration(generation) {
	if (this._generation.length >= 1) {return;}
	this._generation.push(generation);
}

get physicsObject() {return this._physicsObject;}
setPhysicsObject(physicsObject) {this._physicsObject = physicsObject;}

get status() {return this._dead;}
setStatus(status) {this._dead = status;}

get parents() {return this._parents;}
setParents(parents) {this._parents = parents;}

get reactors() {return this._reactors;}
setReactors(reactors) {this._reactors = reactors;}
