import { Vector2 } from "./vector.js";
export class Point {
    constructor (p,r,c,b,d,v) {
        this.pos = p;
        this.velocity = v;
        this.radius = r;
        this.colour = c;
        this.bouncyness = b;
        this.drag = d;

        this.constrain = (size) => {
            if (this.pos.x - this.radius < 0) {
                this.pos.x = 0 + this.radius;
                this.velocity.x *= -this.bouncyness;
                this.velocity.y *= this.drag;
            }
            if (this.pos.x + this.radius > size.x) {
                this.pos.x = size.x - this.radius;
                this.velocity.x *= -this.bouncyness;
                this.velocity.y *= this.drag;
            }
            if (this.pos.y - this.radius < 0) {
                this.pos.y = 0 + this.radius;
                this.velocity.x *= this.drag;
                this.velocity.y *= -this.bouncyness;
            }
            if (this.pos.y + this.radius > size.y) {
                this.pos.y = size.y - this.radius;
                this.velocity.x *= this.drag;
                this.velocity.y *= -this.bouncyness;
            }
        };
        this.solveCollisions = (points) => {
            points.map((i) => {
                const dis = returnDistance(new Vector2(this.pos.x-i.pos.x,this.pos.y-i.pos.y));
                const requiredDistance = this.radius + i.radius;
                if (dis < requiredDistance) {
                    if (i != this) {
                        const normal = new Vector2(this.pos.x-i.pos.x,this.pos.y-i.pos.y);
                        normal.normalize();
                        const add1 = normal.clone();
                        add1.multiply(new Vector2((requiredDistance-dis)*((requiredDistance-this.radius)/requiredDistance), (requiredDistance-dis)*((requiredDistance-this.radius)/requiredDistance)));
                        normal.multiply(new Vector2((requiredDistance-dis)*((requiredDistance-i.radius)/requiredDistance), (requiredDistance-dis)*((requiredDistance-i.radius)/requiredDistance)));
                        normal.multiply(new Vector2(-1,-1));
                        this.pos.add(add1);
                        this.velocity.add(add1);
                        i.pos.add(normal);
                        i.velocity.add(normal);
                    }
                }
            });
        };
    }
}
export class Weld {
    constructor (p1,p2,r,c,s,li) {
        this.point1 = p1;
        this.point2 = p2;
        this.radius = r;
        this.colour = c;
        
        this.length = returnDistance(new Vector2(this.point1.pos.x-this.point2.pos.x,this.point1.pos.y-this.point2.pos.y));
        this.strength = s;
        this.limit = li;

        this.solveWeld = () => {
            const offSet = new Vector2(this.point1.pos.x-this.point2.pos.x,this.point1.pos.y-this.point2.pos.y);
            const dis = returnDistance(offSet);
            const dif = this.length - dis;
            const percent = dif / dis / 2;
            offSet.multiply(new Vector2(percent, percent));
            if (dif) {
                this.point1.pos.add(offSet);
                this.point1.velocity.add(offSet);
                this.point2.pos.substract(offSet);
                this.point2.velocity.substract(offSet);
            }
        };
    }
}
export class Colour {
    constructor (r,g,b,a) {
        this.r = r|0;
        this.g = g|0;
        this.b = b|0;
        this.a = a|0;

        this.getRgbString = () => {
            return `rgba(${r},${g},${b},${a})`;
        };
    }
}
export class Enviroment {
    constructor (s,g,i) {
        this.size = s;
        this.gravity = g;
        this.points = [];
        this.welds = [];
        this.iterations = i;
        this.addPoint = (p) => {
            this.points.push(p);
        };
        this.addWeld = (w) => {
            this.welds.push(w);
        };
        this.addShape = (s) => {
            s.points.map((i) => {
                this.points.push(i);
            });
            s.welds.map((i) => {
                this.welds.push(i);
            });
        };

        this.draw = (can) => {
            can.clearCanvas();
            this.points.map((i) => {
                can.setColour(i.colour);
                can.drawCircle(i.pos,i.radius);
            });
            this.welds.map((i) => {
                can.setColour(i.colour);
                can.drawLine(i.point1.pos,i.point2.pos,i.radius);
            });
        };
        this.solvePhysics = () => {
            this.welds.map((i)=>{
                i.solveWeld();
            });
            this.points.map((i)=>{
                const change = new Vector2(0,0);
                change.add(i.velocity);
                change.add(this.gravity);
                i.velocity = change;
                i.constrain(this.size);
                i.pos.add(i.velocity);
                for (let j = 0; j < this.iterations; j++) {
                    i.solveCollisions(this.points);
                }
            });
        };
    }
}
export function getRandomPosition (size) {
    const p = new Vector2(Math.random(),Math.random());
    p.multiply(size);
    return p;
}
export function returnDistance (shape) {
    return Math.sqrt(Math.pow(shape.x,2)+Math.pow(shape.y,2));
}
export function getSimpleShape (sides,width,pos,c,r,b,d) {
    let ret = {points: [], welds: []};
    const a = 2 * Math.PI / sides;
    for (let i = 0; i < sides; i++) {
        ret.points.push(new Point(new Vector2(width * Math.cos(a * i), width * Math.sin(a * i)),r,c,b,d,new Vector2(0,0)));
        ret.points[i].pos.add(pos);
    }
    for (let i = 0; i < sides; i++) {
        for (let j = i+1; j < sides; j++) {
            ret.welds.push(new Weld(ret.points[i],ret.points[j],r,c,0))
        }
    }
    return ret;
}
export function getWheel (sides,width,pos,c,r,b,d) {
    let ret = {points: [], welds: []};
    const a = 2 * Math.PI / sides;
    for (let i = 0; i < sides; i++) {
        ret.points.push(new Point(new Vector2(width * Math.cos(a * i), width * Math.sin(a * i)),r,c,b,d,new Vector2(0,0)));
        ret.points[i].pos.add(pos);
    }
    ret.points.push(new Point(pos,r,c,b,d,new Vector2(0,0)));
    for (let i = 0; i < sides+1; i++) {
        for (let j = i+1; j < sides+1; j++) {
            ret.welds.push(new Weld(ret.points[i],ret.points[j],r,c,0))
        }
    }
    return ret;
}
export function getRect (size,pos,c,h,r,b,d) {
    let ret = {points: [], welds: []};
    for (let i = 0; i < size.x; i+=h) {
        for (let j = 0; j < size.y; j+=h) {
            ret.points.push(new Point(new Vector2(i, j),r,c,b,d,new Vector2(0,0)));
            ret.points[ret.points.length-1].pos.add(pos);
        }
    }
    //ret.points.push(new Point(new Vector2(pos.x+size.x/2, pos.y+size.y/2),r,c,b,d,new Vector2(0,0)));
    for (let i = 0; i < ret.points.length; i++) {
        for (let j = i+1; j < ret.points.length; j++) {
            ret.welds.push(new Weld(ret.points[i],ret.points[j],r,c,0));
        }
    }
    return ret;
}
//single point
export function getPoint (pos,c,r,b,d) {
    return new Point(pos,r,c,b,d,new Vector2(0,0));
}