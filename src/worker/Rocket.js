export class Rocket {
	constructor(){
		this._physicsObject = null;
		this._score = -1;
		this._parents = [];
		this._reactors = [];
		this._generation = null;
	}
	draw(ctx) {}

	addReactor(physicsObject, position, thrust, activationTime, extinctionTime, angle) {
		this._reactors.push(new Reactor(physicsObject, position, thrust, activationTime, extinctionTime, angle));
	}

	set generation(generation) {
		this._generation = generation;
	}
	get generation(){return this._generation}

	get physicsObject() {return this._physicsObject;}
	createPhysicsObject() {
		this._physicsObject = new PhysicsRocket(blueprint,rocketRender,reactorRender,position,reactorDefinitions);
	}

	get parents() {return this._parents;}

	get reactors() {return this._reactors;}
}
