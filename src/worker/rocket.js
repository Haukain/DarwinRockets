class Rocket {
	constructor(physicsObject, dead);
	this._physicsObject = physicsObject;
	this._dead = dead;
	this._parents = [];
	this._reactors = [];

	draw() {}
}

addParents(parentA, parentB) {
	this._parents.push(parentA);
	this._parents.push(parentB);
}

addReactors(physicsObject, position, thrust, activationTime, extinctionTime, angle) {
	this._reactors.push(reactor);
}

getPhysicsObject() {return this._physicsObject;}
setPhysicsObject(physicsObject) {this._physicsObject = physicsObject;}

getStatus() {return this._dead;}
setStatus(status) {this._dead = status;}

getParents() {return this._parents;}
setParents(parents) {this._parents = parents;}

getReactors() {return this._reactors;}
setReactors(reactors) {this._reactors = reactors;}
