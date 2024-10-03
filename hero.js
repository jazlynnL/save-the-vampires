// Class representing the hero. Controls the hero's appearance, position, and movement. 
class Hero {
  static isDead = false;
  #displayRight = Images.heroRight;
  #displayLeft = Images.heroLeft;
  #display = this.#displayRight;
  #width = 100;
  #height = 135;
  // variables to be used for physics calculations
  #velocityX = 0 / Game.fps;
  #velocityY = 0 / Game.fps;
  #acceleration = 7000 / 1000 / 1000;
  #timeElapsed = 1000 / Game.fps;
  // on instantiation, sets initial spawn position to be the middle of the canvas. Gives the hero 8 lives. 
  constructor() {
    this.x = Canvas.width / 2 - this.#width / 2;
    this.y = Canvas.height / 2 - this.#height / 2;
    this.health = 8;
  }

  // getter for acceleration
  // @return {number} The acceleration value, in pixels/second/second
  get acceleration() {
    return this.#acceleration
  }

  //setter for acceleration
  // @param {number} acceleration - The value the acceleration will be set to
  set acceleration(acceleration) {
    this.#acceleration = acceleration;
  }

  // getter for width
  // @return {number} The width of the hero, in pixels
  get width() {
    return this.#width;
  }

  // getter for height
  // @return {number} The height of the hero, in pixels
  get height() {
    return this.#height;
  }

  // draws the hero 
  draw() {
    Canvas.context.drawImage(this.#display, this.x, this.y, this.#width, this.#height);
  }

  // controls the hero's movement based on the WASD keys, using vf = vi + a*t. 
  update() {
    if (Controller.d === true) {
      this.#velocityX += this.#acceleration * this.#timeElapsed;
      this.#display = this.#displayRight;
    }

    if (Controller.a === true) {
      this.#velocityX -= this.#acceleration * this.#timeElapsed;
      this.#display = this.#displayLeft;
    }

    if (Controller.w === true) {
      this.#velocityY -= this.#acceleration * this.#timeElapsed;
    }

    if (Controller.s === true) {
      this.#velocityY += this.#acceleration * this.#timeElapsed;
    }

    // prevents velocity from infinitely being multiplied
    if (this.#velocityX < 0.07 && this.#velocityX > -0.07) {
      this.#velocityX = 0;
    } else {
      this.#velocityX *= 0.9; //friction
    }

    if (this.#velocityY < 0.07 && this.#velocityY > -0.07) {
      this.#velocityY = 0;
    } else {
      this.#velocityY *= 0.9;
    }

    // If hero is already in motion, continue acceleration
    if (this.#velocityX !== 0) {
      this.x += this.#bigFive3(this.#velocityX); //velocity 
      for (let i = 0; i < Game.obstacles.length; i++) {
        if (Physics.hasCollided(this, Game.obstacles[i])) {
          this.x -= this.#bigFive3(this.#velocityX);
        }
      }
    }
    if (this.#velocityY !== 0) {
      this.y += this.#bigFive3(this.#velocityY);
      for (let i = 0; i < Game.obstacles.length; i++) {
        if (Physics.hasCollided(this, Game.obstacles[i])) {
          this.y -= this.#bigFive3(this.#velocityY);
        }
      }
    }

    this.#checkCollisions();
  }

  // the expression v * t + 1/2(a*t^2)
  // @param {number} - velocity: the hero's velocity to be used within the equation
  #bigFive3(velocity) {
    return velocity * this.#timeElapsed + 0.5 * this.#acceleration * (this.#timeElapsed ** 2);
  }

  // checks collisions with vampires, powerups, and the wall
  #checkCollisions() {
    // checks collision with vampires. reduces health and removes a heart if so. If the hero has no health left, sets isDead to true. 
    for (let i = Game.vampires.length - 1; i >= 0; i--) {
      if (Physics.hasCollided(this, Game.vampires[i])) {
        Game.vampires.splice(i, 1);
        this.health--;
        Images.hearts.pop();
      }
      if (this.health === 0) {
        Hero.isDead = true;
      }
    }

    //checks collisions with powerups. If collided, induces the powerup's effect and removes it from the screen.
    for (let i = Game.powerups.length - 1; i >= 0; i--) {
      if (Physics.hasCollided(this, Game.powerups[i])) {
        Game.powerups[i].action(this);
        Game.powerups.splice(i, 1);
      }
    }

    // checks collision with the border of the canvas; prevents hero from moving past the edge
    Physics.hasHitBorder(this);
  }
}