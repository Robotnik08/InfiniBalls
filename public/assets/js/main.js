import { Canvas } from "./exports/canvasHandler.js"
import { Colour } from "./exports/colour.js"
import * as VECTOR from "./exports/vector.js";
// canvasInit

const can = new Canvas(new VECTOR.Vector2(500,500));
can.addToDocument();

const tiltValue = new VECTOR.Vector3(0,0,0);
function requestPermissionForIOS() {
    window.DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
            document.getElementById("test-values").innerHTML = "granted";
            window.addEventListener("deviceorientation", (event) => {
                tiltValue.set(event.alpha,event.beta,event.gamma);
            
            });
        }
      }).catch((e) => {
        console.error(e);
      })
  }
update();
requestPermissionForIOS();
document.getElementById("btn").addEventListener("click",requestPermission);
function update () {
    can.clearCanvas();
    can.setColour(new Colour(0,0,0));
    //document.getElementById("test-values").innerHTML = new VECTOR.Vector2(Math.round(tiltValue.y+250),Math.round(tiltValue.z+250));
    can.drawCircle(new VECTOR.Vector2(tiltValue.y+250,tiltValue.z+250), 50);
    requestAnimationFrame(update);
}