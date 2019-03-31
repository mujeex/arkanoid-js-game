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

//variables for creating the bricks
const brickRowCount=3;
const brickColumnCount=5;
const brickWidth= 75;
const brickHeight=20;
const brickPadding = 10;
const brickOffsetTop= 30;
const brickOffsetLeft= 30;

//creating brick objects
const bricks=[]
for(let c=0; c<brickColumnCount;c++){
    bricks[c]=[];
    for(let r=0; r<brickRowCount; r++){
        bricks[c][r]={x:0,y:0}
    }
}

//drawing the bricks to the canvas
const drawBricks=()=> {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

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
    drawBricks()
 // checking for collision for left and right side
 if( xPosition + dx < ballRadius || xPosition + dx > canvas.width-ballRadius) {
    dx = -dx;
}
// checking for collision for top and bottom
   if(yPosition + dy < ballRadius) {
       console.log('fired!')
    dy = -dy;
   }else if(yPosition+dy>canvas.height-ballRadius){
       if(xPosition>paddleX && xPosition< paddleX+ paddleWidth){
           dy= -dy
       }else{
        alert("GAME OVER!")
    document.location.reload()
    clearInterval(interval)
       }
    
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

}

document.addEventListener('keydown',keyDownHandler,false)
document.addEventListener('keyup',keyUpHandler,false)

const interval= setInterval(startGame, 10);

// console.log(canvas.width,canvas.height)
