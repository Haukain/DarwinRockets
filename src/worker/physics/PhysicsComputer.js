class PhysicsComputer {
	constructor(terrain,rockets, simDuration=300){
		this._simDuration = simDuration;
		this._rockets = rockets.map(r=>r.createPhysicsObject());
		this._obstacles = terrain.objects.map(r=>r.createPhysicsObject());
	}

	update() {}

	isEnded() {}

	get simDuration() {return this._simDuration;}// read only

	get rockets() {return this._rockets;}
	set rockets(rockets) {this._rockets = rockets;}
}
