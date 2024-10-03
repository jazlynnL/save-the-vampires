 // Class representing the obstacles. 
class Obstacle {
  // declares variables of x, y, width, height, and display, all of which will vary between the two types of obstacles. 
  x;
  y;
  width;
  height;
  display;
  // @param {object} hero - the hero of the game
  constructor(hero) {
    this.hero = hero;
  }

  // generates a random position for the rock to spawn, ensuring it does not spawn where the player will be. 
  generatePositions() {
    this.x = Physics.generateXPosition();
    this.y = Physics.generateYPosition();
    if (Physics.hasCollided(this.hero, this)) {
      this.generatePositions();
    }
  }

  // if the passed in type is 1, creates a new Rock1. if the passed in type is 2, creates a new rock2. 
  // @param {object} hero - passes in the hero to help with generatePositions()
  // @param {number} type - creates one of two obstacles based on the type
  static generateObstacle(hero, type) {
    if (type === 1) {
      // @return {object} Creates a new rock1 if the type was 1
      return new Rock1(hero);
    } else if (type === 2) {
      // @return {object} Creates a new rock2 if the type was 2
      return new Rock2(hero);
    }
  }

  //draws the obstacle
  draw() {
    Canvas.context.drawImage(this.display, this.x, this.y, this.width, this.height);
  }
}

// class representing rock1. Sets its width, height, and display.
// @extends Obstacle
class Rock1 extends Obstacle {
  width = 90;
  height = 58;
  display = Images.rock1;
  // @param {object} hero - passes in the hero
  // calls generatePositions() to determine where to draw the rock.
  constructor(hero) {
    super(hero);
    this.generatePositions();
  }
}

// class representing rock2. Sets its width, height, and display.
// @extends Obstacle
class Rock2 extends Obstacle {
  width = 67;
  height = 46;
  display = Images.rock2;
  // @param {object} hero - passes in the hero
  // calls generatePositions() to determine where to draw the rock.
  constructor(hero) {
    super(hero);
    this.generatePositions();
  }
}