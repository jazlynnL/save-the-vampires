/*
  - class representing the whole game. Contains the hero, the vampires, the projectiles, obstacles, and powerups. Controls the changing of frames and calls all the functions that update and draw the items. 
*/

class Game {
  static fps = 90; //Game fps
  static timeInterval = 1000 / Game.fps; //How much time will elapse until the next frame is drawn.
  static vampires = [];
  static projectiles = [];
  static obstacles = [];
  static powerups = [];
  #vampireAddCounter = 0;  // vampire adding counter
  #powerupAddCounter = 0;  // powerup adding counter
  #drawFromX = 0; // to be used to redraw the background image
  #drawFromY = 0;
  // When a new game is made, a new hero and controller are made. Obstacles are also randomly generated, and the game interval is created so that the frames can be updated and changed
  constructor() {
    this.hero = new Hero();
    this.controller = new Controller();
    this.#addObstacles();

    //Refreshing the game. Every frame, this.draw() runs, and the counters for vampires and powerups are increased by 1. It checks if the hero has died, and if so, produces the end screen. 
    this.gameInterval = setInterval(() => {
      Projectile.checkCollisions();
      this.draw();
      this.#vampireAddCounter++;
      this.#powerupAddCounter++;
      this.#addVampire();
      this.#addPower();
      if (Hero.isDead === true) {
        clearInterval(this.gameInterval);
        Canvas.clear();
        new EndScreen(this);
      }
    }, Game.timeInterval);
    this.addEvent();
  }

  // adds the event listener to create projectiles when the mouse is clicked
  addEvent() {
    document.addEventListener('click', this.makeProjectile);
  }

  // removes the above event listener
  removeEvent() {
    document.removeEventListener('click', this.makeProjectile);
  }

  // creates a new projectile and pushes it into the array of projectiles
  // @param {object} event - the mouse/click event
  makeProjectile = event => {
    let mouseX = Canvas.getCursorPosition(event).x;
    let mouseY = Canvas.getCursorPosition(event).y;

    Game.projectiles.push(new Projectile(mouseX, mouseY, this.hero));
  }

  // happens every frame. Updates all moving pieces (hero, vampires, projectiles, background), and redraws all stationary pieces (powerups, obstacles)
  draw() {
    Canvas.clear(); //Clearing the previous screen
    this.#updateBackground(); // updating the background to follow the hero
    this.hero.update(); // updating the hero position
    Canvas.context.translate(-(this.#drawFromX), -(this.#drawFromY)); // translates the canvas so everything can be drawn in the correct updated position

    // draws the powerups
    for (let i = 0; i < Game.powerups.length; i++) {
      Game.powerups[i].draw(Game.powerups[i].display, Game.powerups[i].width, Game.powerups[i].height);
    }

    // draws the hero
    this.hero.draw();

    //draws the vampires and updates their position
    for (let i = 0; i < Game.vampires.length; i++) {
      Game.vampires[i].draw();
      Game.vampires[i].update(this.hero);
    }

    //draws the projectiles and updates their position
    for (let i = 0; i < Game.projectiles.length; i++) {
      Game.projectiles[i].draw();
      Game.projectiles[i].update(this.hero);
    }

    // draws all the obstacles
    for (let i = 0; i < Game.obstacles.length; i++) {
      Game.obstacles[i].draw();
    }

    // translates back the canvas so that it isn't already translated on the next frame.
    Canvas.context.translate((this.#drawFromX), (this.#drawFromY));

    // draws the number of vampires saved and the amount of health you have left in the top left corner
    this.#drawSavedAmount();
    this.#drawHealth();
  }

  // displays the amount of vampires saved
  #drawSavedAmount() {
    Canvas.context.fillStyle = "#acacac";
    Canvas.context.fillRect(25, 25, 125, 25);
    Canvas.context.textAlign = "center";
    Canvas.context.textBaseline = "middle";
    Canvas.context.fillStyle = "black";
    Canvas.context.fillText(`You cured ${Vampire.count} vampires!`, 75 + 25 / 2, 25 + 25 / 2);
  }

  // displays the amount of health you have left
  #drawHealth() {
    for (let i = Images.hearts.length - 1; i >= 0; i--) {
      Canvas.context.drawImage(Images.hearts[i], i * 25 + 25, 60, 25, 25);
    }
  }

  // updates the background to follow the player unless it is at an edge
  #updateBackground() {
    this.#drawFromX = Physics.stationaryMap(this.hero).x;
    this.#drawFromY = Physics.stationaryMap(this.hero).y;
    Canvas.context.drawImage(Images.background, this.#drawFromX, this.#drawFromY, Canvas.width, Canvas.height, 0, 0, Canvas.width, Canvas.height);
  }

  // adds a vampire to be drawn every 300 frames by randomizing the type and then pushing them into the array of vampires.
  #addVampire() {
    if (this.#vampireAddCounter === 300) {
      let vampType = Math.floor(Math.random() * 4);
      const vampire = Vampire.generateVampire(vampType);
      Game.vampires.push(vampire);
      this.#vampireAddCounter = 0;
    }
  }

  // sets a random number of obstacles (5 - 10) for every game. Randomizes them to be either one type or the other. Creates the obstacle class and pushes them into the array of obstacles.
  #addObstacles() {
    this.obstacleCount = Math.floor(Math.random() * (6) + 5);
    for (let i = 0; i < this.obstacleCount; i++) {
      let type = Math.floor(Math.random() * (2) + 1);
      const obstacle = Obstacle.generateObstacle(this.hero, type);
      Game.obstacles.push(obstacle);
    }
  }

  // adds a powerup every 500 frames. Randomizes them to be one of 3 types and pushes them into the array of powerups. 
  #addPower() {
    if (this.#powerupAddCounter === 500) {
      let powerType = Math.floor(Math.random() * 3 + 1);
      const powerup = Powerup.generatePowerup(powerType);
      Game.powerups.push(powerup);
      this.#powerupAddCounter = 0;
    }
  }
}

