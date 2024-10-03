// Class to deal with all the collisions and repeated methods within the game
class Physics {
  // for if the hero has hit the border of the canvas, makes sure they don't pass the edge.
  // @param {object} obj - takes in the object (the hero) so it can get its width, height, and position
  static hasHitBorder(obj) {
    // hit the left border
    if (obj.x <= 0) {
      obj.x = 0;
    }

    // hit the right border
    if (obj.x + obj.width >= Images.background.width) {
      obj.x = Images.background.width - obj.width;
    }

    // hit the top border
    if (obj.y <= 0) {
      obj.y = 0;
    }

    // hit the bottom border
    if (obj.y + obj.height >= Images.background.height) {
      obj.y = Images.background.height - obj.height;
    }
  }

  // for if a projectile collides with the border
  // @param {object} obj - takes in the projectile to determine its position
  // @return {boolean} returns true if it has hit the border, false if it has not
  static projectileCollided(obj) {
    if (obj.x <= 0 || obj.x + obj.width >= Images.background.width ||
      obj.y <= 0 || obj.y + obj.height >= Images.background.height) {
      return true;
    }
    return false;
  }

  // for if two objects have collided with each other
  // @param {object} obj1 - takes in the first object to check its position
  // @param {object} obj2 - takes in the second object to check its position
  // @return {boolean} returns true if the two objects have collided, false if they have not. 
  static hasCollided(obj1, obj2) {
    if (obj1.x + obj1.width > obj2.x &&
      obj1.x < obj2.x + obj2.width &&
      obj1.y + obj1.height > obj2.y &&
      obj1.y < obj2.y + obj2.height) {
      return true;
    }
    return false;
  }


  // for when the hero is at the edge of the map-- prevents the background from showing blank spaces
  // @param {object} hero - takes in the hero to determine its position
  static stationaryMap(hero) {
    let heroMiddleX = hero.x + hero.width / 2;
    let heroMiddleY = hero.y + hero.height / 2;

    // the default, assuming the hero is not at an edge, draws the background image relative to where the hero is. 
    let x = hero.x - (Canvas.width / 2 - hero.width / 2);
    let y = hero.y - (Canvas.height / 2 - hero.height / 2);

    // if the hero is at any edge of the map, draws the background image from the place where it will not show any blank spaces. 
    if (heroMiddleX <= Canvas.width / 2) {
      x = 0;
    }
    if (heroMiddleY <= Canvas.height / 2) {
      y = 0;
    }
    if (heroMiddleX >= Images.background.width - Canvas.width / 2) {
      x = Images.background.width - Canvas.width;
    }
    if (heroMiddleY >= Images.background.height - Canvas.height / 2) {
      y = Images.background.height - Canvas.height;
    }

    // @return {object} returns the x and y values of where the map should be drawn from depending on where the hero is
    return { x, y }
  }

  // generates a random x coordinate on the background
  // @return {number}: returns a random x position within the background
  static generateXPosition() {
    return Math.floor(Math.random() * (Images.background.width + 1));
  }

  // generates a random y coordinate on the background
  // @return {number}: returns a random y position within the backgroun
  static generateYPosition() {
    return Math.floor(Math.random() * (Images.background.height + 1));
  }
}