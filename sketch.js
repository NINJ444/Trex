//declaração das variáveis
var trex, trex_running, edges, trex_collided;
var solo, soloImg,soloinvisivel;
var nuvem,nuvemimg;
var Cacto1,Cacto2,Cacto3,Cacto4,Cacto5,Cacto6;
var Pontos=0;
var nuvens;
var cactos;
var START=1;
var PLAY=2;
var END=0;
var estadodojogo=PLAY;
var gameOver, gameOverImg, restart, restartImg;
var somPulo, somMorte, somPonto;
//função de pré-carregamento
function preload()
{
 nuvemimg=loadImage("cloud.png");
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  soloImg = loadImage("ground2.png");
  Cacto1 = loadImage("obstacle1.png");
  Cacto2 = loadImage("obstacle2.png");
  Cacto3 = loadImage("obstacle3.png");
  Cacto4 = loadImage("obstacle4.png");
  Cacto5 = loadImage("obstacle5.png");
  Cacto6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  somPulo = loadSound("jump.mp3");
  somMorte = loadSound("die.mp3");
  somPonto = loadSound("checkPoint.mp3");

}

//função de configuração
function setup()
{
  //criar tela
  createCanvas(windowWidth,windowHeight);
  //criar o sprite do trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("trexCorrendo",trex_running);
  trex.addAnimation("trexColide",trex_collided);
  trex.scale = 0.5;

  //criar a borda
  edges = createEdgeSprites();

  //criar o solo
  solo = createSprite(width/2,height-20,width,20);
  solo.addImage("solo", soloImg);
  solo.scale=2
  //criar solo invisivel
  soloinvisivel=createSprite(50,height-10,400,10);
  soloinvisivel.visible=false;
   cactos=new Group ();
   nuvens=new Group ();

   gameOver = createSprite(width/2,height/2-25);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.5;
   restart = createSprite(width/2,height/2);
   restart.addImage(restartImg);
   restart.scale = 0.5;
}

//desenho e animação
function draw()
{
  background("white");
  text("pontos: "+Pontos,width-100,20);
  if(estadodojogo===PLAY){
    //contagem dos pontos
    Pontos = Pontos + Math.round(getFrameRate()/60);

    //visibilidade do GameOver e Restart
    gameOver.visible = false;
    restart.visible = false;
  
  //velocidade do solo
  solo.velocityX = -3-3*Pontos/100;
  //console.log(solo.x);

  //reiniciar o solo
  if(solo.x<0){
    solo.x = solo.width/2;
  }

  //fazer o trex pular
  if(touches.length>0 || (keyDown("space")) && trex.y >= height-38.5){
    trex.velocityY = -10;
    somPulo.play();
    touches=[];
  }

  //dar gravidade para o trex
  trex.velocityY = trex.velocityY + 0.5;
  gerarCactos();
  gerarNuvens();

  if(cactos.isTouching(trex)){
    estadodojogo = END;
    somMorte.play();
  }

}
  else if(estadodojogo===END){
    trex.velocityY = 0
    solo.velocityX = 0;
    cactos.setVelocityXEach(0);
    nuvens.setVelocityXEach(0);

    cactos.setLifetimeEach(-1);
    nuvens.setLifetimeEach(-1);
    
    gameOver.visible = true;
    restart.visible = true;

    trex.changeAnimation("trexColide",trex_collided);
  }
//trex colide com o solo
  trex.collide(soloinvisivel);

  //posição do trex no eixo y
  //console.log(trex.y);

  //chamar a função da nuvem

//exibir o frameCount
//console.log(frameCount);

  if(touches.length>0 || mousePressedOver(restart)){
  reset();
  touches=[];
  }
drawSprites();

}

function gerarNuvens(){
  if(frameCount%60===0){
    nuvem=createSprite(width,height-100,40,40);
    nuvens.add(nuvem);
    nuvem.y=Math.round(random(height-150,height-100));
    nuvem.velocityX=-2;  
    nuvem.addImage(nuvemimg);
    //console.log(trex.depth);
    //console.log(nuvem.depth);
  trex.depth=nuvem.depth+1;
  nuvem.lifetime=300;
  }
}
function gerarCactos(){
if(frameCount%70===0){
var Cacto=createSprite(width,height-30,20,20);
cactos.add(Cacto);
Cacto.velocityX=-6-Pontos/100;
 //gerar número aleatório
 var N = Math.round(random(1,6));
switch(N){
case 1:Cacto.addImage(Cacto1);
break;
case 2:Cacto.addImage(Cacto2);
break;
case 3:Cacto.addImage(Cacto3);
break;
case 4:Cacto.addImage(Cacto4);
break;
case 5:Cacto.addImage(Cacto5);
break;
case 6:Cacto.addImage(Cacto6);
break;
default:break;
}
Cacto.scale=0.5;
Cacto.lifetime=300;
}
}
function reset(){
  Pontos=0;
  estadodojogo=PLAY;
  trex.changeAnimation("trexCorrendo",trex_running);
  cactos.destroyEach();
  nuvens.destroyEach();
}