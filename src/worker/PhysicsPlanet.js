import { PhysicsObstacle } from "./PhysicsObstacle.js"

export class PhysicsPlanet extends PhysicsObstacle{
	constructor(position,radius){
		super(position,radius);
	}
	
		this._object = Matter.Bodies.circle(position.x,position.y,radius,{isStatic : true})
		Matter.Body.setDensity(this._object,0.005);
		this._object.label = "planet";
	}
}
