import { PhysicsRocket } from './PhysicsRocket.js';

export class PhysicsObstacle{
	constructor(position,radius){
		if (new.target === PhysicsObstacle) {
	      throw new TypeError("PhysicsObstacle is an abstract class"); //Abstract error
	    }
		this._position = position;
		this._radius = radius;
		this._object;
		this.createObject(position,radius);
	}

	get object(){return this._object;}
	get position(){return this._position;}
	get radius(){return this._radius;}

	applyGravitation(rocket){
		let distanceSquared = Math.pow(this._object.position.x - rocket.object.position.x,2) + Math.pow(this._object.position.y - rocket.object.position.y,2)
		let attractionForce = 0.005*(this._object.mass*rocket.object.mass)/(distanceSquared);

		let beta = Math.atan2(this._object.position.y - rocket.object.position.y,this._object.position.x - rocket.object.position.x)
		Matter.Body.applyForce(rocket.object,{x:rocket.object.position.x,y:rocket.object.position.y},{x:Math.cos(beta)*attractionForce,y:Math.sin(beta)*attractionForce});
	}
}
