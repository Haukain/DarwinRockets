export class Terrain {
	constructor(size){
		size = size||{width:1920,height:1080};
		this._size = size;
		this._objects = [];
	}
	testCollisions(r) {}

	addObject(object) {
		this._objects.push(object);
	}

	get size() {return this._size;}
	set size(size) {this._size = size;}

	get objects() {return this._objects;}
}
