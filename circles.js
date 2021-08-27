var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
const center = [canvas.width/2, canvas.height/2];
const radius = Math.min(canvas.width, canvas.height)*0.4;

// Each element is an array [x, y, xVel, yVel, htmlColor]
var balls = [];
const gravity = 200;

function loop() {
    draw();
    updateBalls(1.0/60);

    window.requestAnimationFrame(loop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#0000FF";
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width*0.4, 0, 2*Math.PI);
    ctx.stroke();

    for(ball of balls) {
        ctx.strokeStyle = ball[4];
        ctx.beginPath();
        ctx.arc(ball[0], ball[1], 4, 0, 2*Math.PI);
        ctx.stroke();
    }
}

function updateBalls(dt) {
    for(ball of balls) {
        const dx = ball[0]-center[0];
        const dy = ball[1]-center[1];
        const sqLen = (dx**2)+(dy**2);

        if(sqLen >= radius**2) {
            const len = Math.sqrt(sqLen);
            const perp = (ball[2]*dx)+(ball[3]*dy);
            
            ball[2] -= 2*perp*dx/sqLen;
            ball[3] -= 2*perp*dy/sqLen;
            ball[0] = (radius*dx/len)+center[0];
            ball[1] = (radius*dy/len)+center[1];
        }

        ball[3] += gravity*dt;
        ball[0] += ball[2]*dt;
        ball[1] += ball[3]*dt;
    }
}

function randomColor() {
    const r = 128+Math.floor(Math.random()*127);
    const g = 128+Math.floor(Math.random()*127);
    const b = 128+Math.floor(Math.random()*127);
    
    return "#"+((r << 16)+(g << 8)+b);
}

canvas.addEventListener("mousedown", function(e) {
    const rect = canvas.getBoundingClientRect();
    const xScale = canvas.width/rect.width;
    const yScale = canvas.height/rect.height;
    const x = (e.clientX-rect.left)*xScale;
    const y = (e.clientY-rect.top)*yScale;
    
    console.log("("+x+", "+y+")");
    
    balls.push([x, y, 0, 0, "#"+Math.floor(Math.random()*0xFFFFFF).toString(16)]);
});

window.requestAnimationFrame(loop);
