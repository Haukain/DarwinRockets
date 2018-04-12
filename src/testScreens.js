import { Screen } from "./app/Screen.js";
import { App } from "./app/App.js";
import { GridScreen } from "./app/GridScreen.js";
import { StartScreen } from "./app/StartScreen.js";
import { Generation } from "./worker/Generation.js";
import { Rocket } from "./worker/Rocket.js";

let app = new App(document.body);
let screen = new Screen(app);
screen.destroy();
console.log(screen.container);


let dummyGen = new Generation();
for(let i=0;i<100;i++)dummyGen.addRocket(new Rocket());
let gridscreen = new GridScreen(app,dummyGen);
app.container.addChild(gridscreen.container);
let startScreen = new StartScreen(app);
app.container.addChild(startScreen.container);
