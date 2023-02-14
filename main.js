var ball, ballImage;
var paddle;
var alienGroup;
var edges;
var blueImage, greenImage, redImage, yellowImage, paddleImage, bgImage;
var score=0
var gamestate="inicio"
var vida=3


function preload(){
    ballImage= loadImage("ball.png")
    blueImage= loadImage("blue.png")
    greenImage= loadImage("green.png")
    yellowImage= loadImage("yellow.png")
    redImage= loadImage("red.png")
    paddleImage=loadImage("Spaceship.png")
    bgImage=loadImage("bg.jpg")
}

// Se ejecutará una vez al inicio
function setup() {
    createCanvas(700, 700);
    ball = createSprite(340,550,10,10);
    ball.addImage("ball",ballImage);
    ball.scale=0.05;
    ball.velocityX =0;
    ball.velocityY =0;
   
    paddle = createSprite(340, 600, 120, 10);
    paddle.shapeColor = "blue";
    paddle.addImage("paddle",paddleImage)
    paddle.scale=0.1
    
    edges=createEdgeSprites();
    
   // Llamada en la clase 27
   alienGroup= createGroup();
    createAlienRow(100, redImage);
    createAlienRow(100+65, blueImage);
    createAlienRow(100+65+65, yellowImage);
    createAlienRow(100+65+65+65, greenImage);
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
// Se ejecutará varias veces
function draw() {
    // Rellena el lienzo con un gris claro, cubriendo las imágenes previas
    background(bgImage);
    textSize(30);
    fill("black")

    if(gamestate==="inicio"){
        text("Presiona la barra espaciadora para servir la pelota.", 10,380);  
        if(keyDown("space")){

            ball.velocityX = 6;
            ball.velocityY = 6;
          
            if(gamestate==="inicio"){
                gamestate="jugada"
                ball.velocityX = -6;
            ball.velocityY = -6;
            }
        }  
    }
    else if (gameplay==="fin") {
  
        text("fin del juego: " ,300,370)

    }
    else{
    gameplay();
    }
    
    text("score: "+ score,565,50) 
    text("vida: "+ vida, 50,50)
    
    drawSprites();
}

// Agregado en la clase 27
function createAlienRow(y, alienImage) {
var x = 125
  for(var c=0; c<6; c++)
  {
    var alien = createSprite(x,y,50, 25);
     x+= alien.width + 40;
    alien.addImage("coloralien",alienImage);
    alien.scale=0.07;
 alienGroup.add(alien)
      
}
}
function alienHit(ball, alienGroup){
 alienGroup.remove();   
score= score+5;
}
function gameplay(){

    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
    
    ball.bounceOff(paddle);
    ball.bounceOff(alienGroup,alienHit);
    
        paddle.x=mouseX
        if(paddle.x<60){
     paddle.x=60;   
        
        }
if(paddle.x>650){
paddle.x=640;
}
if(ball.isTouching(edges[3])){
findevida();

}
    }

    function findevida(){
vida=vida-1;
if (vida>=1){
    gamestate="inicio"


}
else{
gamestate="fin"

}

    }
