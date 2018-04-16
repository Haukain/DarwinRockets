import { PhysicsReactor } from "./PhysicsReactor.js"

export class Reactor {
	constructor(position, thrust, activationTime, extinctionTime, angle){
		this._position = position;
		this._thrust = thrust;
		this._activationTime = activationTime;
		this._extinctionTime = extinctionTime;
		this._angle = angle;
	}

	draw() {}

	createPhysicsObject(blueprint,reactorRender) {
		return new PhysicsReactor(blueprint,reactorRender,this._position,this._thrust,this._activationTime,this._extinctionTime,this._angle)
	}

	get position() {return this._position;}

	get thrust() {return this._thrust;}

	get activationTime() {return this._activationTime;}

	get extinctionTime() {return this._extinctionTime;}

	get angle() {return this._angle;}

	toStructure(){
		return {
			position:{x:this._position.x,y:this._position.y},
			thrust:this._thrust,
			activationTime:this._activationTime,
			extinctionTime:this._extinctionTime,
			angle:this._angle
		};
	}
}
