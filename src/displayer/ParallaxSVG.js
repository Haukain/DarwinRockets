import { Widget } from "./Widget.js";

export class ParallaxSVG extends Widget{
  constructor(src,dist) {
    super();
    this._element.className = "parallaxContainer";
    this._makeParallax(src,dist);
  }
  async _makeParallax(src,dist){
				dist = dist||100;
        let el =this._innerElement;
				let text = await fetch(src).then(d=>d.text());
				el.innerHTML = text;
				let svg = el.children[0];
				svg.style.width = "100%";
				svg.style.position = "absolute";
				svg.style.top = "50%";
				svg.style.left = "50%";
				svg.style.transform = "translate(-50%,-50%)";
				let layers = Array.from(svg.children).filter(d=>d.tagName=="g");
				let size ={x:window.innerWidth,y:window.innerHeight/2};
				document.body.addEventListener("mousemove",e=>{
					let delta = {x:(e.clientX-size.x/2)/size.x*dist,y:(e.clientY-size.y/2)/size.y*dist};
					for(let i=0; i<layers.length; i++){
						layers[i].setAttribute('transform',`translate(${delta.x*(i+1)/(layers.length)},${delta.y*(i+1)/(layers.length)})`);
					}
				});
			}
}
