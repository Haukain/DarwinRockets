import { PhysicsPlanet } from "./physics/PhysicsPlanet.js"
import { RoundTerrainObject } from "./RoundTerrainObject.js"

export class Planet extends RoundTerrainObject {
	static fromStructure(s){
		return new Planet(s.position,s.radius);
	}
	constructor(position, radius=30) {
		super(position,radius);
		this._fillStyle = '#bae1ff';
	}

	createPhysicsObject() {
		let physicsPlanet = new PhysicsPlanet(this._position, this._radius);
		return physicsPlanet;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this._fillStyle;
		ctx.arc(0,0,this._radius,0,2*Math.PI);
		ctx.fill();
	}
	toStructure(){
		return {
			type: this.constructor.name,
			position: {x:this._position.x,y:this._position.y},
			radius:this._radius
		}
	}

}
