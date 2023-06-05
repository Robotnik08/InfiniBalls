import { Canvas } from "./exports/canvasHandler.js"
import { Colour } from "./exports/colour.js";
import { Vector2 } from "./exports/vector.js";
import { Vector3 } from "./exports/vector.js";
import { Enviroment } from "./exports/physics.js";
import * as env from "./exports/physics.js";
// canvasInit

const size = new Vector2(1000,1000);
const can = new Canvas(size);
can.addToDocument();

const tiltValue = new Vector3(0,0,0);
function requestPermissionForIOS() {
    window.DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response === 'granted') {
                document.getElementById("test-values").innerHTML = "granted!";
                window.addEventListener("deviceorientation", (event) => {
                    tiltValue.set(event.alpha,event.beta,event.gamma);
                });
            } else {
                document.getElementById("test-values").innerHTML = "denied!";
            }
        }).catch((e) => {
            console.error(e);
        })
}
if (window.DeviceOrientationEvent.requestPermission) document.getElementById("btn").addEventListener("click",requestPermissionForIOS);

const main = new Enviroment (size,new Vector2(0,0.1), 1);
function update () {
    main.draw(can);
    main.solvePhysics();
    //tilt
    main.gravity = new Vector2(tiltValue.z/250,tiltValue.y/250);
    requestAnimationFrame(update);
}
const amount = 100;
for (let i = 0; i < amount; i++) {
    main.addPoint(env.getPoint(env.getRandomPosition(size),new Colour(0,255,255,1),20,0.9,0));
    //main.addShape(env.getWheel(4,90,new Vector2(100,100),new Colour(0,0,0,1),1,0.9,0.5));
    //main.addShape(env.getRect(new Vector2(1000,1000),new Vector2(100,100),new Colour(0,0,0,1),499,100,0.9,0.5));
}
update();