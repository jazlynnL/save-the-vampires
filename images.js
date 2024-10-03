// class to create and load all the images used in the game. 
class Images {
  // 4 vampires, left and right side for each
  static vampire0Left = new Image();
  static vampire0Right = new Image();
  static vampire1Left = new Image();
  static vampire1Right = new Image();
  static vampire2Left = new Image();
  static vampire2Right = new Image();
  static vampire3Left = new Image();
  static vampire3Right = new Image();

  // hero, left and right side
  static heroLeft = new Image();
  static heroRight = new Image();

  // grey floor background and menu background
  static background = new Image();
  static menuBackground = new Image();

  // array for health bar
  static hearts = [];
  // 8 hearts for health bar
  static heart1 = new Image();
  static heart2 = new Image();
  static heart3 = new Image();
  static heart4 = new Image();
  static heart5 = new Image();
  static heart6 = new Image();
  static heart7 = new Image();
  static heart8 = new Image();

  // two obstacles
  static rock1 = new Image();
  static rock2 = new Image();

  // three powerups
  static powerup1 = new Image();
  static powerup2 = new Image();
  static powerup3 = new Image();

  // sets sources for all images. sets width and height for the floor background.
  constructor() {
    Images.vampire0Left.src = "images/vampire0Left.png";
    Images.vampire0Right.src = "images/vampire0Right.png";
    Images.vampire1Left.src = "images/vampire1Left.png";
    Images.vampire1Right.src = "images/vampire1Right.png";
    Images.vampire2Left.src = "images/vampire2Left.png";
    Images.vampire2Right.src = "images/vampire2Right.png";
    Images.vampire3Left.src = "images/vampire3Left.png";
    Images.vampire3Right.src = "images/vampire3Right.png";

    Images.heroLeft.src = "images/heroLeft.png";
    Images.heroRight.src = "images/heroRight.png";

    Images.menuBackground.src = "images/startBackground.jpg";

    Images.background.src = "images/background.png";
    Images.background.width = 1920;
    Images.background.height = 1080;

    Images.heart8.src = "images/heart8.png";
    Images.heart7.src = "images/heart7.png";
    Images.heart6.src = "images/heart6.png";
    Images.heart5.src = "images/heart5.png";
    Images.heart4.src = "images/heart4.png";
    Images.heart3.src = "images/heart3.png";
    Images.heart2.src = "images/heart2.png";
    Images.heart1.src = "images/heart1.png";

    Images.rock1.src = "images/rock1.png";
    Images.rock2.src = "images/rock2.png";

    Images.powerup1.src = "images/apple.png";
    Images.powerup2.src = "images/health.png";
    Images.powerup3.src = "images/music.png";

    Images.resetHealth();
  }

  // puts all 8 hearts into the array to indicate full health
  static resetHealth() {
    Images.hearts = [Images.heart8, Images.heart7, Images.heart6, Images.heart5, Images.heart4, Images.heart3, Images.heart2, Images.heart1];
  }
}