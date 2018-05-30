export class FitnessFunction {
	static fromStructure(s){
		return new FitnessFunction(s.remainingDistanceFactor,s.completionTimeFactor,s.complexityFactor);
	}
	constructor(rdf=0, ctf=0, cf=0){
		this._remainingDistanceFactor = rdf;
		this._completionTimeFactor = ctf;
		this._complexityFactor = cf;
	}

	compute(rd, ct, cx) { // Compute the score of a rocket (rd : remaingDistance, ct : CompletinTime, cx : complexityFactor)
		return (this._remainingDistanceFactor*rd
						+ this._completionTimeFactor*ct
						+ this._complexityFactor*cx )/3; //Weighted average : Each rocket gets a score between 0 and 1, 0 being the worst and 1 the best
	}
	get remainingDistanceFactor() {return this._remainingDistanceFactor;}
	set remainingDistanceFactor(rd) {this._remainingDistanceFactor = rd;}

	get completionTimeFactor() {return this._completionTimeFactor;}
	set completionTimeFactor(ct) {this._completionTimeFactor = ct;}

	get complexityFactor() {return this._complexityFactor;}
	set complexityFactor(cx) {this._complexityFactor = cx;}

	toStructure(){
		return {
			remainingDistanceFactor:this._remainingDistanceFactor,
			completionTimeFactor:this._completionTimeFactor,
			complexityFactor:this._complexityFactor,
		};
	}
}
