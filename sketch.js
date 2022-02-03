//declaração das variáveis
var trex, trex_running, edges;
var solo, soloImg,soloinvisivel;

//função de pré-carregamento
function preload()
{
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  soloImg = loadImage("ground2.png");
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

  //criar a borda
  edges = createEdgeSprites();

  //criar o solo
  solo = createSprite(200,180,400,20);
  solo.addImage("solo", soloImg);
  //criar solo invisivel
  soloinvisivel=createSprite(50,190,400,10);
  soloinvisivel.visible=false;
}

//desenho e animação
function draw()
{
  background("lightgray");

  //gerar número aleatório
  var mega = Math.round(random(1,60));
  console.log(mega);

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
  }

  //dar gravidade para o trex
  trex.velocityY = trex.velocityY + 0.5;

  //trex colide com o solo
  trex.collide(soloinvisivel);

  //posição do trex no eixo y
  //console.log(trex.y);

  drawSprites();

}

function gerarNuvens(){
  
}

