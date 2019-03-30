const canvas= document.querySelector('#myCanvas')
const ctx= canvas.getContext('2d')

let xPosition= canvas.width/2
let yPosition= canvas.height-30
const dx=2
const dy=-2

const drawBall=()=>{
    ctx.beginPath();
    ctx.arc(xPosition, yPosition, 20, 0, Math.PI*2, false);
    ctx.fillStyle='red';
    ctx.fill();
    ctx.closePath()
}


const startGame=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
   drawBall()
    xPosition+=dx;
    yPosition+=dy
}

setInterval(startGame, 10);
