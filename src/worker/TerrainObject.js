export class TerrainObject {
	static fromStructure(s){
		return new TerrainObject(s.position);
	}
	constructor(position={x:0,y:0}){
		this._position = position;
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
			position: {x:this._position.x,y:this._position.y}
		}
	}
}
