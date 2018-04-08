import { CanvasWidget } from "./CanvasWidget.js";

export class ChartWidget extends CanvasWidget{
  constructor(bg,fg,type) {
    super(bg,fg);
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {type:type,data:{}});
    console.log(this.chart);
  }
  addDataset(label,borderColor,backgroundColor,data){
    data=data||[];
    this.chart.data.datasets.push({
      label:label,
      borderColor:borderColor,
      backgroundColor:backgroundColor,
      data:data
    });
    return this.chart.data.datasets.length-1;
  }
}
