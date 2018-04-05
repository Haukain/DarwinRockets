import { ChartWidget } from "./chartwidget.js";

export class RadarChartWidget extends ChartWidget{
  constructor(bg,fg,labels) {
    super(bg,fg,"radar");
    this.chart.data.labels=labels;
  }
}
