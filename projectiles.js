// class representing the projectiles
// @param {number} mouseX - the x position of where the user clicked
// @param {number} mouseY - the y position of where the user clicked
// @param {object} hero - the current hero of the game
// on instantiation, calculates the angle to the cursor from the hero. Sets the projectile to start at wherever the hero's position is. 
class Projectile {
  #width = 5;
  #height = 5;
  #colour = '#000000';
  #velocity = 600 / Game.fps
  constructor(mouseX, mouseY, hero) {
    this.hero = hero;
    this.x = hero.x + hero.width / 2;;
    this.y = hero.y + hero.height / 2;
    const rise = mouseY - this.y + Physics.stationaryMap(hero).y;
    const run = mouseX - this.x + Physics.stationaryMap(hero).x;
    this.angle = Math.atan2(rise, run);
  }

  // getter for projectile width.
  // @return {number} The width, in pixels.
  get width() {
    return this.#width;
  }

  // getter for projectile height
  // @return {number} The height, in pixels.
  get height() {
    return this.#height;
  }

  //draws the projectile
  draw() {
    Canvas.context.fillStyle = this.#colour;
    Canvas.context.fillRect(this.x, this.y, this.#width, this.#height);
  }

  // updates the position of the projectile based on the angle calculated
  update() {
    let velocityX = this.#velocity * Math.cos(this.angle);
    let velocityY = this.#velocity * Math.sin(this.angle);
    this.x += velocityX;
    this.y += velocityY;
  }

  // checks collision for the projectile with vampires, obstacles, and the border
  static checkCollisions() {
    for (let i = Game.projectiles.length - 1; i >= 0; i--) {
      // checks to see if the instance of the projectile collided with a vampire. if so, decreases the vampires health and removes the projectile from the array of things to be drawn. If the vampire's health has depleted, removes it from its array and adds to the vampire saved count.
      for (let j = Game.vampires.length - 1; j >= 0; j--) {
        if (Physics.hasCollided(Game.projectiles[i], Game.vampires[j])) {
          Game.vampires[j].health--;
          Game.projectiles.splice(i, 1);
          if (Game.vampires[j].health === 0) {
            Game.vampires.splice(j, 1);
            Vampire.count++;
          }
          break;
        }
      }

      // checks that the projectile was not spliced above. 
      if (Game.projectiles[i]) {
        // if the projectile hits a rock, removes it from its array
        for (let j = Game.obstacles.length - 1; j >= 0; j--) {
          if (Physics.hasCollided(Game.projectiles[i], Game.obstacles[j])) {
            Game.projectiles.splice(i, 1);
            break;
          }
        }
      }

      // checks that the projectile was not spliced above. 
      if (Game.projectiles[i]) {
        // if the projectile hits the border, removes it from its array
        if (Physics.projectileCollided(Game.projectiles[i])) {
          Game.projectiles.splice(i, 1);
        }
      }
    }
  }
}