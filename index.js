const canvas= document.querySelector('#myCanvas')
const ctx= canvas.getContext('2d')

const drawingElements=()=>{
// drawing the paddle
    ctx.beginPath();
    ctx.rect(20,40,50,50);
    ctx.fillStyle='black';
    ctx.fill();
    ctx.closePath()

    //drawing the ball
    ctx.beginPath();
    ctx.arc(240, 160, 20, 0, Math.PI*2, false);
    ctx.fillStyle='red';
    ctx.fill();
    ctx.closePath()
}

drawingElements()