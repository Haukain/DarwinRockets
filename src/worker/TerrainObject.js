class TerrainObject {
	constructor(attraction, position);
	this._attraction = attraction;
	this._position = position;

	testCollision(r) {}

	draw() {
		throw "La classe TerrainObject est abstraite"
	}

	get attraction() {return this._attraction;}
	setAttraction(attraction) {this._attraction = attraction;}

	get position() {return this._position;}
	setPosition(position) {this._position = position;}
}
