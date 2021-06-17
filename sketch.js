var towerImage,tower;
var doorImage,door,doorGroups
var climberImage,climber,climberGroups
var ghost,ghostImage;
var gameState="play"
var invisibleBlockGroups,invisibleBlock;

function preload() {
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
}
function setup() {
    createCanvas(600, 600);
    spookySound.loop();
   tower=createSprite(300,300);
   tower.addImage(towerImage);
   tower.velocityY=1
   ghost=createSprite(200,200,50,50);
   ghost.addImage(ghostImage);
   ghost.scale=0.3;
   doorGroups=new Group();
   climberGroups=new Group();
   invisibleBlockGroups=new Group();
}

function draw() {
  background(200);
  if (gameState==="play") {
    if (keyDown("left_arrow") ) {
      ghost.x=ghost.x-3
    }
    if (keyDown("right_arrow") ) {
      ghost.x=ghost.x+3
    }
    if (keyDown("space") ) {
      ghost.velocityY=-10
    }
    ghost.velocityY=ghost.velocityY+0.8;
    if (tower.y>400) {
      tower.y=300
    }
    spawn();
    if (climberGroups.isTouching(ghost)) {
      ghost.velocityY=0;
    }
    if (invisibleBlockGroups.isTouching(ghost)||ghost.y>600) {
      ghost.destroy();
      gameState="end"
    }
  }
  drawSprites();
  if (gameState==="end") {
    fill("yellow");
    textSize(30);
    text("gameover",230,250)
  }
}
function spawn() {
  if (frameCount%240===0) {
    door=createSprite(200,-50)
    climber=createSprite(200,10)
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(120,400))
    climber.x=door.x
    invisibleBlock.x=door.x
    door.addImage(doorImage)
    climber.addImage(climberImage)
    door.velocityY=1
    climber.velocityY=1
    invisibleBlock.velocityY=1
    ghost.depth=door.depth
    ghost.depth=ghost.depth+1
    door.lifeTime=600
    climber.lifeTime=600
    doorGroups.add(door)
    invisibleBlockGroups.add(invisibleBlock)
    climberGroups.add(climber)
    
  }
}