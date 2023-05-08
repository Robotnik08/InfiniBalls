import { Canvas } from "./exports/canvasHandler.js";
import * as VECTOR from "./exports/vector.js";
// canvasInit

const can = new Canvas(new VECTOR.Vector2(500,500));
can.addToDocument();
can.drawCircle(new VECTOR.Vector2(250,250), 50);

const tiltValue = new VECTOR.Vector3(0,0,0);
function requestPermission () {
    DeviceOrientationEvent.requestPermission().then((response) => {
        document.getElementById("test-values").innerHTML = response;
        if (response == "granted") {
            window.addEventListener("deviceorientation", (event) => {
                tiltValue.set(event.alpha,event.beta,event.gamma);
                document.getElementById("test-values").innerHTML = tiltValue;

            });
        }
    });
}
document.getElementById("btn").addEventListener("click", requestPermission);