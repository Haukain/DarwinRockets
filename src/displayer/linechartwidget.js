import { ChartWidget } from "./chartwidget.js";

export class LineChartWidget extends ChartWidget{
  constructor(bg,fg) {
    super(bg,fg,"line");
  }
  addDataPoint(dataset,data){
    if(this.chart.data.datasets[dataset].data.length>=this.chart.data.labels.length) this.chart.data.labels.push((this.chart.data.labels[this.chart.data.labels.length-1]||0)+1);
    this.chart.data.datasets[dataset].data.push(data);
    this.chart.update();
  }
}
