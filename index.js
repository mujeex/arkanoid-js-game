const canvas= document.querySelector('#myCanvas')
const ctx= canvas.getContext('2d')

// variables for ball
let xPosition= canvas.width/2;
let yPosition= canvas.height-30;
let dx=2;
let dy= -2;
const ballRadius=10;
let color='blue'

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

//variable for keeping track of the score
let score=0;

//creating brick objects
const bricks=[]
for(let c=0; c<brickColumnCount;c++){
    bricks[c]=[];
    for(let r=0; r<brickRowCount; r++){
        bricks[c][r]={x:0,y:0,status:1}
    }
}

//drawing the bricks to the canvas
const drawBricks =()=> {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status==1){
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
          
        }
    }
}



const drawBall=(color)=>{
    ctx.beginPath();
    ctx.arc(xPosition, yPosition, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle=color;
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

//collision detection function
const collisionDetection=()=>{
    for(let c=0; c<brickColumnCount;c++){
        for(let r=0; r<brickRowCount;r++){
            let b= bricks[c][r]
            if(b.status== 1){
                //changing status of brick , direction and color of the ball upon collision.
                if(xPosition > b.x && xPosition < b.x+brickWidth && yPosition > b.y && yPosition < b.y+brickHeight) {
                    console.log('here')
                    dy = -dy;
                    b.status=0;
                    drawBall(color='red');
                    score++
                    if(score== brickRowCount*brickColumnCount){
                        alert('YOU WIN, CONGRATULATIONS!!')
                        document.location.reload();
                        clearInterval(interval) //needed for chrome to end the game.
                    }
                }
            }
            
        }
    }
}

//drawing the score on the canvas
const drawScore= ()=>{
    ctx.font = '16px Arial';
    ctx.fillStyle= '#0095DD'
    ctx.fillText('Score: '+ score, 8, 20)
}

const mousemoveHandler= (event)=>{
    let relativeX= event.clientX- canvas.offsetLeft
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX- paddleWidth/2
    }
}



const startGame=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBricks()
   drawBall(color)
   drawPaddle()
   drawScore()
   //checking for collison between bricks
   collisionDetection()
   
 // checking for collision for left and right side
 if( xPosition + dx < ballRadius || xPosition + dx > canvas.width-ballRadius) {
    dx = -dx;
}
// checking for collision for top and bottom
   if(yPosition + dy < ballRadius) {
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
document.addEventListener('mousemove',mousemoveHandler,false)

const interval= setInterval(startGame, 10);

// console.log(canvas.width,canvas.height)
