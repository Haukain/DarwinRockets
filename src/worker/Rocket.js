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
		let position = {x:document.documentElement.clientWidth/2,y:document.documentElement.clientHeight*2/3}
		let reactorDefinitions = [
      {position:{x:Math.random()*20-10,y:Math.random()*20-10},angle:Math.random()*3-1.5+Math.PI,thrust:0.0001*(Math.random()+1),activationTime:50*(20*Math.random()),extinctionTime:150*(Math.random()+1)},
      {position:{x:Math.random()*20-10,y:Math.random()*20-10},angle:Math.random()*3-1.5+Math.PI,thrust:0.0001*(Math.random()+1),activationTime:50*(20*Math.random()),extinctionTime:150*(Math.random()+1)},
      {position:{x:Math.random()*20-10,y:Math.random()*20-10},angle:Math.random()*3-1.5+Math.PI,thrust:0.0001*(Math.random()+1),activationTime:50*(20*Math.random()),extinctionTime:150*(Math.random()+1)},
      {position:{x:Math.random()*20-10,y:Math.random()*20-10},angle:Math.random()*3-1.5+Math.PI,thrust:0.0001*(Math.random()+1),activationTime:50*(20*Math.random()),extinctionTime:150*(Math.random()+1)},
    ];
		let rocketBluePrint = Matter.Vertices.fromPath('-9 -20 -9 0 -7 15 -4 30 -3 33 -2 35 0 36 2 35 3 33 4 30 7 15 9 0 9 -20');
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
