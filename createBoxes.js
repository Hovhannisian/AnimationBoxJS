const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillRect(0,0,canvas.width, canvas.height)
    

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};


const createBoxes = function(num, width, height){

  canvas.width = width;
  canvas.height= height;
  const palette = ['yellow', 'yellow','lightBlue', 'pink'];

 
  let data = [];
  for(let i = 0; i < num; i++){
    data[i] = {
        x: rand(width - 30),
        y: rand(height - 30),
        width: 30,
        height:30,
        speedX:5,
        speedY:5,
        color : palette[rand(palette.length-1)], 
        draw: function(){
          context.fillStyle = this.color;
          context.fillRect(this.x, this.y, this.width, this.height)
        },
        update: function(){
          this.x=this.x+this.speedX;
          this.y=this.y+this.speedY;

          if(this.x>canvas.width-this.width||this.x<=0)
          this.speedX=this.speedX*(-1);
          if(this.y>canvas.height-this.height||this.y<=0)
          this.speedY=this.speedY*(-1)
    
        }
      } 
  }
  return data;
};

const boxes = createBoxes(50,700, 500);

const loop = function() {
  context.clearRect(0,0,canvas.width, canvas.height);
  for(let i=0; i < boxes.length; i++) { 
    boxes[i].draw();
    console.log(boxes[i]);
    boxes[i].update();
  };
  requestAnimationFrame(loop)
};

loop();