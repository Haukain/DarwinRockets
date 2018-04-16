export class ReproductionParameters {
	static fromStructure(s){
		return new ReproductionParameters(s.newGeneAppearanceRate,s.geneDistributionDeviationFactor,s.randomMutationRate);
	}
	constructor(ngar, gdd, rmr){
		this._newGeneAppearanceRate = ngar||0;
		this._geneDistributionDeviationFactor = gdd||0;
		this._randomMutationRate = rmr||0;
	}
	get newGeneAppearanceRate() {return this._newGeneAppearanceRate;}
	set newGeneAppearanceRate(ngar) {this._newGeneAppearanceRate = ngar;}

	get geneDistributionDeviationFactor() {return this._geneDistributionDeviationFactor;}
	set geneDistributionDeviationFactor(gdd) {this._geneDistributionDeviationFactor = gdd;}

	get randomMutationRate() {return this._randomMutationRate;}
	set randomMutationRate(rmr) {this._randomMutationRate = rmr;}

	toStructure(){
		return {
			newGeneAppearanceRate:this._newGeneAppearanceRate,
			geneDistributionDeviationFactor:this._geneDistributionDeviationFactor,
			randomMutationRate:this._randomMutationRate,
		};
	}
}
