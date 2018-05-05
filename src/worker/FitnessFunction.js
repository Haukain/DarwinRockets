export class FitnessFunction {
	static fromStructure(s){
		return new FitnessFunction(s.remainingDistanceFactor,s.completionTimeFactor,s.traveledDistanceFactor,s.complexityFactor);
	}
	constructor(rdf=0, ctf=0, tdf=0, cf=0){
		this._remainingDistanceFactor = rdf;
		this._completionTimeFactor = ctf;
		this._traveledDistanceFactor = tdf;
		this._complexityFactor = cf;
	}

	compute(rd, ct, td, cx) {
		return this._remainingDistanceFactor*rd
						+ this._completionTimeFactor*ct
						+ this._traveledDistanceFactor*td
						+ this._complexityFactor*(cx*10);
	}
	get remainingDistanceFactor() {return this._remainingDistanceFactor;}
	set remainingDistanceFactor(rd) {this._remainingDistanceFactor = rd;}

	get completionTimeFactor() {return this._completionTimeFactor;}
	set completionTimeFactor(ct) {this._completionTimeFactor = ct;}

	get traveledDistanceFactor() {return this._traveledDistanceFactor;}
	set traveledDistanceFactor(td) {this._traveledDistanceFactor = td;}

	get complexityFactor() {return this._complexityFactor;}
	set complexityFactor(cx) {this._complexityFactor = cx;}

	toStructure(){
		return {
			remainingDistanceFactor:this._remainingDistanceFactor,
			completionTimeFactor:this._completionTimeFactor,
			traveledDistanceFactor:this._traveledDistanceFactor,
			complexityFactor:this._complexityFactor,
		};
	}
}
