export class FitnessFunction {
	constructor(rdf, ctf, tdf, cf){
		this._remainingDistanceFactor = rdf;
		this._completionTimeFactor = ctf;
		this._traveledDistanceFactor = tdf;
		this._complexityFactor = cf;
	}

	compute(rd, ct, td, cx) {
		score = remainingDistanceFactor*rd + completionTimeFactor*ct + traveledDistanceFactor*td + complexityFactor*cx;
		return score;
	}
	get remainingDistanceFactor() {return this._remainingDistanceFactor;}
	set remainingDistanceFactor(rd) {this._remainingDistanceFactor = rd;}

	get completionTimeFactor() {return this._completionTimeFactor;}
	set completionTimeFactor(ct) {this._completionTimeFactor = ct;}

	get traveledDistanceFactor() {return this._traveledDistanceFactor;}
	set traveledDistanceFactor(td) {this._traveledDistanceFactor = td;}

	get complexityFactor() {return this._complexityFactor;}
	set complexityFactor(cx) {this._complexityFactor = cx;}
}
