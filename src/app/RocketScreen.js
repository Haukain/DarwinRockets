import { Screen } from "./Screen.js";
import { RocketViewer } from "../displayer/RocketViewer.js";
import { ReactorViewer } from "../displayer/ReactorViewer.js";
import { PhysicsDisplayer } from "../displayer/PhysicsDisplayer.js";
import { Row } from "../displayer/Row.js";
import { Col } from "../displayer/Col.js";
import { Card } from "../displayer/Card.js";
import { Title } from "../displayer/Title.js";
import { FloatingButton } from "../displayer/FloatingButton.js";
import { IconButton } from "../displayer/IconButton.js";

export class RocketScreen extends Screen{

	constructor(app, r) {
        super(app,"grey");
        this._rocket = r;
				//2 col structure
        let leftCol = new Col(12,12,6,6);
        let rightCol = new Col(12,12,6,6);
				this._container.addChild(leftCol);
				this._container.addChild(rightCol);
				//description Card
				let descCard = new Card("white","pink");
				leftCol.addChild(descCard);
				let descCardRow = new Row();
				descCard.addChild(descCardRow);
				let descCardViewerCol = new Col(5,5,5,5);
				let descCardTitleCol = new Col(5,5,5,5);
				let descCardReloadCol = new Col(1,1,1,1);
				descCardRow.addChild(descCardViewerCol);
				descCardRow.addChild(descCardTitleCol);
				descCardRow.addChild(descCardReloadCol);
				let descCardViewer = new RocketViewer(r,500,500);
				descCardViewerCol.addChild(descCardViewer);
				let descCardTitle1 = new Title(`Score: ${r.score.toFixed(4)}`);
				descCardTitleCol.addChild(descCardTitle1);
				let descCardTitle2 = new Title(`Reactors: ${r.reactors.length}`);
				descCardTitleCol.addChild(descCardTitle2);
				let descCardTitle3 = new Title(`Completion time: ${(r.completionTime*100).toFixed(1)} %`);
				descCardTitleCol.addChild(descCardTitle3);
				let descCardTitle4 = new Title(`Proximity to the Target: ${(r.remainingDistance*100).toFixed(1)} %`);
				descCardTitleCol.addChild(descCardTitle4);
				let descCardTitle5 = new Title(`Useful reactors: ${(r.complexity*100).toFixed(1)} %`);
				descCardTitleCol.addChild(descCardTitle5);

				let reloadButton = new IconButton("restore","Reload Simulation",1);
				reloadButton.on("click",()=>{this._app.goRocket(this._rocket)});
				descCardReloadCol.addChild(reloadButton);

				let reactorCard = new Card("white","pink");
				leftCol.addChild(reactorCard);
				let reactorCardRow = new Row();
				reactorCard.addChild(reactorCardRow);
				this._reactorViewers = r.reactors.map(r=>new ReactorViewer(r));
				let reactorCols = this._reactorViewers.map(r=>{let col = new Col(4,3,3,3);col.addChild(r);return col;});
				for(let r of reactorCols)reactorCardRow.addChild(r);

				//Simulation
				this._displayer = new PhysicsDisplayer(this._app.configuration.terrain,[r]);
				rightCol.addChild(this._displayer);

				//back button
				let floatingButton = new FloatingButton("home","Rockets",0);
        floatingButton.on("click",()=>{
        	this._app.goSimulation();
        });
        this._container.addChild(floatingButton);
				this._loop();
    }
		_loop(){
			for(let r of this._reactorViewers)r.time = this._displayer.time;
			if(this._container)requestAnimationFrame(()=>{this._loop();});//loop till destroyed
		}
}
