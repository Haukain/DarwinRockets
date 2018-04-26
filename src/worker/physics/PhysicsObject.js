import { PhysicsRocket } from './PhysicsRocket.js';

export class PhysicsObject{
	constructor(position){
		if (new.target === PhysicsObject) {
	      throw new TypeError("PhysicsObject is an abstract class"); //Abstract error
	    }
		this._basePosition = position;
		this._object;
	}

	createObject(position,radius) {throw new Error("this is an abstract method")}
	update(time,objects) {}

	get object(){return this._object;}
	get position(){return this._object.position;}

}
