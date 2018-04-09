import { Screen } from "./app/Screen.js";
import { App } from "./app/App.js";

let app = new App(document.body);
let screen = new Screen(app);
screen.destroy();
console.log(screen.container);