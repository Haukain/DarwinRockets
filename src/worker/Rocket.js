import { Reactor } from "./Reactor.js";
import { PhysicsRocket } from "./PhysicsRocket.js";
export class Rocket {
	constructor(){
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

	createPhysicsObject() {
		let rocketBluePrint = Vertices.fromPath('-9 -20 -9 0 -7 15 -4 30 -3 33 -2 35 0 36 2 35 3 33 4 30 7 15 9 0 9 -20');
		let rocketRender = {
		         fillStyle: '#85bce6',
		         strokeStyle: 'invisible',
		         lineWidth: 0.2
		};
		let reactorRender = {
		         fillStyle: '#d65b73',
		         strokeStyle: 'invisible',
		         lineWidth: 0.2
		};
		return new PhysicsRocket(rocketBluePrint,rocketRender,reactorRender,position,reactorDefinitions);
	}

	get parents() {return this._parents;}

	get reactors() {return this._reactors;}
}
