import { CanvasWidget } from "./canvaswidget.js";

export class ChartWidget extends CanvasWidget{
  constructor(bg,fg,options) {
    super(bg,fg);
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, options);
  }
}
