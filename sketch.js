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
  createCanvas(600,200);
  //criar o sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("trexCorrendo",trex_running);
  trex.addAnimation("trexColide",trex_collided);
  trex.scale = 0.5;

  //criar a borda
  edges = createEdgeSprites();

  //criar o solo
  solo = createSprite(200,180,400,20);
  solo.addImage("solo", soloImg);
  //criar solo invisivel
  soloinvisivel=createSprite(50,190,400,10);
  soloinvisivel.visible=false;
   cactos=new Group ();
   nuvens=new Group ();

   gameOver = createSprite(300,75);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.5;
   restart = createSprite(300,100);
   restart.addImage(restartImg);
   restart.scale = 0.5;
}

//desenho e animação
function draw()
{
  background("white");
  text("pontos: "+Pontos,500,20);
  if(estadodojogo===PLAY){
    //contagem dos pontos
    Pontos = Pontos + Math.round(frameCount/60);

    //visibilidade do GameOver e Restart
    gameOver.visible = false;
    restart.visible = false;
  
  //velocidade do solo
  solo.velocityX = -2;
  //console.log(solo.x);

  //reiniciar o solo
  if(solo.x<0){
    solo.x = solo.width/2;
  }

  //fazer o trex pular
  if(keyDown("space") && trex.y >= 161.5){
    trex.velocityY = -10;
    somPulo.play();
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

  drawSprites();

}

function gerarNuvens(){
  if(frameCount%60===0){
    nuvem=createSprite(520,20,40,40);
    nuvens.add(nuvem);
    nuvem.y=Math.round(random(20,50));
    nuvem.velocityX=-2;  
    nuvem.addImage(nuvemimg);
    //console.log(trex.depth);
    //console.log(nuvem.depth);
  trex.depth=nuvem.depth+1;
  nuvem.lifetime=300;
  }
}
function gerarCactos(){
if(frameCount%60===0){
var Cacto=createSprite(520,170,20,20);
cactos.add(Cacto);
Cacto.velocityX=-2;
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
