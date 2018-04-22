export class TerrainObject {
	constructor(attraction, position){
		this._attraction = attraction||0;
		this._position = position||{x:0,y:0};
	}

	testCollision(r) {}

	draw(ctx) {
		throw "La classe TerrainObject est abstraite";
	}

	inHitBox(x,y){
		return false;
	}

	get attraction() {return this._attraction;}
	setAttraction(attraction) {this._attraction = attraction;}

	get position() {return this._position;}
	set position(position) {this._position = position;}
}
