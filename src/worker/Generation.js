import { Rocket } from "./Rocket.js"
export class Generation {
	constructor(random){
		this._rockets = [];
		if(random){
			for(let i=0;i<200;i++){
				this.addRocket(new Rocket(true));
			}
		}
	}

	getAverage() {}

	getMax() {}

	getMin() {}

	addRocket(rocket) {
		this._rockets.push(rocket);
	}

	get rockets() {return this._rockets;}

}
