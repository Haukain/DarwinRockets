import { Screen } from "./Screen.js";
import { RocketViewer } from "../displayer/RocketViewer.js";
import { Col } from "../displayer/Col.js";
import { FloatingButton } from "../displayer/FloatingButton.js";

export class GridScreen extends Screen{

	constructor(app, gen) {
        super(app,"grey");
        this._gen = gen;

        //build the grid
				const max = this._gen.getMax();
				const min = this._gen.getMin();
				this._sortByScore();
        for (let i of this._gen.rockets){
					let rank=null;
					if(i.score==max)rank="first";
					if(i.score==min)rank="last";
					if(i.score==0)rank=null;
					this._constructRocket(i,rank);
				}

        //button to go on the chartScreen
        let chartButton = new FloatingButton("equalizer","Statistics",0);
        chartButton.on("click",()=>{
            this._app.goChart();
        });

        //build the buttons
        let col = new Col(4,3,2,2);
        col.addChild(chartButton);
        this._container.addChild(col);
    }
    _sortByScore(){
				this._gen.rockets=this._gen.rockets.sort((a,b)=>b.score-a.score);
    }

    _constructRocket(i,rank){
        let rocketViewer = new RocketViewer(i);
        rocketViewer.on("click",()=>{
            this._app.displayRockets([i]);
        });
				if(rank)rocketViewer.rank=rank;
        let col = new Col(3,2,1,1);
        col.addChild(rocketViewer);
        this._container.addChild(col);
    }
}
