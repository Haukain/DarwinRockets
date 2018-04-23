import { Start } from './Start.js';
import { End } from './End.js';
import { Planet } from './Planet.js';
import { BlackHole } from './BlackHole.js';


let constructors={
	"Start":Start,
	"End":End,
	"Planet":Planet,
	"BlackHole":BlackHole
}
export class Terrain {
	static fromStructure(s){
		let t=new Terrain(s.size);
		for(let object of s.objects){
			t.addObject(constructors[object.type].fromStructure(s));
		}
		return t;
	}
	constructor(size){
		size = size||{width:1920,height:1080};
		this._size = size;
		this._objects = [];
	}
	isValid() {
		let startNumber = 0;
		let endNumber = 0;
		for(let object of this._objects){
			if(object instanceof Start) startNumber++;
			if(object instanceof End) endNumber++;
		}
		return startNumber==1 && endNumber==1;
	}

	addObject(object) {
		this._objects.push(object);
	}

	get size() {return this._size;}
	set size(size) {this._size = size;}

	get objects() {return this._objects;}

	toStructure(){
		return {
			size:this._size,
			objects:this._objects.map(o=>o.toStructure())
		};
	}
}
