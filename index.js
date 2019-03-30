const canvas= document.querySelector('#myCanvas')
const ctx= canvas.getContext('2d')

// variables for ball
let xPosition= canvas.width/2;
let yPosition= canvas.height-30;
let dx=2;
let dy= -2;
const ballRadius=10;

//variables for paddle
const paddleWidth=75;
const paddleHeight=10;
let paddleX= (canvas.width-paddleWidth)/2
let rightPressed=false;
let leftPressed=false;

const drawBall=()=>{
    ctx.beginPath();
    ctx.arc(xPosition, yPosition, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle='red';
    ctx.fill();
    ctx.closePath()
}
const drawPaddle=()=> {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const keyDownHandler= (event)=>{
    if(event.key == 'Right'|| event.key == 'ArrowRight'){
        rightPressed= true;
    }
    if(event.key == 'Left'|| event.key == 'ArrowLeft'){
        leftPressed= true;
    }
    
}

const keyUpHandler= (event)=>{
    if(event.key == 'Right'|| event.key == 'ArrowRight'){
        rightPressed= false;
    }
    if(event.key == 'Left'|| event.key == 'ArrowLeft'){
        leftPressed= false;
    }
    
}



const startGame=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
   drawBall()
   drawPaddle()

 // checking for collision for left and right side
 if( xPosition + dx < ballRadius || xPosition + dx > canvas.width-ballRadius) {
    dx = -dx;
}
// checking for collision for top and bottom
   if(yPosition + dy < ballRadius||yPosition+dy>canvas.height-ballRadius) {
       console.log('fired!')
    dy = -dy;
   }
   //changing the position of the ball each time the canvas repaints
    xPosition+=dx;
    yPosition+=dy
   
    //moving the paddle
    if(rightPressed&& paddleX< canvas.width-paddleWidth){
        paddleX+=7
    }else if(leftPressed&& paddleX>0){
        paddleX-=7
    }
   requestAnimationFrame(startGame)
}

document.addEventListener('keydown',keyDownHandler,false)
document.addEventListener('keyup',keyUpHandler,false)
requestAnimationFrame(startGame)

// console.log(canvas.width,canvas.height)
