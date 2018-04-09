import { Screen } from "../Screen.js";
import { RocketViewer } from "../displayer/RocketViewer.js";

export class GridScreen extends Screen{

	constructor(app, gen) {
        super(app);
        this._gen = gen;
    }

    this.display(){
        let disp;
        for (var i in this._gen.rockets){
            
            //a finir
        }
    }

}