import { PhysicsRocket } from './PhysicsRocket.js';

export class PhysicsObstacle{
	constructor(rocket,position,radius){
		// if (new.target === PhysicsObstacle) {
	 //      throw new TypeError("PhysicsObstacle is an abstract class"); //Abstract error
	 //    }
		this._object;
		this.createObject(position,radius);
		this._rocket = rocket;
	}

	get object(){return this._object;}

	applyGravitation(){
		let distanceSquared = Math.pow(this._object.position.x - this._rocket.object.position.x,2) + Math.pow(this._object.position.y - this._rocket.object.position.y,2)
		let attractionForce = 0.0001*(this._object.mass*this._rocket.object.mass)/(distanceSquared);

		let beta = Math.atan2(this._object.position.y - this._rocket.object.position.y,this._object.position.x - this._rocket.object.position.x)
		Matter.Body.applyForce(this._rocket.object,{x:this._rocket.object.position.x,y:this._rocket.object.position.y},{x:Math.cos(beta)*attractionForce,y:Math.sin(beta)*attractionForce});
	}
}
