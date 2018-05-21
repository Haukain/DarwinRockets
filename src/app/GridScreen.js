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
        for (let i of this._gen.rockets){
					let rank=null;
					if(i.score==max)rank="first";
					if(i.score==min)rank="last";
					if(i.score==-1)rank=null;
					this._constructRocket(i,rank);
				}

        //button to go on the chartScreen
        let chartButton = new FloatingButton("equalizer","Statistics",0);
        chartButton.on("click",()=>{
            this._app.goChart();
        });

        //button to order the grid by the score of rockets
        let orderButton = new FloatingButton("sort","Sort by score",1);
        orderButton.on("click",()=>{
            this._sortByScore();
        });

        //build the buttons
        let col = new Col(4,3,2,2);
        col.addChild(chartButton);
        col.addChild(orderButton);
        this._container.addChild(col);

    }
    _sortByScore(){

        /*let max = this._app.currentGeneration.getMax();
        let next = -10;
        let orderedIndexArray=[];
        let rockets=this._app.currentGeneration._rockets;
        let orderedRocketsArray = [];

        //find the index(es) of the max
        for(let i=0;i<rockets.length;i++){if(rockets[i].score==max){orderedIndexArray.push(i)};}

        //orderedIndexArray = array of indexes of rockets by score (higher to lower)
        for (let i=0;i<rockets.length;i++){
            for(let r of rockets){if (r.score<max && r.score>=next){next=r.score};}

            for(let i=0;i<rockets.length;i++){if (rockets[i].score==next){orderedIndexArray.push(i)};}
            max=next;
            next=-10;
        }

        //sort the list of rockets with the ordered indexes and re-load the grid
        for (let i=0;i<orderedIndexArray.length;i++){orderedRocketsArray[i]=rockets[orderedIndexArray[i]];}
        this._app.currentGeneration._rockets = orderedRocketsArray;*/
				this._gen.rockets=this._gen.rockets.sort((a,b)=>b.score-a.score);
        console.log(this._app.currentGeneration._rockets);
        this._app.goSimulation();
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
