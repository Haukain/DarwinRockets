import { Card } from "./canvaswidget.js";

export class Chart extends CanvasWidget{
  constructor(bg,fg,type,data) {
    super(bg,fg);
    this.type = type;
    this.data = data;
  }
}