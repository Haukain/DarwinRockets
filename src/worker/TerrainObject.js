export class TerrainObject {
	static fromStructure(s){
		return new TerrainObject(s.position);
	}
	constructor(position){
		this._position = position||{x:0,y:0};
	}

	testCollision(r) {}

	draw(ctx) {
		throw "La classe TerrainObject est abstraite";
	}

	inHitBox(x,y){
		return false;
	}

	get position() {return this._position;}
	set position(position) {this._position = position;}

	toStructure(){
		return {
			type: this.constructor.name,
			position: this._position
		}
	}
}
