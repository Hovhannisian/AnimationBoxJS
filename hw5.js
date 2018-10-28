
const canvas= document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1980;
canvas.height = 922.5;

const backImg = new Image();
backImg.src = "back1.jpg";

const heroRight = new Image();
heroRight.src = 'heroRight.png';

const heroLeft = new Image();
heroLeft.src = "heroLeft.png";



const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};



const hero = {
  x: 0,
  y: 540,
  w: 300,
  h: 400,
  img: heroRight,
  xDelta: 0, 
  yDelta: 0,
  draw: function(){
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  },
  update: function(){

    this.x+=this.xDelta;
    this.y+=this.yDelta;   
  },
};

const fooImg = new Image();
fooImg.src = 'police.png'

const foos = [];

const printFoos = function(num){
for(let i = 0; i < num; i++){

  foos[i] = {
    x: rand(canvas.width),
    y: 540,
    w: 300,
    h: 400,
    xDelta: -1,
    yDelta: 0,
    img: fooImg,
    draw: function() {
      context.drawImage(this.img, this.x, this.y, this.w, this.h);
    },
    update: function(){
       if(hero.y >522.5) {
      hero.yDelta = 0};
      
    this.x+=this.xDelta;
    this.y+=this.yDelta;
    },
  }
  
};
};

const intersect = function(char1, char2){
  const x = Math.max(char1.x, char2.x),
  num1 = Math.min(char1.x + char1.width -40, char2.x + char2.width-40),
  y = Math.max(char1.y, char2.y),
  num2 = Math.min(char1.y + char1.height, char2.y + char2.height);
  return (num1 >= x && num2 >= y);
    };



const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event){
  if(event.keyCode === rightKey){
    hero.xDelta=1;
    hero.img = heroRight;
  } else if(event.keyCode === leftKey){   
    hero.xDelta=-1;
    hero.img = heroLeft;
  }else if(event.keyCode===upKey){
    hero.yDelta = -20
  } 
  if(event.keyCode === rightKey&&upKey ){
    hero.xDelta=10;
    hero.yDelta=15;
  }
  if( event.keyCode === leftKey && upKey){
    hero.xDelta=-10;
    hero.yDelta=15;
  }

}, false)

document.addEventListener('keyup', function(event) {
  hero.xDelta = 0;
  hero.yDelta = 0;
}, false);



let num = 10;
printFoos(num);


const draw = function(){
  context.drawImage(backImg, 0, 0, canvas.width, canvas.height);
  hero.draw();
  for (let i = 0; i<foos.length; i++){
    foos[i].draw()
  };
  
};

const update = function(){
  hero.update();
  for(let i = 0; i<foos.length; i++){
    foos[i].update()
  };
  intersect(hero, foos);
};

const loop = function(){
  draw();
  update();
  requestAnimationFrame(loop);
};

loop();