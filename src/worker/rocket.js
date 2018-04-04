class Rocket {
	constructor(physicsObject, dead);
	this.physicsObject = physicsObject;
	this.dead = dead;
	this.parents = [];
	this.reactors = [];

	draw() {}
}

addParents(parent) {
	this.parents.push(parent);
}

addReactors(reactor) {
	this.reactors.push(reactor);
}