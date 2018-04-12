export class Generation {
	constructor(){
		this._rockets = [];
	}

	getAverage() {}

	getMax() {}

	getMin() {}

	addRocket(rocket) {
		this._rockets.push(rocket);
	}

	get rockets() {return this._rockets;}

}
