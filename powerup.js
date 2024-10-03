//class representing all the powerups. sets a standard width and height of 50x50 pixels.
class Powerup {
  #width = 50;
  #height = 50;

  // randomizes the x and y position of where the powerup will spawn
  constructor() {
    this.x = Physics.generateXPosition();
    this.y = Physics.generateYPosition();
  }

  // getter for width
  // @return {number} Returns the width of the powerup, in pixels.
  get width() {
    return this.#width;
  }

  // getter for height
  // @return {number} Returns the height of the powerup, in pixels.
  get height() {
    return this.#height;
  }

  // Creates the powerup based on the type
  // @param {number} type - a number from 1-3 that determines which powerup should be returned
  // @return {object} Returns one of three powerups based on the type
  static generatePowerup(type) {
    if (type === 1) {
      return new Powerup1();
    } else if (type === 2) {
      return new Powerup2();
    } else if (type === 3) {
      return new Powerup3();
    }
  }

  // draws the powerup 
  draw() {
    Canvas.context.drawImage(this.display, this.x, this.y, this.#width, this.#height);
  }

  // an abstract method. Represents the effect of each powerup when picked up
  action() {
    throw new Error('This method should be overridden within each type of powerup.');
  }
}

// Class for powerup 1. Sets the image of an apple.
// @extends Powerup
class Powerup1 extends Powerup {
  display = Images.powerup1;
  constructor() {
    super();
  }

  // increases the hero's acceleration. Changes it back to the normal speed after 5 seconds.
  // @param {object} hero - takes in the hero so it can change its acceleration
  action(hero) {
    hero.acceleration *= 1.45;
    setTimeout(() => this.normalSpeed(hero), 5000);
  }

  // changes the hero's speed back to normal. 
  // @param {object} hero - takes in the hero so it can change its acceleration
  normalSpeed(hero) {
    hero.acceleration /= 1.45;
  }
}

// Class for powerup 2. Sets the image of a first-aid kit. 
// @extends Powerup
class Powerup2 extends Powerup {
  display = Images.powerup2;
  constructor() {
    super();
  }

  //If the hero is not at full health, it will gain back a life. The health bar is changed accordingly.
  // @param {object} hero - Takes in the hero to determine its health.
  action(hero) {
    if (hero.health < 8) {
      hero.health++;
      Images.resetHealth();
      Images.hearts.splice(hero.health, 8 - hero.health);
    }
  }
}

// Class for powerup 3. Sets the image of two eighth notes. Adds a music clip to the HTML. 
// @extends Powerup
class Powerup3 extends Powerup {
  #sound = document.createElement("audio");
  display = Images.powerup3;
  constructor() {
    super();
  }

  //Plays music for 5 seconds. 
  action() {
    this.#sound.src = "music.mp3";
    this.#sound.style.display = "none";
    document.body.appendChild(this.#sound);
    this.#sound.play();
    setTimeout(() => this.#stopMusic(), 5000)
  }

  //Stops the music. Removes the music clip from the HTML. 
  #stopMusic() {
    this.#sound.pause();
    document.body.removeChild(this.#sound);
  }
}
