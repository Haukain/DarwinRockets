export class ReproductionParameters {
	static fromStructure(s){
		return new ReproductionParameters(s.newGeneAppearanceRate,s.geneDistributionDeviationFactor);
	}
	constructor(ngar, gdd){
		this._newGeneAppearanceRate = ngar||0;
		this._geneDistributionDeviationFactor = gdd||0;
	}

	get newGeneAppearanceRate() {return this._newGeneAppearanceRate;}
	set newGeneAppearanceRate(ngar) {this._newGeneAppearanceRate = ngar;}

	get geneDistributionDeviationFactor() {return this._geneDistributionDeviationFactor;}
	set geneDistributionDeviationFactor(gdd) {this._geneDistributionDeviationFactor = gdd;}


	toStructure(){
		return {
			newGeneAppearanceRate:this._newGeneAppearanceRate,
			geneDistributionDeviationFactor:this._geneDistributionDeviationFactor,
		};
	}
}
