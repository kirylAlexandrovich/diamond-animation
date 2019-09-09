const diamondCanvas = document.getElementById('diamondCanvas');

const startSprite = new Image();
startSprite.src = './images/bri_big_anim_start.png';

const middleSprite = new Image();
middleSprite.src = './images/bri_big_anim_middle.png';

const finishSprite = new Image();
finishSprite.src = './images/bri_big_anim_finish.png';

const spritesObj = {
  first: {
    img: startSprite,
    width: 392,
    height: 372,
    x: 1,
  },
  second: {
    img: middleSprite,
    width: 449,
    height: 432,
    x: 2,
  },
  third: {
    img: finishSprite,
    width: 326,
    height: 337,
    x: 3,
  },
}

const diamond = diamondCanvas.getContext("2d");

let imgDimensions = 20;
let spritePositionX = 0;
let imgPositionX = window.innerWidth / 2;
let imgPositionY = window.innerHeight / 2;

function diamondDraw(currentImgObj) {
  diamondCanvas.width = window.innerWidth;
  diamondCanvas.height = window.innerHeight;

  const spritePositionY = 0;

  diamond.clearRect(0, 0, diamondCanvas.width, diamondCanvas.height);

  diamond.drawImage(
    currentImgObj.img,
    spritePositionX,
    spritePositionY,
    currentImgObj.width,
    currentImgObj.height,
    imgPositionX,
    imgPositionY,
    imgDimensions,
    imgDimensions);
}

let currentSprite = spritesObj.first;

function animationSprite() {
  // console.log(currentSprite)

  spritePositionX >= currentSprite.width * 3 ?
    spritePositionX = 0 :
    spritePositionX = spritePositionX + currentSprite.width;

  diamondDraw(currentSprite);
}

let counter = 0;
let halfScreen = window.innerWidth / 2;

function moveAndScaleAnimation() {

  if (imgDimensions < 400 && currentSprite === spritesObj.first) {
    imgDimensions += 10;
  }
  else if (currentSprite === spritesObj.first) {
    currentSprite = spritesObj.second;
    spritePositionX = 0;
  }

  if (counter < 20 && currentSprite === spritesObj.second) {
    counter += 1
  }
  else if (currentSprite === spritesObj.second) {
    currentSprite = spritesObj.third;
    spritePositionX = 0;
  }

  if (imgDimensions > 20 && currentSprite === spritesObj.third) {
    imgDimensions -= 10;
    halfScreen -= 10;
    imgPositionY -= 10;
  } 
  else if (currentSprite === spritesObj.third) {
    currentSprite = spritesObj.first;
    spritePositionX = 0;
    halfScreen = window.innerWidth / 2;
    imgPositionY = window.innerHeight / 2;
  }

  imgPositionX = halfScreen - imgDimensions / 2;

  diamondDraw(currentSprite);
}

setInterval(moveAndScaleAnimation, 40);

middleSprite.onload = setInterval(animationSprite, 250);


