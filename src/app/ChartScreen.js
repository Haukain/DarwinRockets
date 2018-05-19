import { Screen } from "./Screen.js";
import { Col } from "../displayer/Col.js";
import { ChartWidget } from "../displayer/ChartWidget.js";
import { Row } from "../displayer/Row.js";
import { LineChartWidget } from "../displayer/LineChartWidget.js";
import { BarChartWidget } from "../displayer/BarChartWidget.js";
import { RadarChartWidget } from "../displayer/RadarChartWidget.js";
import { Generation } from "../worker/Generation.js";
import { FloatingButton } from "../displayer/FloatingButton.js";

export class ChartScreen extends Screen{
		constructor(app, gen) {
        super(app,"grey");
        this._gen = gen;

		let c1 = new Col(6,6,6,6);
		let c2 = new Col(6,6,6,6);
		let c3 = new Col(6,6,6,6);
		this._container.addChild(c1);
		this._container.addChild(c2);
		this._container.addChild(c3);


		//average score per generation chart
		let scoreChart = new LineChartWidget('white', 'grey');
		let maxDataset = scoreChart.addDataset("max score per generation","#97ddff","rgba(0,0,0,0)");
		let avgDataset = scoreChart.addDataset("Average score per generation","#0011FC","#C2C6FA55");
		let minDataset = scoreChart.addDataset("min score per generation","#ffa3c5","rgba(0,0,0,0)");
		let numberCurrentGen = 0;
		for(let gen of this._app.generations){numberCurrentGen++;if(gen == this._app.currentGeneration)break;}
		let nGen = 0;
		let nPointsOnXAxis = 30;
		let pitch = Math.floor(numberCurrentGen/nPointsOnXAxis);
		for(let gen of this._app.generations)console.log(gen.getAverageScore());
		for(let gen of this._app.generations){
			nGen++;
			//if(fiew generations, gen in pitch, gen is the current gen)
			if(numberCurrentGen<nPointsOnXAxis||nGen%pitch==0||gen == this._app.currentGeneration){
				scoreChart.addDataPoint(maxDataset,nGen,gen.getMax());
				scoreChart.addDataPoint(avgDataset,nGen,gen.getAverageScore());
				scoreChart.addDataPoint(minDataset,nGen,gen.getMin());
			}
			if(gen == this._app.currentGeneration)break;
		}

		c1.addChild(scoreChart);


		//radar chart : reste a coder les parametres proximity et speed
		let radarChart = new RadarChartWidget('white', 'grey',["Proximity to the target (1=target)","Speed","Complexity (number of reactors)"]);
		radarChart.addDataset("Current generation",randomColor(1),randomColor(.2),[1,0,this._app.generations[numberCurrentGen-1].getAverageReactors()]);
		if(numberCurrentGen!=1){radarChart.addDataset("Parent generation",randomColor(1),randomColor(.2),[Math.random(),Math.random(),this._app.generations[numberCurrentGen-2].getAverageReactors()]);}
		c2.addChild(radarChart);


		//score of the current generation bar chart
		let barChart = new BarChartWidget('white', 'grey');
		let dataset2 = barChart.addDataset("Number of rockets of the current generation per score","#0011FC","#C2C6FA");
		let max=precisionRound(this._app.currentGeneration.getMax(),1);
		let min=precisionRound(this._app.currentGeneration.getMin(),1);
		let interval = (max-min)/10;

		for(let i=min-(interval/2); i<max+(interval/2); i+=interval){
			if(i<0 && i+interval>0){
				barChart.addDataPoint(dataset2,"["+precisionRound(i,1)+";"+"0"+"]",this._app.currentGeneration.getInterval(i,0));
				barChart.addDataPoint(dataset2,"["+"0"+";"+precisionRound(i+interval,1)+"]",this._app.currentGeneration.getInterval(0,i+interval));
				i=i+interval;}
			barChart.addDataPoint(dataset2,"["+precisionRound(i,1)+";"+precisionRound(i+interval,1)+"]",this._app.currentGeneration.getInterval(i,i+interval));}

		c3.addChild(barChart);

		//bouton retour gridScreen
		let floatingButton = new FloatingButton("home","Rockets",0);
        floatingButton.on("click",()=>{
        this._app.goSimulation();
        });
        let col = new Col(3,2,1,1);
        col.addChild(floatingButton);
        this._container.addChild(col);
    }

}
function randomChar(){
  return Math.round(Math.random()*255);
}
function randomColor(a){
  return `rgba(${randomChar()},${randomChar()},${randomChar()},${a})`
}
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
