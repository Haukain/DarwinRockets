import { Reactor } from "./Reactor.js";
import { PhysicsRocket } from "./PhysicsRocket.js";

export class Rocket {
	constructor(position, reactorDefinitions){
		this._physicsObject = new PhysicsRocket(rocketBluePrint,rocketRender,reactorRender,rocketInitialPosition,[
		    	{position:{x:Math.random()*15-8,y:Math.random()*40 -10},angle:Math.random()*3-1.5+Math.PI,thrust:0.00015*(Math.random()+1),capacity:300*Math.random()+150},
		    	{position:{x:Math.random()*15-8,y:Math.random()*40 -10},angle:Math.random()*3-1.5+Math.PI,thrust:0.00015*(Math.random()+1),capacity:300*Math.random()+150},
		    	{position:{x:Math.random()*15-8,y:Math.random()*40 -10},angle:Math.random()*3-1.5+Math.PI,thrust:0.00015*(Math.random()+1),capacity:300*Math.random()+150},
		    	{position:{x:Math.random()*15-8,y:Math.random()*40 -10},angle:Math.random()*3-1.5+Math.PI,thrust:0.00015*(Math.random()+1),capacity:300*Math.random()+150},
		]);
		this._score = -1;
		this._parents = [];
		this._reactors = [];
		this._generation = null;

		this._rocketBluePrint = Matter.Vertices.fromPath('-9 -20 -9 0 -7 15 -4 30 -3 33 -2 35 0 36 2 35 3 33 4 30 7 15 9 0 9 -20');
		this._rocketRender = {
		         fillStyle: '#d65b73',
		};
		this._reactorRender = {
		         fillStyle: '#913748',
		};

	}
	draw(ctx) {
		let oneTimeRocket = this.createPhysicsObject();
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
		return physicsRocket
	}

	get parents() {return this._parents;}

	get reactors() {return this._reactors;}
}
