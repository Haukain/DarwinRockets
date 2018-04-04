import { CanvasWidget } from "./canvaswidget.js";

export class ChartWidget extends CanvasWidget{
  constructor(bg,fg,type,data) {
    super(bg,fg);
    this.type = type;
    this.data = data;
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {type : this.type, data : this.data});
  }


}

