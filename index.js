var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c =  canvas.getContext("2d");

c.lineWidth = "2"
function randColour(){
    let set = "0123456789ABCDEF";
    let color ="#";
    for(let i=0;i<6;i++){
        color += set[Math.floor(Math.random()*15)];
    }
    return color;
}

class Circle{
    constructor(x,y,dx,dy,radius,colour){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.colour = colour;
    
    }

    
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c.strokeStyle = this.colour;
        c.fillStyle= this.color;
        
        c.stroke();
        c.fill();
    }
    
    update() {
        if(this.x + this.radius >window.innerWidth || this.x - this.radius < 0)
            this.dx = -this.dx;
        if(this.y + this.radius >window.innerHeight || this.y -this.radius < 0)
            this.dy = -this.dy;
        this.x+= this.dx;
        this.y+= this.dy;
        this.draw();
    }

}


var circleArray = [];

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    
    for(let i = 0;i<100;i++){
        var radius =  (Math.random()*50) + 20
        var x = Math.random()*(window.innerWidth - 2*radius);   
        var y = Math.random()*(window.innerHeight - 2*radius);
        var dx = (Math.random() * 10) -5;
        var dy = (Math.random() * 10) -5;
       ;
        circleArray.push(new Circle(x,y,dx,dy,radius,randColour()));
    }

    for(let i =0;i<100;i++)
        circleArray[i].update();
    
}


animate();
