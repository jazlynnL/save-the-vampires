// class to display the starting and ending screen. sets a standard location and size for the button.
class Menu {
  text;
  buttonText;
  #buttonWidth = 100;
  #buttonHeight = 25;
  #buttonX = Canvas.width / 2 - this.#buttonWidth / 2;
  #buttonY = Canvas.height / 2 + 50;
  // creates the interval that draws the background and button
  //@param {object} game: the actual game. only needed for the endscreen so that the event listener can be removed. 
  constructor(game) {
    this.game = game;
    document.addEventListener('click', this.createScreen);

    this.intervalID = setInterval(() => {
      this.draw();
      this.buttonDisplay();
    }, 20)
  }

  // checks to see if the button was clicked. If so, clears the interval that draws the background and checks if you are on a starting screen or an ending screen. If on a start screen, creates a new game. If on an endscreen, resets all static variables and then creates a new game. 
  // @param {object} event - the mouse click event
  createScreen = event => {
    let mouseX = Canvas.getCursorPosition(event).x;
    let mouseY = Canvas.getCursorPosition(event).y;
    if (mouseX > this.#buttonX && mouseX < this.#buttonX + this.#buttonWidth && mouseY > this.#buttonY && mouseY < this.#buttonY + this.#buttonHeight) {
      clearInterval(this.intervalID);
      if (this instanceof StartScreen) {
        Canvas.game = new Game();
        document.removeEventListener('click', this.createScreen)
      } else {
        Hero.isDead = false;
        Game.vampires = [];
        Game.projectiles = [];
        Game.obstacles = [];
        Game.powerups = [];
        Images.resetHealth();
        Vampire.count = 0;
        this.game.removeEvent();
        document.removeEventListener('click', this.createScreen)
        Canvas.game = new Game();
      }
    }
  }

  // draws the button on the start and end screen to either allow the player to start the game or replay another game. 
  buttonDisplay() {
    Canvas.context.fillStyle = "#eaeaea";
    Canvas.context.fillRect(this.#buttonX, this.#buttonY, this.#buttonWidth, this.#buttonHeight);
    Canvas.context.textAlign = "center";
    Canvas.context.textBaseline = "middle";
    Canvas.context.fillStyle = "black";
    Canvas.context.font = '10px sans-serif';
    Canvas.context.fillText(this.buttonText, Canvas.width / 2, Canvas.height / 2 + 25 / 2 + 50);
  }

  // Draws the backgorund. If on a start screen, displays the game title, if on an end screen, displays the vampire save count. 
  draw() {
    Canvas.context.drawImage(Images.menuBackground, 0, 0, Canvas.width, Canvas.height);
    Canvas.context.fillStyle = "white";
    Canvas.context.font = "35px sans-serif";
    Canvas.context.fillText(this.text, Canvas.width / 2, 200);
  }
}

//Class for the start screen. Sets the text to the title of the game, sets button text to say "Start".
// @extends Menu
class StartScreen extends Menu {
  text = "Save the Vampires!";
  buttonText = "Start";
  constructor() {
    super();
  }
}

// Class for the end screen. Sets the text to the vampire save count, sets button text to say "Play Again"
// @extends Menu. 
class EndScreen extends Menu {
  text = `You saved ${Vampire.count} vampires before becoming one yourself!`;
  buttonText = "Play Again";
  // @param {object} game: the current instance of game
  constructor(game) {
    super(game);
  }
}