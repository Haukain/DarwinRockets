import { Rocket } from "./Rocket.js"
export class Generation {
	static random(size,maxR){
		let g = new Generation();
		for(let i=0;i<size;i++){
			g.addRocket(Rocket.random(maxR));
		}
		return g;
	}
	static fromStructure(s){
		let g = new Generation();
		for(let r of s.rockets){
			g.addRocket(Rocket.fromStructure(r));
		}
		return g;
	}
	constructor(){
		this._rockets = [];
	}

	getAverage() {
		let sum = 0;
		for(let r of this._rockets){sum += r.score;}
		let average = sum/this._rockets.length;
		return average;
	}

	getMax() {}

	getMin() {}

	addRocket(rocket) {
		this._rockets.push(rocket);
	}

	get rockets() {return this._rockets;}

	toStructure(){
		return {rockets:this._rockets.map(r=>r.toStructure())};
	}
}
