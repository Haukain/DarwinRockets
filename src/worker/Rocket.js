import { Reactor } from "./Reactor.js";
import { PhysicsRocket } from "./PhysicsRocket.js";

export class Rocket {
	constructor(){
		this._score = -1;
		this._parents = [];
		this._reactors = [];
		this._generation = null;

		this._startingPosition = {x:document.documentElement.clientWidth/2,y:document.documentElement.clientHeight*2/3}
		this._rocketBluePrint = Matter.Vertices.fromPath('-9 -20 -9 0 -7 15 -4 30 -3 33 -2 35 0 36 2 35 3 33 4 30 7 15 9 0 9 -20');
		this._rocketRender = {
		         fillStyle: '#85bce6',
		};
		this._reactorRender = {
		         fillStyle: '#d65b73',
		};

	}
	draw(ctx) {
		oneTimeRocket = this.createPhysicsObject();
		oneTimeRocket.drawOnce(ctx);
	}

	addReactor(position, thrust, activationTime, extinctionTime, angle) {
		this._reactors.push(new Reactor(position, thrust, activationTime, extinctionTime, angle));
	}

	set generation(generation) {
		this._generation = generation;
	}
	get generation(){return this._generation}

	createPhysicsObject() {
		let physicsRocket = new PhysicsRocket(this._rocketBluePrint,this._rocketRender);
		let reactors = [];
		for(let r of this._reactors){
			reactors.push(r.createPhysicsObject(this._rocketBluePrint,this._reactorRender));
		}
		physicsRocket.addPhysicsReactor(reactors);
		physicsRocket.setPosition(this._startingPosition);
		return physicsRocket
	}

	get parents() {return this._parents;}

	get reactors() {return this._reactors;}
}
