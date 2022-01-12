var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieGroup, zombieImg, enemy;
var life = 3;
var heart1Img, heart2Img, heart3Img;
var heart1, heart2, heart3;
var bullets = 80;
var gameState = "fight";
var Lose, Win;
var explosion;
var bulletImg, bullet;
var score = 0;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  bulletImg = loadImage("assets/bullet.png");

  explosion = loadSound("assets/explosion.mp3");




}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300)

  

  //creating heart sprite 
  heart1 = createSprite(displayWidth -150, 40,20,20);
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.3;

  heart2 = createSprite(displayWidth -100, 40,20,20);
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.3;

  heart3 = createSprite(displayWidth -180, 40,20,20);
  heart3.addImage("heart3",heart3Img);
  heart3.scale = 0.3



   bulletGroup = new Group()
   zombieGroup = new Group()
}

function draw() {
  background(0); 

  if(gameState === "fight"){
    if(life === 3){
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }
    if(life === 2){
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
  }
  if(life === 1){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }
  if(life === 0){
    gameState = "lost";
 }
 if(score == 100){
   gameState = "Won";

 }
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-20
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+20
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-20
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+20
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite(displayWidth -1150, player.y, 20,20);
 bullet.velocityX = 20;
 bullet.addImage(bulletImg);
 bullet.scale = 0.2;
 bulletGroup.add(bullet);
 player.depth = bullet.depth
 player.depth = player.depth+2
  player.addImage(shooter_shooting) 
  bullets = bullets-1
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullet == 0){
  gameState = "bullet"
}

enemy();

drawSprites();

textSize(20)
fill("white")
text("Bullets = " +bullets, displayWidth-210, displayHeight/2 -250);
text("Life = " +life, displayWidth-210, displayHeight/2 -220);
text("Score = " +score, displayWidth-210, displayHeight/2 -200);

}

function enemy(){
  if(frameCount %100 === 0 ){
  zombie = createSprite(random(1100,1100),random(100,500),40,40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -3
  zombie.debug = true
  zombie.setCollider("rectangle", 0,0,200,200);
  zombie.lifetime = 400;
  zombieGroup.add(zombie);
 }
}