import { RoundPhysicsObject } from "./RoundPhysicsObject.js"
import { PhysicsRocket } from "./PhysicsRocket.js"

// Physic Object of the Planet
export class PhysicsPlanet extends RoundPhysicsObject{
	constructor(position,radius){
		super(position,radius);
		Matter.Body.setDensity(this._object,0.005);
		this._object.label = "planet";
	}

	update(time,objects){
		for(let rocket of objects.filter(o=>o instanceof PhysicsRocket)) this.applyGravitation(rocket);
	}

	applyGravitation(rocket){ // Applying gravitation on the rocket (attraction)
		let distanceSquared = Math.pow(this._object.position.x - rocket.object.position.x,2) + Math.pow(this._object.position.y - rocket.object.position.y,2) // Get distance between the body and the rocket
		let attractionForce = 0.005*(this._object.mass*rocket.object.mass)/(distanceSquared); // Attraction depends on the rocket mass and the planet/blackHole mass

		let beta = Math.atan2(this._object.position.y - rocket.object.position.y,this._object.position.x - rocket.object.position.x) // The angle in which applies the force
		Matter.Body.applyForce(rocket.object,{x:rocket.object.position.x,y:rocket.object.position.y},{x:Math.cos(beta)*attractionForce,y:Math.sin(beta)*attractionForce});
	}
}
