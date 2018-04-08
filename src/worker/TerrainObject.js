class TerrainObject {
	constructor(attraction, position);
	this._attraction = attraction;
	this._position = position;

	testCollision(r) {}

	draw() {
		throw "La classe TerrainObject est abstraite"
	}
}

getAttraction() {return this._attraction;}
setAttraction(attraction) {this._attraction = attraction;}

getPosition() {return this._position;}
setPosition(position) {this._position = position;}
