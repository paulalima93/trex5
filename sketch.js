var trex, trex_running;
var ground, ground_image;
var invisible_ground;
var cloud, cloud_image;
var obstacle;
var obstacle_image1, obstacle_image2, obstacle_image3, obstacle_image4, obstacle_image5, obstacle_image6;
var score = 0;
var cloudsGroup, obstaclesGroup;

var gameState = "play"

//carrega imagens e armazena nas variáveis
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle_image1 = loadImage("obstacle1.png");
  obstacle_image2 = loadImage("obstacle2.png");
  obstacle_image3 = loadImage("obstacle3.png");
  obstacle_image4 = loadImage("obstacle4.png");
  obstacle_image5 = loadImage("obstacle5.png");
  obstacle_image6 = loadImage("obstacle6.png");

}

function setup(){
  createCanvas(600,200)
  
  //cria o sprite do chão com animação
  ground = createSprite(300,190,600,20);
  ground.addImage("chaozinho", ground_image);
  ground.velocityX = -3;

  //crie um sprite de trex
  trex = createSprite(50, 150, 50,50);
  trex.addAnimation("correndo", trex_running);
  trex.scale = 0.5;

  //cria o chão invisível
  invisible_ground = createSprite(300,196,600,5);
  invisible_ground.visible = false;

  // var aleatorio = Math.round(random(1,10))
  // console.log(aleatorio)

  obstaclesGroup = new Group()
  cloudsGroup = new Group()
  
}

function draw(){
  background("white");

  text("Pontuação: " + score, 500, 50)
  


  if(gameState === "play") {
    if(ground.x < 0){
      ground.x = ground.width/2
    }

    if(keyDown("space") && trex.y > 165){
      trex.velocityY = -10;
    }

    spawnClouds();
    spawnObstacles();

    score = score + Math.round(frameCount/60);


    if(trex.isTouching(obstaclesGroup)){
      gameState = "end"
    }

  } else if(gameState === "end") {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
  }


  trex.velocityY += 0.5;

  trex.collide(invisible_ground);

  drawSprites();


}

function spawnClouds(){
 // console.log(frameCount)
  if(frameCount % 60 === 0){
    cloud = createSprite(700,100,40,10);
    cloud.velocityX = -3;
    cloud.y = Math.round(random(20,100));
    cloud.addImage(cloud_image);
    cloud.scale = 0.7

    cloud.depth = trex.depth;
    trex.depth += 1;
    //trex.depth = trex.depth + 1

    //como calcular o tempo exato para passar da tela
    //largura da tela / velocidade da nuvem
    // 700/3 = 233, coloquei 250 de folga pra não sumir ao passar
    cloud.lifetime = 250;

    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    obstacle = createSprite(700, 175, 10, 40);
    obstacle.velocityX = -10;
    obstacle.scale = 0.6
    obstacle.lifetime = 250;
    var aleatorio = Math.round(random(1,6))

    switch(aleatorio){
      case 1: obstacle.addImage(obstacle_image1);
        break;
      case 2: obstacle.addImage(obstacle_image2);
        break;
      case 3: obstacle.addImage(obstacle_image3);
        break;
      case 4: obstacle.addImage(obstacle_image4);
        break;
      case 5: obstacle.addImage(obstacle_image5);
        break;
      case 6: obstacle.addImage(obstacle_image6);
        break;
    }

    obstaclesGroup.add(obstacle)
  }
}


