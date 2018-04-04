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

getPhysicsObject() {return this._physicsObject;}
setPhysicsObject(physicsObject) {this._physicsObject = physicsObject;}

getPosition() {return this._position;}
setPosition(position) {this._position = position;}

getThrust() {return this._thrust;}
setThrust(thrust) {this._thrust = thrust;}

getActivationTime() {return this._activationTime;}
setActivationTime(activationTime) {this._activationTime = activationTime;}

getExtinctionTime() {return this._extinctionTime;}
setExtinctionTime(extinctionTime) {this._extinctionTime = extinctionTime;}

getAngle() {return this._angle;}
setAngle(angle) {this._angle = angle;}
