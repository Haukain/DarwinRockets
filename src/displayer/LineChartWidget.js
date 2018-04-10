import { ChartWidget } from "./ChartWidget.js";

export class LineChartWidget extends ChartWidget{
  constructor(bg,fg) {
    super(bg,fg,"line");
  }
  addDataPoint(dataset,data){
    if(this._chart.data.datasets[dataset].data.length>=this._chart.data.labels.length) this._chart.data.labels.push((this._chart.data.labels[this._chart.data.labels.length-1]||0)+1);
    this._chart.data.datasets[dataset].data.push(data);
    this._chart.update();
  }
}
