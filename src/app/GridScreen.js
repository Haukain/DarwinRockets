import { Screen } from "../Screen.js";
import { RocketViewer } from "../displayer/RocketViewer.js";

export class GridScreen extends Screen{

	constructor(app, gen) {
        super(app);
        this._gen = gen;

        for (let i of this._gen.rockets){
            let rocketViewer = new RocketViewer(i);
            rocketViewer.on("click",()=>{
                this._app.displayRocket(i);
            });
        }
    }

}