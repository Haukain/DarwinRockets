import { Reactor } from "./Reactor.js";
import { PhysicsRocket } from "./PhysicsRocket.js";

export class Rocket {
	static random(maxR){
		let r = new Rocket();
		let reac = Math.round(Math.random()*maxR);
		for(let i=0;i<reac;i++){
			r.addReactor({x:Math.random()*20-10,y:Math.random()*40-20}, Math.random()*0.0001+0.0001, Math.random()*10, Math.random()*10, Math.random()*Math.PI*2-Math.PI);
		}
		return r;
	}
	static fromStructure(s){
		let r = new Rocket();
		r.score = s.score;
		for(let re of s.reactors){
			r.addReactor(re.position,re.thrust,re.activationTime,re.extinctionTime,re.angle);
		}
		return r;
	}
	constructor(){
		this._score = -1;
		this._parents = [];
		this._reactors = [];

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
		oneTimeRocket.draw(ctx);
	}

	addReactor(position, thrust, activationTime, extinctionTime, angle) {
		this._reactors.push(new Reactor(position, thrust, activationTime, extinctionTime, angle));
	}

	createPhysicsObject() {
		let physicsRocket = new PhysicsRocket(this._rocketBluePrint,this._rocketRender);
		let reactors = [];
		for(let r of this._reactors){
			reactors.push(r.createPhysicsObject(this._rocketBluePrint,this._reactorRender));
		}
		physicsRocket.addPhysicsReactors(reactors);
		return physicsRocket
	}

	get parents() {return this._parents;}

	get reactors() {return this._reactors;}

	get score() {return this._score;}
	set score(s) {this._score=s;}
	toStructure(){
		let reactors = this._reactors.map(r=>r.toStructure());
		return {score:this._score,reactors:reactors};
	}
}
