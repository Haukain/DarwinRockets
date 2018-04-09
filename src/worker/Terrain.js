class Terrain {
	constructor(size);
	this._size = size;
	this._objects = [];

	testCollisions(r) {}
}

addObjects(attraction, position) {
	this._objects.push(attraction, position);
}

get size() {return this._size;}
setSize(size) {this._size = size;}

get objects() {return this._objects;}
setObjects(objects) {this._objects = objects;}
