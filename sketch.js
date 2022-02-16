//declaração das variáveis
var trex, trex_running, edges;
var solo, soloImg,soloinvisivel;
var nuvem,nuvemimg;
var Cacto1,Cacto2,Cacto3,Cacto4,Cacto5,Cacto6;
var Pontos=0;
var nuvens;
var cactos;
var PLAY=1;
var END=0;
var estadodojogo=PLAY;
//função de pré-carregamento
function preload()
{
 nuvemimg=loadImage("cloud.png");
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  soloImg = loadImage("ground2.png");
  Cacto1 = loadImage("obstacle1.png");
  Cacto2 = loadImage("obstacle2.png");
  Cacto3 = loadImage("obstacle3.png");
  Cacto4 = loadImage("obstacle4.png");
  Cacto5 = loadImage("obstacle5.png");
  Cacto6 = loadImage("obstacle6.png");
}

//função de configuração
function setup()
{
  //criar tela
  createCanvas(600,200);
  //criar o sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("trexCorrendo",trex_running);
  trex.scale = 0.5;
  //sensor de colisão
  trex.setCollider("circle",0,0,35);
  trex.debug = false;

  //criar a borda
  edges = createEdgeSprites();

  //criar o solo
  solo = createSprite(200,180,400,20);
  solo.addImage("solo", soloImg);
  //criar solo invisivel
  soloinvisivel=createSprite(50,190,400,10);
  soloinvisivel.visible=false;
   cactos=new Group();
   nuvens=new Group();
}

//desenho e animação
function draw()
{
  background("white");
  text("pontos: "+Pontos,500,20);
  
  if(estadodojogo===PLAY){
  //contagem dos pontos
  Pontos = Pontos + Math.round(frameCount/60);
  
  //velocidade do solo
  solo.velocityX = -3;

  //reiniciar o solo
  if(solo.x<0){
    solo.x = solo.width/2;
  }

  //fazer o trex pular
  if(keyDown("space") && trex.y >= 161.5){
    trex.velocityY = -12;
  }

  //dar gravidade para o trex
  trex.velocityY = trex.velocityY + 0.5;
  
  //gerar nuvens e cactos 
  gerarCactos();
  gerarNuvens();

  //verifica se o trex bate no cacto
  if(cactos.isTouching(trex)){
    estadodojogo = END;
  }
}
  else if(estadodojogo===END){
    trex.velocityY = 0;
    solo.velocityX = 0;
    cactos.setVelocityXEach(0);
    nuvens.setVelocityXEach(0);
    cactos.setLifetimeEach(-1);
    nuvens.setLifetimeEach(-1);
  }
//trex colide com o solo
  trex.collide(soloinvisivel);

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
if(frameCount%120===0){
var Cacto=createSprite(520,170,20,20);
cactos.add(Cacto);
Cacto.velocityX=-3;
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
