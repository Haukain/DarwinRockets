export class Reactor {
	constructor(position, thrust, activationTime, extinctionTime, angle){
		this._position = position;
		this._thrust = thrust;
		this._activationTime = activationTime;
		this._extinctionTime = extinctionTime;
		this._angle = angle;
	}

	draw() {}

	createPhysicsObject(physicsObject) {
		
	}

	get position() {return this._position;}

	get thrust() {return this._thrust;}

	get activationTime() {return this._activationTime;}

	get extinctionTime() {return this._extinctionTime;}

	get angle() {return this._angle;}
}
