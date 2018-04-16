import { Screen } from "./Screen.js";
import { RocketViewer } from "../displayer/RocketViewer.js";
import { Col } from "../displayer/Col.js";

export class GridScreen extends Screen{

	constructor(app, gen) {
        super(app,"grey");
        this._gen = gen;

        for (let i of this._gen.rockets){
            let rocketViewer = new RocketViewer(i);
            rocketViewer.on("click",()=>{
                this._app.displayRocket(i);
            });
            let col = new Col(3,2,1,1);
            col.addChild(rocketViewer);
            this._container.addChild(col);
        }

    }

}
