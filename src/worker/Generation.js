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

	getAverageScore() {
		let sum = 0;
		for(let r of this._rockets){sum += r.score;}
		let average = sum/this._rockets.length;
		return average;
	}

	getAverageReactors() {
		let sum = 0;
		let max = 0;
		for(let r of this._rockets){sum += r.reactors.length;if(max<r.reactors.length){max=r.reactors.length;}}
		let average = sum/this._rockets.length;
		return average/max;
	}

	getAverageRemainingDistance() {
		let sum = 0;
		for(let r of this._rockets){sum += Number(r.remainingDistance);}
		let average = sum/this._rockets.length;
		return average;
	}

	getAverageCompletionTime() {
		let sum = 0;
		for(let r of this._rockets){sum += Number(r.completionTime);}
		let average = sum/this._rockets.length;
		return average;
	}

	getInterval(score0,score1) {
		let number = 0;
		for(let r of this._rockets){if (r.score>=score0 && r.score<score1){number+=1}}
		return number;
	}

	getMax() {
		let max = -1000000;
		for(let r of this._rockets){if (r.score>max){max=r.score};}
		return max;
	}

	getMin(){
		let min = 1000000;
		for(let r of this._rockets){if (r.score<min){min=r.score};}
		return min;
	}

	addRocket(rocket) {
		this._rockets.push(rocket);
	}

	get rockets() {return this._rockets;}
	set rockets(r) {this._rockets=r}

	toStructure(){
		return {rockets:this._rockets.map(r=>r.toStructure())};
	}
}
