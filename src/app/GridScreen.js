import { Screen } from "./Screen.js";
import { RocketViewer } from "../displayer/RocketViewer.js";
import { Col } from "../displayer/Col.js";
import { FloatingButton } from "../displayer/FloatingButton.js";

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

        let floatingButton = new FloatingButton("equalizer","Écran des statistiques");
        floatingButton.on("click",()=>{
            this._app.goChart();
        });
        let col = new Col(3,2,1,1);
        col.addChild(floatingButton);
        this._container.addChild(col);


    }

}
