//Robotnik's vector solution
export class Vector2 {
    constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;

        this.add = (secondVector2, returnCopy = false) => {
            this.x += secondVector2.x;
            this.y += secondVector2.y;

            if (returnCopy) return new Vector2(this.x,this.y);
        };
        this.substract = (secondVector2, returnCopy = false) => {
            this.x -= secondVector2.x;
            this.y -= secondVector2.y;

            if (returnCopy) return new Vector2(this.x,this.y);
        };
        this.multiply = (secondVector2, returnCopy = false) => {
            this.x *= secondVector2.x;
            this.y *= secondVector2.y;

            if (returnCopy) return new Vector2(this.x,this.y);
        };
        this.devide = (secondVector2, returnCopy = false) => {
            this.x /= secondVector2.x;
            this.y /= secondVector2.y;

            if (returnCopy) return new Vector2(this.x,this.y);
        };
        this.magnitude = () => {
            return Math.sqrt(this.x**2+this.y**2);
        }
        this.sqrtMagnitude = () => {
            return this.x**2+this.y**2;
        }
        this.normalized = () => {
            return new Vector2(this.x/this.magnitude(),this.y/this.magnitude());
        }
        this.normalize = (returnCopy = false) => {
            const mag = this.magnitude();
            this.x /= mag;
            this.y /= mag;
            if (returnCopy) return new Vector2(this.x,this.y);
        }
        this.equals = (secondVector) => {
            if (secondVector.z != null) {
                return false;
            }
            return (!(secondVector.x ^ this.x) && !(secondVector.y ^ this.y));
        }
        this.set = (newX = 0,newY = 0, returnCopy = false) => {
            this.x = newX;
            this.y = newY;
            if (returnCopy) return new Vector2(this.x,this.y);
        }
        this.toString = () => {
            return `(${this.x}, ${this.y})`;
        }
    }
}
export class Vector2Int extends Vector2 {
    constructor (x = 0, y = 0) {
        if (Number.isInteger(x) && Number.isInteger(y)) {
            super(x,y);
        }
        else {
            console.warn("One or more of the arguments are not intergers");
            return;
        }
        this.int = true;

        this.add = (secondVector2, returnCopy = false) => {
            if (!secondVector2.int) {
                console.warn("You can only add Vector2Int to this object");
                return;
            }
            const response = super.add(secondVector2,returnCopy);
            if (returnCopy) return new Vector2Int(Math.round(response.x),Math.round(response.y));
        };
        this.substract = (secondVector2, returnCopy = false) => {
            if (!secondVector2.int) {
                console.warn("You can only substract Vector2Int to this object");
                return;
            }
            const response = super.add(secondVector2,returnCopy);
            if (returnCopy) return new Vector2Int(Math.round(response.x),Math.round(response.y));
        };
        this.multiply = (secondVector2, returnCopy = false) => {
            if (!secondVector2.int) {
                console.warn("You can only multiply Vector2Int to this object");
                return;
            }
            const response = super.add(secondVector2,returnCopy);
            if (returnCopy) return new Vector2Int(Math.round(response.x),Math.round(response.y));
        };
        this.devide = (secondVector2, returnCopy = false) => {
            if (!secondVector2.int) {
                console.warn("You can only devide with Vector2Int to this object");
                return;
            }
            const response = super.devide(secondVector2,returnCopy);
            if (returnCopy) return new Vector2Int(Math.round(response.x),Math.round(response.y));
        };
        this.normalized = () => {
            console.error("Vector2Int's can't be normalized");
            return;
        }
        this.normalize = () => {
            console.error("Vector2Int's can't be normalized");
            return;
        }
        this.set = (x = 0, y = 0, returnCopy = false) => {
            if (Number.isInteger(x) && Number.isInteger(y)) {
                super.set(x,y);
                if (returnCopy) return new Vector2Int(this.x,this.y);
            }
            else {
                console.warn("One or more of the arguments are not intergers");
                return;
            }
        }
    }
}
export class Vector3 {
    constructor (x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.add = (secondVector3, returnCopy = false) => {
            this.x += secondVector3.x;
            this.y += secondVector3.y;
            this.z += secondVector3.z;

            if (returnCopy) return new Vector3(this.x,this.y,this.z);
        };
        this.substract = (secondVector3, returnCopy = false) => {
            this.x -= secondVector3.x;
            this.y -= secondVector3.y;
            this.z -= secondVector3.z;

            if (returnCopy) return new Vector3(this.x,this.y,this.z);
        };
        this.multiply = (secondVector3, returnCopy = false) => {
            this.x *= secondVector3.x;
            this.y *= secondVector3.y;
            this.z *= secondVector3.z;

            if (returnCopy) return new Vector3(this.x,this.y,this.z);
        };
        this.devide = (secondVector3, returnCopy = false) => {
            this.x /= secondVector3.x;
            this.y /= secondVector3.y;
            this.z /= secondVector3.z;

            if (returnCopy) return new Vector3(this.x,this.y,this.z);
        };
        this.magnitude = () => {
            return Math.sqrt(this.x**2+this.y**2+this.z**2);
        }
        this.sqrtMagnitude = () => {
            return this.x**2+this.y**2+this.z**2;
        }
        this.normalized = () => {
            return new Vector3(this.x/this.magnitude(),this.y/this.magnitude(),this.z/this.magnitude());
        }
        this.normalize = (returnCopy = false) => {
            const mag = this.magnitude();
            this.x /= mag;
            this.y /= mag;
            this.z /= mag;
            if (returnCopy) return new Vector3(this.x,this.y,this.z);
        }
        this.equals = (secondVector) => {
            if (secondVector.w != null && secondVector.z == null) {
                return false;
            }
            return (!(secondVector.x ^ this.x) && !(secondVector.y ^ this.y) && !(secondVector.z ^ this.z));
        }
        this.set = (newX = 0,newY = 0,newZ = 0, returnCopy = false) => {
            this.x = newX;
            this.y = newY;
            this.z = newZ;
            if (returnCopy) return new Vector3(this.x,this.y,this.z);
        }
        this.toString = () => {
            return `(${this.x}, ${this.y}, ${this.z})`;
        }
    }
}
export class Vector3Int extends Vector3 {
    constructor (x = 0, y = 0, z = 0) {
        if (Number.isInteger(x) && Number.isInteger(y)) {
            super(x,y,z);
        }
        else {
            console.warn("One or more of the arguments are not intergers");
            return;
        }
        this.int = true;

        this.add = (secondVector3, returnCopy = false) => {
            if (!secondVector3.int) {
                console.warn("You can only add Vector3Int to this object");
                return;
            }
            const response = super.add(secondVector3,returnCopy);
            if (returnCopy) return new Vector3Int(Math.round(response.x),Math.round(response.y),Math.round(response.z));
        };
        this.substract = (secondVector3, returnCopy = false) => {
            if (!secondVector3.int) {
                console.warn("You can only substract Vector3Int to this object");
                return;
            }
            const response = super.add(secondVector3,returnCopy);
            if (returnCopy) return new Vector3Int(Math.round(response.x),Math.round(response.y),Math.round(response.z));
        };
        this.multiply = (secondVector3, returnCopy = false) => {
            if (!secondVector3.int) {
                console.warn("You can only multiply Vector3Int to this object");
                return;
            }
            const response = super.add(secondVector3,returnCopy);
            if (returnCopy) return new Vector3Int(Math.round(response.x),Math.round(response.y),Math.round(response.z));
        };
        this.devide = (secondVector3, returnCopy = false) => {
            if (!secondVector3.int) {
                console.warn("You can only devide with Vector3Int to this object");
                return;
            }
            const response = super.devide(secondVector3,returnCopy);
            if (returnCopy) return new Vector3Int(Math.round(response.x),Math.round(response.y),Math.round(response.z));
        };
        this.normalized = () => {
            console.error("Vector3Int's can't be normalized");
            return;
        }
        this.normalize = () => {
            console.error("Vector3Int's can't be normalized");
            return;
        }
        this.set = (x = 0, y = 0, z = 0, returnCopy = false) => {
            if (Number.isInteger(x) && Number.isInteger(y)) {
                super.set(x,y,z);
                if (returnCopy) return new Vector3Int(this.x,this.y,this.z);
            }
            else {
                console.warn("One or more of the arguments are not intergers");
                return;
            }
        }
    }
}
export class Vector4 {
    constructor (w = 0, x = 0, y = 0, z = 0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;

        this.add = (secondVector4, returnCopy = false) => {
            this.w += secondVector4.w;
            this.x += secondVector4.x;
            this.y += secondVector4.y;
            this.z += secondVector4.z;

            if (returnCopy) return new Vector4(this.w,this.x,this.y,this.z);
        };
        this.substract = (secondVector4, returnCopy = false) => {
            this.w -= secondVector4.w;
            this.x -= secondVector4.x;
            this.y -= secondVector4.y;
            this.z -= secondVector4.z;

            if (returnCopy) return new Vector4(this.w,this.x,this.y,this.z);
        };
        this.multiply = (secondVector4, returnCopy = false) => {
            this.w *= secondVector4.w;
            this.x *= secondVector4.x;
            this.y *= secondVector4.y;
            this.z *= secondVector4.z;

            if (returnCopy) return new Vector4(this.w,this.x,this.y,this.z);
        };
        this.devide = (secondVector4, returnCopy = false) => {
            this.w /= secondVector4.w;
            this.x /= secondVector4.x;
            this.y /= secondVector4.y;
            this.z /= secondVector4.z;

            if (returnCopy) return new Vector4(this.w,this.x,this.y,this.z);
        };
        this.magnitude = () => {
            return Math.sqrt(this.w**2+this.x**2+this.y**2+this.z**2);
        }
        this.sqrtMagnitude = () => {
            return this.w**2+this.x**2+this.y**2+this.z**2;
        }
        this.normalized = () => {
            return new Vector4(this.w/this.magnitude(),this.x/this.magnitude(),this.y/this.magnitude(),this.z/this.magnitude());
        }
        this.normalize = (returnCopy = false) => {
            const mag = this.magnitude();
            this.w /= mag;
            this.x /= mag;
            this.y /= mag;
            this.z /= mag;
            if (returnCopy) return new Vector4(this.w,this.x,this.y,this.z);
        }
        this.equals = (secondVector) => {
            if (secondVector.w == null || secondVector.z == null) {
                return false;
            }
            return (!(secondVector.w ^ this.w) && !(secondVector.x ^ this.x) && !(secondVector.y ^ this.y) && !(secondVector.z ^ this.z));
        }
        this.set = (newW = 0,newX = 0,newY = 0,newZ = 0, returnCopy = false) => {
            this.w = newW;
            this.x = newX;
            this.y = newY;
            this.z = newZ;
            if (returnCopy) return new Vector4(this.w,this.x,this.y,this.z);
        }
        this.toString = () => {
            return `(${this.w}, ${this.x}, ${this.y}, ${this.z})`;
        }
    }
}
export class Vector4Int extends Vector4 {
    constructor (w = 0, x = 0, y = 0, z = 0) {
        if (Number.isInteger(x) && Number.isInteger(y)) {
            super(w,x,y,z);
        }
        else {
            console.warn("One or more of the arguments are not intergers");
            return;
        }
        this.int = true;

        this.add = (secondVector4, returnCopy = false) => {
            if (!secondVector4.int) {
                console.warn("You can only add Vector4Int to this object");
                return;
            }
            const response = super.add(secondVector4,returnCopy);
            if (returnCopy) return new Vector4Int(Math.round(response.w),Math.round(response.x),Math.round(response.y),Math.round(response.z));
        };
        this.substract = (secondVector4, returnCopy = false) => {
            if (!secondVector4.int) {
                console.warn("You can only substract Vector4Int to this object");
                return;
            }
            const response = super.add(secondVector4,returnCopy);
            if (returnCopy) return new Vector4Int(Math.round(response.w),Math.round(response.x),Math.round(response.y),Math.round(response.z));
        };
        this.multiply = (secondVector4, returnCopy = false) => {
            if (!secondVector4.int) {
                console.warn("You can only multiply Vector4Int to this object");
                return;
            }
            const response = super.add(secondVector4,returnCopy);
            if (returnCopy) return new Vector4Int(Math.round(response.w),Math.round(response.x),Math.round(response.y),Math.round(response.z));
        };
        this.devide = (secondVector4, returnCopy = false) => {
            if (!secondVector4.int) {
                console.warn("You can only devide with Vector4Int to this object");
                return;
            }
            const response = super.devide(secondVector4,returnCopy);
            if (returnCopy) return new Vector4Int(Math.round(response.w),Math.round(response.x),Math.round(response.y),Math.round(response.z));
        };
        this.normalized = () => {
            console.error("Vector4Int's can't be normalized");
            return;
        }
        this.normalize = () => {
            console.error("Vector4Int's can't be normalized");
            return;
        }
        this.set = (x = 0, y = 0, z = 0, returnCopy = false) => {
            if (Number.isInteger(x) && Number.isInteger(y)) {
                super.set(w,x,y,z);
                if (returnCopy) return new Vector4Int(this.w,this.x,this.y,this.z);
            }
            else {
                console.warn("One or more of the arguments are not intergers");
                return;
            }
        }
    }
}
export class VectorBig {
    constructor (args) {
        this.dimensions = args;
        this.length = args.length;

        this.add = () => {
            
        }
    }
}