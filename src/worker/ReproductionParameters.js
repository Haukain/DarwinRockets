class ReproductionParameters {
	constructor(ngar, gdd, rmr);
	this._newGeneAppearanceRate = ngar;
	this._geneDistributionDeviationFactor = gdd;
	this._randomMutationRate = rmr;
}

get newGeneAppearanceRate() {return this._newGeneAppearanceRate;}
setNewGeneAppearanceRate(ngar) {this._newGeneAppearanceRate = ngar;}

get geneDistributionDeviationFactor() {return this._geneDistributionDeviationFactor;}
setGeneDistributionDeviationFactor(gdd) {this._geneDistributionDeviationFactor = gdd;}

get randomMutationRate() {return this._randomMutationRate;}
setRandomMutationRate(rmr) {this._randomMutationRate = rmr;}
