var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c =  canvas.getContext("2d");

var mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y
})

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();  
})
var maxRadius = 50;

class Circle{
    constructor(x,y,dx,dy,radius,colour){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius
        this.colour = colour;
    
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c.fillStyle = this.colour;
        c.fill();
    }
    


    update() {
        if(this.x + this.radius >window.innerWidth || this.x - this.radius < 0)
            this.dx = -this.dx;
        if(this.y + this.radius >window.innerHeight || this.y -this.radius < 0)
            this.dy = -this.dy;
        this.x+= this.dx;
        this.y+= this.dy;

        //interactive
    
        if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y -this.y) < 50 ){
            this.radius = Math.min(this.radius+1,maxRadius);
        }else{
        this.radius = Math.max(this.radius-1,this.minRadius);
        }

        this.draw();
    }

    


}

var circleArray = [];
function init(){
    circleArray = [];
    for(let i = 0;i<200;i++){
        var minRadius = Math.random() * 4 + 1; 
        var x = Math.random()*(window.innerWidth - 2*minRadius);   
        var y = Math.random()*(window.innerHeight - 2*minRadius);
        var dx = Math.random() -.5;
        var dy = Math.random() -.5;
        circleArray.push(new Circle(x,y,dx,dy,minRadius,randColour()));
    }
}

function randColour(){
    let set = ["#FE0586","#E305E6","#BB12FD","#6805E6","#A62D43","#1F2338","#E00E12","#F2F2F2","#F2F2F2","#D9DAD9"]
    return set[Math.floor(Math.random()*set.length)];
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(let i =0;i<circleArray.length;i++)
        circleArray[i].update();
    
}

init();
animate();
