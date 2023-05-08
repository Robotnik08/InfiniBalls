import { Vector2 } from "./vector.js";
export class Canvas {
    constructor (size) {
        this.can = document.createElement("canvas");
        this.width = size.x;
        this.height = size.y;
        this.can.width = this.width;
        this.can.height = this.height;
        this.ctx = this.can.getContext("2d");
        this.mousePos = new Vector2(0,0);

        this.can.addEventListener("mousemove", (e) => {
            this.mousePos = new Vector2(e.clientX,e.clientY);
        });
        this.resize = (size) => {
            this.width = size.x;
            this.height = size.y;
            this.can.width = this.width;
            this.can.height = this.height;
        }
        this.addToDocument = () => {
            document.body.appendChild(this.can);
        }
        this.removeFromDocument = () => {
            this.can.remove();
        }
        this.setColour = (colour) => {
            this.ctx.fillStyle = colour.toCssString();
        }
        this.drawRect = (position, size) => {
            this.ctx.fillRect(position.x,position.y,size.x,size.y);
        }
        this.drawCircle = (position, radius) => {
            this.ctx.beginPath();
            this.ctx.arc(position.x,position.y,radius,0,2*Math.PI,false);
            this.ctx.fill();
        }
        this.drawLine = (start, end, thickness = 1) => {
            this.ctx.beginPath();
            this.ctx.moveTo(start.x, start.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.lineWidth = thickness;
            this.ctx.stroke();
        }
        this.clearRect = (position, size) => {
            this.ctx.clearRect(position.x,position.y,size.x,size.y);
        }
        this.clearCanvas = () => {
            this.clearRect(new Vector2(0,0),new Vector2(this.can.width,this.can.height))
        }
        this.drawSprite = (position, size, sprite) => {
            this.ctx.drawImage(sprite.image,position.x,position.y,size.x,size.y);
        }
    }
}