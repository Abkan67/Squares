const Engine=Matter.Engine;
const World=Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var obj1Move=null;
var obj2Move=null;
var obj1Angle=null;
var obj2Angle=null;
var gameState="play";
var chain;

var engine = Engine.create();
var world = engine.world;
var obj, obj2, ground, wallLeft, wallRight, ceiling;
var objwidth=40; var objlength=40;
var obj2width=40; var obj2length=40;
var previousObj1Angle;
var Xspeed=0.9; var turnSpeed=Math.PI/5.5; var Yspeed=1.5;
world.gravity.y=0.8;
const options = {restitution:2, friction:0.05};
const groundwidth=8000;
const groundheight=1000;
const ceilingwidth=8000
const ceilingheight=1000;


function boxSetMove(e) {
  if(e.key=="a"||e.key=="A"){
    obj1Move="left";
  } else if (e.key == "d"||e.key=="D") {
    obj1Move="right";
  } if (e.key == "w"||e.key=="W") {
    obj1Angle="up";
  } else if (e.key=="s"||e.key=="S") {
    obj1Angle="down";
  }
  if(e.key=="ArrowLeft"){
    obj2Move="left"
  } else if(e.key=="ArrowRight") {
    obj2Move="right";
  } if(e.key=="ArrowUp") {
    obj2Angle="up";
  } else if (e.key=="ArrowDown") {
    obj2Angle="down";
  }
}
function boxUnsetMove(e) {
  if((e.key=="a"||e.key=="A") && obj1Move=="left"){
    obj1Move=null;
  } else if ((e.key == "d"||e.key=="D") && obj1Move=="right") {
    obj1Move=null;
  } if ((e.key == "w"||e.key=="W") && obj1Angle=="up") {
    obj1Angle=null;
  } else if ((e.key=="s"||e.key=="S") && obj1Angle=="down") {
    obj1Angle=null;
  }
  if(e.key=="ArrowLeft" && obj2Move=="left"){
    obj2Move=null;
  } else if(e.key=="ArrowRight" && obj2Move=="right") {
    obj2Move=null;
  } if(e.key=="ArrowUp" && obj2Angle=="up") {
    obj2Angle=null;
  } else if (e.key=="ArrowDown" && obj2Angle=="down") {
    obj2Angle=null;
  }
}
function boxMove() {
  if(obj1Move=="left"){
    Body.setVelocity(obj, {x:obj.velocity.x-Xspeed, y:-Yspeed});
  } else if (obj1Move == "right") {
    Body.setVelocity(obj, {x:obj.velocity.x+Xspeed,y:-Yspeed});
  } if (obj1Angle == "up") {
    Body.setAngularVelocity(obj, turnSpeed);
  } else if (obj1Angle=="down") {
    Body.setAngularVelocity(obj, -turnSpeed);
  }
  if(obj2Move=="left"){
    Body.setVelocity(obj2, {x:obj2.velocity.x-Xspeed, y:-Yspeed});
  } else if(obj2Move=="right") {
    Body.setVelocity(obj2, {x:obj2.velocity.x+Xspeed, y:-Yspeed});
  } if(obj2Angle=="up") {
    Body.setAngularVelocity(obj2, turnSpeed);
  } else if (obj2Angle=="down") {
    Body.setAngularVelocity(obj2, -turnSpeed);
  }
}
window.addEventListener("keydown", boxSetMove);
window.addEventListener("keyup", boxUnsetMove);


function setup() {
  createCanvas(800,400);
  angleMode(RADIANS);

//  wallLeft = Bodies.rectangle(-60,200,200,800, {isStatic:true});
//  wallRight = Bodies.rectangle(860,200,200,800, {isStatic:true});
  ceiling = Bodies.rectangle(400,40-(ceilingheight/2),ceilingwidth,ceilingheight, {isStatic:true});
  ground = Bodies.rectangle(400, 360+(groundheight/2), groundwidth, groundheight, {isStatic:true});
//  World.add(world, [wallLeft, wallRight]);
  World.add(world, [ground,ceiling]);

  obj=Bodies.rectangle(100,100,objwidth,objlength, options);
  World.add(world, obj);
  obj2 = Bodies.rectangle(700,100,obj2width,obj2length, options);
  World.add(world, obj2);
 /*     chain = Constraint.create({
	bodyA: obj,
	bodyB: obj2,
	length: 60,
        stiffness: 5
})
  World.add(world, chain);    */
}

function draw() {
  background(0);

    var spinspeedtoincrease=1000000000000000000000000000000000000000000000000000000000
   obj2.mass=obj2.angularVelocity*spinspeedtoincrease+1;
  obj.mass=obj.angularVelocity* spinspeedtoincrease+1;
  Engine.update(engine);
  rectMode(CENTER);


    boxMove();

  if(obj.position.y<-20){Body.setPosition(obj, {x:obj.position.x,y:60});        }
  if(obj.position.y>820){Body.setPosition(obj, {x:obj.position.x,y:700});       }
  if(obj2.position.y<-20){Body.setPosition(obj2, {x:obj2.position.x,y:60});     }
  if(obj2.position.y>820){Body.setPosition(obj2, {x:obj2.position.x,y:700});    }



    drawSquares();


  if((obj.position.x<-20||obj.position.x>820)&&gameState=="play"){alert("blue wins"); gameState="over";}
  if((obj2.position.x<-20||obj2.position.x>820)&&gameState=="play"){alert("green wins"); gameState="over";}

/*  push();
  stroke("yellow");
  strokeWeight(3)
  line(obj.position.x, obj.position.y, obj2.position.x, obj2.position.y);
  pop();
*/
}
function drawSquares() {
  rectMode(CENTER);
    rect(ground.position.x,ground.position.y,groundwidth,groundheight);
  //  rect(wallRight.position.x, wallRight.position.y,200,800);
  //  rect(wallLeft.position.x,wallLeft.position.y,200,800);
    rect(ceiling.position.x,ceiling.position.y,ceilingwidth,ceilingheight);



  push();
  translate(obj2.position.x, obj2.position.y);
  rotate(obj2.angle);
  fill(0,0,255);
  rectMode(CENTER);
  rect(0,0,obj2width,obj2length);
  pop();



  push();
  translate(obj.position.x, obj.position.y);
  rotate(obj.angle);
  fill(0,255,0);
  rectMode(CENTER);
  rect(0, 0, objwidth, objlength);
  pop();
}
