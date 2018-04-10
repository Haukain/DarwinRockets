class FitnessFunction {
	constructor(rdf, ctf, tdf, cxf);
	this._remainingDistanceFactor = rdf;
	this._completionTimeFactor = ctf;
	this._traveledDistanceFactor = tdf;
	this._complexityFactor = cf;

	compute(rd, ct, td, cx) {
		score = remainingDistanceFactor*rd + completionTimeFactor*ct + traveledDistanceFactor*td + complexityFactor*cx;
		return score;
	}
}

get remainingDistanceFactor() {return this._remainingDistanceFactor;}
setRemainingDistanceFactor(rd) {this._remainingDistanceFactor = rd;}

get completionTimeFactor() {return this._completionTimeFactor;}
setCompletionTimeFactor(ct) {this._completionTimeFactor = ct;}

get traveledDistanceFactor() {return this._traveledDistanceFactor;}
setTraveledDistanceFactor(td) {this._traveledDistanceFactor = td;}

get complexityFactor() {return this._complexityFactor;}
setComplexityFactor(cx) {this._complexityFactor = cx;}
