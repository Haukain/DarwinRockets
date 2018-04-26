class PhysicsComputer {
	constructor(terrain,rockets,realTime=true, simDuration=300){
		this._realTime = realTime;
		this._simDuration = simDuration;
		this._rockets = rockets.map(r=>r.createPhysicsObject());
		this._obstacles = terrain.objects.map(r=>r.createPhysicsObject());
	}

	update() {}

	isEnded() {}

	get realTime() {return this._realTime;}//read only

	get simDuration() {return this._simDuration;}// read only

	get rockets() {return this._rockets;}
	set rockets(rockets) {this._rockets = rockets;}
}
