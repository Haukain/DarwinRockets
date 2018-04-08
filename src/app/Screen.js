import { Col } from "../displayer/Col.js";

export class Screen{

	constructor(visibility) {
    	this.container = new Col();
    	this.visible = visibility;
    }

    destroy(){
    	delete this.container;
    	console.log("destroyed")
    }

    update(){
    	console.log("updated")
    }

    set_visibility(bool){this.visible=bool;}
}
