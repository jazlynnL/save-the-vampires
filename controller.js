// Class to keep track of which keys are pressed down
class Controller {
  static w = false;
  static a = false;
  static s = false;
  static d = false;

  // on instantiation, creates events for pressing down and releasing A, W, S, and D keys on the keyboard
  constructor() {
    document.addEventListener("keydown", (e) => {
      this.keyDownHandler(e);
    })
    document.addEventListener("keyup", (e) => {
      this.keyUpHandler(e);
    })
  }

  // sets the property to true when the key is pressed down
  // @param {Object} e - event object
  keyDownHandler(e) {
    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
      Controller[e.key] = true;
    }
  }

  // sets the property to false when the key is released
  // @param {Object}  e - event object
  keyUpHandler(e) {
    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
      Controller[e.key] = false;
    }
  }
}