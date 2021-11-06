var Shape = /** @class */ (function() {
    function Shape(name, width, height) {
        this.area = width * height;
        this.color = "pink";
    };
    Shape.prototype.shoutout = function() {
        return "I'm " + this.color + " " + this.name + " with an area of " + this.area + " cm squared.";
    };
    return Shape;
}());
var square = new Shape("square", 30, 30);