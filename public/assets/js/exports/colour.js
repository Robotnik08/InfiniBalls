export class Colour {
    constructor (r=0,g=0,b=0,a=1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        this.toCssString = () => {
            return `rgba(${r},${g},${b},${a})`;
        }
        this.average = (otherColour) => {
            return new Colour((otherColour.r+this.r)/2,(otherColour.g+this.g)/2,(otherColour.b+this.b)/2,(otherColour.a+this.a)/2);
        }
    }
}