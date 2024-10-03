// class representing the whole canvas.
class Canvas {
  static canvas = document.getElementById("gamescreen");
  static context = Canvas.canvas.getContext('2d');
  static width = 1920 / 2;
  static height = 1080 / 2;
  static game;

  // loads all the images
  // sets the canvas width and height
  // loads the start screen
  constructor() {
    new Images();
    Canvas.canvas.width = Canvas.width;
    Canvas.canvas.height = Canvas.height;
    this.start = new StartScreen();
  }

  // get the position of your mouse
  static getCursorPosition(event) {
    const rect = Canvas.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // @return {object} The x and y value of the mouse position.
    return { x, y };
  }

  // clears the canvas.
  static clear() {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
  }
}

let canvas = new Canvas();