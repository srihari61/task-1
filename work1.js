
var theCanvas = document.getElementById("myCanvas");
var ctx = theCanvas.getContext('2d');

draw();                                                                              //Initial setup of canvas so that user can input value for required fields

   if((document.getElementById("powergiven").value)!=NULL)                                              // In the browser window value in the fields of getting the user's angle and power is copied here                                    
   var choose = document.getElementById("powergiven").value;

   switch(choose){
      case 1:
      var speed=4; break;

      case 2:
      var speed=6; break;

      case 3:
      var speed=8; break;

      default:                                                                                
      var speed=0; break;
         }
   
   var gravity = .1; var lives=5; var pointCount=0;

   if((document.getElementById("anglegiven").value)!=NULL)
   var angle = document.getElementById("anglegiven").value;
   
   
   var radians = angle * Math.PI/ 180;
   var radius = 15;
   var vx = Math.cos(radians) * speed;
   var vy = Math.sin(radians) * speed;

 //  theCanvas = document.getElementById("canvasOne");
 //  ctx = theCanvas.getContext("2d");

   var p1 = {x:20,y:theCanvas.width-radius}; 
   //var p1 = {x:20,y:theCanvas.height-1-radius };                                                                          //Check 1 unchanged the value given in the tutorial                                                       
   var ball = {x:p1.x, y:p1.y, velocityx: vx, velocityy:vy, radius:radius}; 

 //  ctx.addEventListener("click",
    

  //  theCanvas = document.getElementById("canvasOne");
  // ctx = theCanvas.getContext("2d");






function draw(){

ctx.fillStyle = '#EEEEEE';
      ctx.fillRect(0, 0, theCanvas.width, theCanvas.height);
      //Box
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);

drawMountain();
drawTargetCannon();
drawUserCannon();
ctx.addEventListener("click",drawScreen);


}

//Movement of ball in parabola The function to be looped
function  drawScreen () {

      ctx.fillStyle = '#EEEEEE';
      ctx.fillRect(0, 0, theCanvas.width, theCanvas.height);
      //Box
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);


      drawMountain();
      drawTargetCannon();
      drawUserCannon();

      if (ball.y + ball.radius <= theCanvas.height) {
         ball.velocityy += gravity;
      } else {
         ball.velocityx = 0;
         ball.velocityy = 0;
         ball.y = theCanvas.height - ball.radius;

      }

      ball.y += ball.velocityy;
      ball.x += ball.velocityx;

      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fill();

      collisionCondition();

      if(lives==0)
      {  
         alert("Game Over");
         //Terminate and display points below
         //document.location.reload(draw());                                             Is this correcta na?
      }
      drawLives();
      drawScore();


requestAnimationFrame(drawScreen);
  
   } 
drawScreen();   
   





   

//Draw user cannon
function drawUserCannon(){
ctx.beginPath();
ctx.arc(20, theCanvas.width-radius, 20, 0, Math.PI*2, false);                                                           //Check 2 unchanged the value given in the tutorial
//ctx.arc(20, theCanvas.height-1-radius, 20, 0, Math.PI*2, false)
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

/* ctx.addEventListener("click",function callBall(){                                                                     //To call Ball to Fly From Cannon
drawBall();
});  */                                    

}

//Draw target Cannon
function drawTargetCannon(){
ctx.beginPath();
ctx.arc(480, theCanvas.width-radius, 20, 0, Math.PI*2, false);
var circle2={x2:480,y2: theCanvas.width-radius, rds:20};
//ctx.arc(480, theCanvas.height-1-radius, 20, 0, Math.PI*2, false);
ctx.fillStyle = "pink";
ctx.fill();
ctx.closePath();
}

//Draw Mountain
function drawMountain(){
   ctx.beginPath();
   ctx.moveTo(30,theCanvas.width-radius);                                                                                //Check 3
   //ctx.moveTo(30,theCanvas.height-1-radius);
   ctx.lineTo(250,150);
   ctx.lineTo(470,theCanvas.width-radius);                                                                                //Check 4 checks 4,3 similar to 1,2
   //ctx.lineTo(470,theCanvas.height-1-radius);                                                                             
   ctx.fillStyle = "blue";
   ctx.fill();
   ctx.closePath();

}


//ctx.addEventListener("click",)

//Draw Ball and call to make it fly



function collisionCondition()
{

   if(((65*ball.x)==(22850 - (44*ball.y)))||((65*ball.x)==((44*ball.y)+9650)))                         //Collision of ball with mountain
   {
      //Collision detected 
      lives--;
      //reload                                                 Calling draw() function is correcta na?  

   }
   else if((ball.y+ball.radius)>=(theCanvas.width-1))                                                  //Collision of ball with canvas bottom
   {
      //Collision Detected
      lives--;
      //reload                                                  Calling draw() function is correcta na? 
   }


   else                                                                                                //Collision of ball with the other tank
   {
      var dx= ball.x-circle2.x2;
      var dy=ball.y-circle2.y2;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius + circle2.rds) 
         {
            // collision detected!
            pointCount++;
            lives--;
            //reload                                           Calling draw() function is correcta na? 
         }
 
   } 

}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, canvas.width-65, 40);
 }

function drawLives()
{ 
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);

}