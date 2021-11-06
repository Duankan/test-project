class Shape {

  area: number;
  color: string;
  name: string;

  constructor(name: string, width: number, height: number) {
    this.area = width * height;
    this.color = "pink";
  };

  shoutout() {
    return "I'm " + this.color + " " + this.name + " with an area of " + this.area + " cm squared.";
  }
}

var square = new Shape("square", 30, 30);
