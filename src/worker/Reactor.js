class Reactor {
	constructor(physicsObject, position, thrust, activationTime, extinctionTime, angle);
	this._physicsObject = physicsObject;
	this._position = position;
	this._thrust = thrust;
	this._activationTime = activationTime;
	this._extinctionTime = extinctionTime;
	this._angle = angle;

	draw() {}
}

get physicsObject() {return this._physicsObject;}
setPhysicsObject(physicsObject) {this._physicsObject = physicsObject;}

get position() {return this._position;}
setPosition(position) {this._position = position;}

get thrust() {return this._thrust;}
setThrust(thrust) {this._thrust = thrust;}

get activationTime() {return this._activationTime;}
setActivationTime(activationTime) {this._activationTime = activationTime;}

get extinctionTime() {return this._extinctionTime;}
setExtinctionTime(extinctionTime) {this._extinctionTime = extinctionTime;}

get angle() {return this._angle;}
setAngle(angle) {this._angle = angle;}
