var gameState= 1
var astronaut1, astronaut2
var block, ghost, sky
var startTime, endTime
var fireball
var gameover
var music
var score=0

function preload(){
  astronautimage1= loadAnimation("images/astronaut1.png")
  astronautimage2= loadAnimation("images/astronaut2.png")
  blockimage= loadImage("images/block.png")
  ghostimage= loadImage("images/ghost.png")
  skyimage = loadImage("images/sky.jpeg")
  //skyimage2=loadImage("images/skyimage2.jpeg")
  backgroundimage=loadImage("images/background.png")
  gameoverimage=loadImage("images/gameover.png")
  fireball1=loadAnimation("images/fireball-1.png","images/fireball-2.png", "images/fireball-3.png", "images/fireball-4.png")
  //music=loadSound("images/Retro-Space-Hero.mp3")

  stoneimage=loadImage("images/stone.png")
  }

function setup() {
  createCanvas(displayWidth,displayHeight);
  astronaut1 =createSprite(displayWidth/2, displayHeight-10, 50, 50);
  astronaut1.addAnimation("image1",astronautimage1)

  astronaut1.addAnimation("image2",astronautimage2)

  ghostGroup=new Group ()
  astronaut1.debug=true
  astronaut1.setCollider("rectangle",0,0,50,100)
  
  startTime=new Date().getTime()
 //console.log(startTime.getSeconds())
 edges=createEdgeSprites()
}

function draw() {
  background("#33768E");

image (backgroundimage,0,-5*displayHeight,displayWidth,6*displayHeight)
drawSprites();  
if(gameState==1){
console.log(astronaut1.y)

//if((astronaut1.y)%5*displayHeight==0){
  //image (backgroundimage,0,-5*astronaut1.y,displayWidth,6*astronaut1.y)
//}
  if(keyWentDown("space")){
    console.log("hello")
    //astronaut1.addAnimation("image2",astronautimage2)
    astronaut1.changeAnimation("image2",astronautimage2)
     astronaut1.velocityY=-10


  }
//music.play()
 astronaut1.collide(edges[0])
 astronaut1.collide(edges[1])
 edges[2].visible=false
 edges[3].visible=false

  if(keyWentDown("right")){
    astronaut1.velocityX=20
  }
  if(keyWentDown("left")){
    astronaut1.velocityX=-20
  }

  if(keyWentUp("right")){
    astronaut1.velocityX=0
  }
  if(keyWentUp("left")){
    astronaut1.velocityX=0
  }
  camera.position.y= astronaut1.y
  camera.position.x=width/2

  
  obstacle()
if (astronaut1.isTouching(ghostGroup)){
  endTime=currentTime
  gameState=0

}  
currentTime=new Date().getTime()

textSize(25)
strokeWeight(5)
stroke ("white")
  text(dateDiffToString(startTime, currentTime),(width)*3/4,(astronaut1.y-300) )
  console.log(astronaut1.y)

score=score+Math.round(getFrameRate()/50)

  if(score > 150 && frameCount%100==0){
      var stone=createSprite(random(50,700),astronaut1.y-500,20,20)
      stone.addImage(stoneimage)
        stone.scale=0.2
        stone.velocityY=3+score/1000
        stone.debug=true
        ghostGroup.add(stone)
      }
  }


if(gameState==0){
  astronaut1.velocityY=0
  astronaut1.velocityX=0

  //ghostGroup.setVelocityEach(0,0)

 gameover=createSprite(width/2, astronaut1.y,20,20)
 gameover.addImage(gameoverimage)
 gameover.scale=1
ghostGroup.setVelocityEach(0,0)
 textSize(25)
 strokeWeight(5)
 stroke ("white")
 text(dateDiffToString(endTime, startTime),(width)*3/4,(astronaut1.y-300) )

 //gameover.setVelocity(0,0)
  //startTime=new Date().getTime()
 //console.log(startTime)
text("Press Space to Restart") 
 if (keyDown("x")){
gameover.visible=false
  reset()
 
 }

}
fill("white")
textSize(50)
 text(score,700,astronaut1.y)
 
}

 




function obstacle(){

  if(frameCount%Math.round(random(40,50))==0){
o = createSprite (random(0,width),astronaut1.y-500)
var number=Math.round(random(1,2))
if(number==1){
  o .addImage(ghostimage) 
  //o.setCollider("cirle",0,0,40)
}
else if(number==2){
o.addAnimation("fire",fireball1)
o.scale=0.1
}
ghostGroup.add(o)
o.velocityY=4+score/1000
o.setCollider("circle",0,0,40)
o.debug=true

o.lifetime=900

  }

}


function dateDiffToString(a, b){


  diff = Math.abs(a - b);

  ms = diff % 1000;
  diff = (diff - ms) / 1000
  ss = diff % 60;
  diff = (diff - ss) / 60
  mm = diff % 60;
  diff = (diff - mm) / 60
  hh = diff % 24;
  days = (diff - hh) / 24

  return "MM : " +mm+" SS : "+ss+"."+ms;

}

function reset(){
  gameState=1
  startTime=new Date().getTime()
  //endTime=0
gameover.destroy()
image (backgroundimage,0,-5*displayHeight,displayWidth,6*displayHeight)
astronaut1.x=displayWidth/2 
astronaut1.y= displayHeight-10
ghostGroup.destroyEach()

score=0

}

