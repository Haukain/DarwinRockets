class Generation {
	constructor();
	this._rockets = [];

	getAverage() {}

	getMax() {}

	getMin() {}
}

addRockets(rockets) {
	this._rockets.push(rockets);
}

get rockets() {return this._rockets;}
setRockets(rockets) {this.rockets = rockets;}
