const canvas= document.querySelector('#myCanvas')
const ctx= canvas.getContext('2d')

let xPosition= canvas.width/2;
let yPosition= canvas.height-30;
let dx=2;
let dy= -2;
const ballRadius=10;

const drawBall=()=>{
    ctx.beginPath();
    ctx.arc(xPosition, yPosition, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle='red';
    ctx.fill();
    ctx.closePath()
}


const startGame=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
   drawBall()

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
   
   requestAnimationFrame(startGame)
}

requestAnimationFrame(startGame)

// console.log(canvas.width,canvas.height)
