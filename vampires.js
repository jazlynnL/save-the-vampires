// Class to represent the vampires. Sets fields for angle, position, dimensions, velocity, health, and display. 
class Vampire {
  static count = 0; // number of vampires saved
  #angle;
  x;
  y;
  width;
  height;
  velocity;
  health;
  display;

  // generates a vampire based on the type.
  // @param {number} type - indicates which one out of 4 vampires should be generated.
  // @return {object} Returns one out of four possible vampires based on the type.
  static generateVampire(type) {
    if (type === 0) {
      return new Vampire0();
    } else if (type === 1) {
      return new Vampire1();
    } else if (type === 2) {
      return new Vampire2();
    } else if (type === 3) {
      return new Vampire3();
    }
  }

  // generates a random position for the vampire to spawn, keeps generating until it ensures it won't spawn on an obstacle.
  generatePositions() {
    this.x = Physics.generateXPosition();
    this.y = Physics.generateYPosition();
    for (let i = 0; i < Game.obstacles.length; i++) {
      if (Physics.hasCollided(this, Game.obstacles[i])) {
        this.generatePositions();
      }
    }
  }

  // draws the vampires
  draw() {
    Canvas.context.drawImage(this.display, this.x, this.y, this.width, this.height);
  }

  // updates the vampires position so as to follow the hero
  // @param {object} hero - takes in the hero so it can follow its position
  update(hero) {
    let rise = hero.y - this.y;
    let run = hero.x - this.x;
    this.#angle = Math.atan2(rise, run);

    let velocityX = this.velocity * Math.cos(this.#angle);
    let velocityY = this.velocity * Math.sin(this.#angle);

    // checks collisions between vampire and obstacles and then moves it around the obstacle to follow the player.
    this.x += velocityX;
    for (let i = 0; i < Game.obstacles.length; i++) {
      if (Physics.hasCollided(this, Game.obstacles[i])) {
        this.x -= velocityX;
        if (hero.y + hero.height / 2 > Game.obstacles[i].y + Game.obstacles[i].height / 2) {
          this.y += (this.velocity - velocityY);
        } else {
          this.y -= (this.velocity + velocityY);
        }
      }
    }
    this.y += velocityY;
    for (let i = 0; i < Game.obstacles.length; i++) {
      if (Physics.hasCollided(this, Game.obstacles[i])) {
        this.y -= velocityY;
        if (hero.x + hero.width / 2 > Game.obstacles[i].x + Game.obstacles[i].width / 2 ) {
          this.x += (this.velocity - velocityX);
        } else {
          this.x -= (this.velocity + velocityX);
        }
      }
    }
    
    // determines which image of vampire should be used.
    this.#flipImage(hero.x);

  }

  // @param {number} takes the hero's x position to see if the vampire is on the left or the right, then sets the image based on what type of vampire this is
  #flipImage(x) {
    if (this.x <= x) {
      if (this instanceof Vampire0) {
        this.display = Images.vampire0Right;
      } else if (this instanceof Vampire1) {
        this.display = Images.vampire1Right;
      } else if (this instanceof Vampire2) {
        this.display = Images.vampire2Right;
      } else if (this instanceof Vampire3) {
        this.display = Images.vampire3Right;
      }
    } else {
      if (this instanceof Vampire0) {
        this.display = Images.vampire0Left;
      } else if (this instanceof Vampire1) {
        this.display = Images.vampire1Left;
      } else if (this instanceof Vampire2) {
        this.display = Images.vampire2Left;
      } else if (this instanceof Vampire3) {
        this.display = Images.vampire3Left;
      }
    }
  }
}

// class for vampire 0. Sets dimensions, velocity, and image. Calls the generatePositions() function to spawn the vampire on the map.
// @extends Vampire
class Vampire0 extends Vampire {
  width = 100;
  height = 115;
  velocity = 80 / Game.fps;
  health = 10;
  display = Images.vampire0Right;
  constructor() {
    super();
    this.generatePositions();
  }
}

// class for vampire 1. Sets dimensions, velocity, and image. Calls the generatePositions() function to spawn the vampire on the map.
// @extends Vampire
class Vampire1 extends Vampire {
  width = 130;
  height = 120;
  velocity = 100 / Game.fps;
  health = 5;
  display = Images.vampire1Right;
  constructor() {
    super();
    this.generatePositions();
  }
}

// class for vampire 2. Sets dimensions, velocity, and image. Calls the generatePositions() function to spawn the vampire on the map.
// @extends Vampire
class Vampire2 extends Vampire {
  width = 150;
  height = 87;
  velocity = 50 / Game.fps;
  health = 12;
  display = Images.vampire2Right;
  constructor() {
    super();
    this.generatePositions();
  }
}

// class for vampire 3. Sets dimensions, velocity, and image. Calls the generatePositions() function to spawn the vampire on the map.
// @extends Vampire
class Vampire3 extends Vampire {
  width = 150;
  height = 125;
  velocity = 15 / Game.fps;
  health = 20;
  display = Images.vampire3Right;
  constructor() {
    super();
    this.generatePositions();
  }
}