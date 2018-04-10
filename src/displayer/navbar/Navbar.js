import { Widget } from "../Widget.js";

export class Navbar extends Widget{
  constructor(logoSrc) {
    super();
    this._element.className = "navbar navbar-expand-lg navbar-light bg-light bd-navbar";

    //id random string to avoid id reuse
    let uid = ""+Math.round(Math.random()*100000);
    //the logo
    let logoA = document.createElement("A");
    logoA.className = "navbar-brand";
    this._element.appendChild(logoA);
    let logoImg = new Image();
    logoImg.src = logoSrc;
    logoImg.width = 30;
    logoImg.height = 30;
    logoA.appendChild(logoImg);
    //responsive menu button
    let respButton = document.createElement("BUTTON");
    respButton.className = "navbar-toggler";
    respButton.dataset.toggle = "collapse";
    respButton.dataset.target = `#nsc-${uid}`;
    this._element.appendChild(respButton);
    //responsive menu
    let collapsibleDiv = document.createElement("DIV");
    collapsibleDiv.className = "collapse navbar-collapse";
    collapsibleDiv.id = `nsc-${uid}`;
    this._element.appendChild(collapsibleDiv);
    this._innerElement = document.createElement("UL");
    this._innerElement.className = "navbar-nav mr-auto";
    collapsibleDiv.appendChild(this._innerElement);
  }
}
