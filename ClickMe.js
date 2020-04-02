const canvas = document.getElementById('panel');
const ctx = canvas.getContext('2d');
const clickCheck = document.getElementById('clickCheck');
const xandy = document.getElementById('xandy');
const boundPanel = document.getElementById('boundPanel');
const message = document.getElementsByClassName('message')[0];
const result = document.getElementById('result');

class Circle  {
    constructor(xPos, yPos, radius, rateX, rateY,color){
        
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = radius;
        this.rateX = rateX;
        this.rateY = rateY;
        this.color = color;
        this.circleCounter = 0;
        this.notClickedCounter = 0;
        this.correction=10;
    }

    drawCircle(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.xPos,this.yPos,this.size,0,Math.PI*2);
        ctx.fill();
        console.log('circle drawn');
        console.log(this);
    }

   
    collision(){
        //collision on x-axis
        if(this.xPos+this.size>canvas.width || this.xPos-this.size<0){
            this.rateX *= -1;
        }
        if(this.yPos+this.size>canvas.height || this.yPos-this.size<0){
            this.rateY *= -1;
        }
    }

  
   
}




const canvasCentre = canvas.width/2;


var circleRed = new Circle(canvasCentre, canvasCentre,50,0,0,'red');
console.log(circleRed.xPos);

var myReq;

function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    circleRed.drawCircle(ctx);
    circleRed.xPos += circleRed.rateX;
    circleRed.yPos += circleRed.rateY;
    circleRed.collision();
   
    if(circleRed.notClickedCounter < 20 && circleRed.circleCounter < 10){
        requestAnimationFrame(update);
        
    }
    else{
        
        console.log('end of animation');
        restart();
        
    }
    
    
}



function changeColor(e){
    var boundaryLeft = canvas.offsetLeft;
    var boundaryTop = canvas.offsetTop;
    var x = e.pageX-boundaryLeft;
    var y = e.pageY-boundaryTop;
    var correction = circleRed.correction;
    if( x>(circleRed.xPos-circleRed.size-correction) &&   //range must be increased considering the thumb
        x<(circleRed.xPos+circleRed.size+correction) &&
        y<(circleRed.yPos+circleRed.size+correction) &&
        y>(circleRed.yPos-circleRed.size-correction)   ) {
            console.log('clicked');
            levelChange();
            clickCheck.textContent = 'clicked '; //+ x + ' ' + y;
            //xandy.textContent = 'xPos:'+circleRed.xPos + ' ' + 'yPos:' + circleRed.yPos;
           // boundPanel.textContent = 'top:'+ boundaryTop+ ' left:'+boundaryLeft;
        }
    else{
        boundaryChange();
        console.log('not clicked');
        clickCheck.textContent = 'missed '; //+ x + ' ' + y;
        //xandy.textContent = 'xPos:'+circleRed.xPos + ' ' + 'yPos:' + circleRed.yPos;
        //boundPanel.textContent = 'top:'+ boundaryTop + 'left:' + boundaryLeft;
    }
}


function boundaryChange(){
    circleRed.notClickedCounter++;
    switch(circleRed.notClickedCounter){
        case 1 :
            circleRed.xPos = 100;
            circleRed.yPos = 150;
            canvas.style.borderColor = 'red';
            break;
        case 3 :
            circleRed.xPos = 150;
            circleRed.yPos = 180;
            canvas.style.borderColor = 'green';
            break;
        case 5 :
            circleRed.xPos = 100;
            circleRed.yPos = 100;
            canvas.style.borderColor = 'blue';
            break;
        case 7 :
            circleRed.xPos = 180;
            circleRed.yPos = 150;
            canvas.style.borderColor = 'yellow';
            break;
        case 9 :
            circleRed.xPos = 200;
            circleRed.yPos = 100;
            canvas.style.borderColor = 'orange';
            break;
        case 11 :
            circleRed.xPos = 130;
            circleRed.yPos = 130;
            canvas.style.borderColor = 'cyan';
            break;
        case 13 :
            circleRed.xPos = 200;
            circleRed.yPos = 200;
            canvas.style.borderColor = 'purple';
            break;
        case 15 :
            circleRed.xPos = 120;
            circleRed.yPos = 120;
            canvas.style.borderColor = 'pink';
            break;
        case 17 :
            circleRed.xPos = 100;
            circleRed.yPos = 120;
            canvas.style.borderColor = 'black';
            break;
        case 19:
            circleRed.xPos = 170;
            circleRed.yPos = 170;
            canvas.style.borderColor = 'white';
            break;
        case 20 :
            circleRed.xPos = canvasCentre;
            circleRed.yPos = canvasCentre;
            circleRed.rateY = 0;
            circleRed.rateX = 0;
            circleRed.color = 'red';
            
    }
}

function levelChange(){
    circleRed.circleCounter++;
    if(circleRed.notClickedCounter<20){
        switch(circleRed.circleCounter){
            case 1: 
                circleRed.correction = 20;
                circleRed.size = 40;
                circleRed.color = 'green';
                circleRed.rateX = 8;
                break;
            case 2:
                circleRed.size = 35;
                circleRed.correction = 30;
                circleRed.color = 'blue';
                circleRed.rateY = 10;
                break;
            case 3:
                if(circleRed.xPos>canvas.width/2){
                    circleRed.xPos -= 40;
                }
                if(circleRed.xPos<canvas.width/2){
                    circleRed.xPos += 40;
                }
                if(circleRed.yPos>canvas.height/2){
                    circleRed.yPos -= 40;
                }
                if(circleRed.yPos<canvas.height/2){
                    circleRed.yPos += 40;
                }

                circleRed.correction = 10;
                circleRed.size = 50; 
                circleRed.color = 'yellow';
                circleRed.rateY = 15;
                circleRed.rateX = 10;
                break;
            case 4:
                circleRed.size = 60;
                circleRed.correction = 5;

                circleRed.color = 'orange';  
                circleRed.rateX = 20;  
                break;
            case 5:
                circleRed.size = 60;
                circleRed.correction = 30;
                circleRed.color = 'cyan';
                circleRed.rateX = 30;
                circleRed.rateY = 30;
                break;
            case 6:
                
                circleRed.color = 'purple';
                circleRed.rateX = 30;
                circleRed.rateY = 34;
                break;
            case 7:
                circleRed.correction = 40;
                circleRed.color = 'pink';
                circleRed.rateX = 38;
                circleRed.rateY = 10;
                break;
            case 8:
                circleRed.correction = 30;
                circleRed.color = 'black';
                circleRed.rateX = 40;
                circleRed.rateY = -40;
                break;
            case 9:
                circleRed,correction = 10;
                circleRed.size = 60;
                circleRed.color = 'white';
                canvas.style.backgroundColor = 'black';
                circleRed.rateX = 30;
                circleRed.rateY = 40;
                break;
            default:
                circleRed.xPos = canvasCentre;
                circleRed.yPos = canvasCentre;
                circleRed.rateX = 0;
                circleRed.rateY = 0;
                canvas.style.borderColor = 'red';
        }

    }

}
function restart(){
    console.log('update() has been exited');
    if(circleRed.notClickedCounter >= 20){
        message.style.display = 'initial';
        circleRed.notClickedCounter = 0;
        circleRed.circleCounter = 0;
        circleRed.rateX = 0;
        circleRed.rateY = 0;
        circleRed.xPos = canvasCentre;
        circleRed.yPos = canvasCentre;
        result.textContent = 'You Lost'
    }
    else if(circleRed.circleCounter >= 10){
        message.style.display = 'initial';
        circleRed.notClickedCounter = 0;
        circleRed.circleCounter = 0;
        circleRed.rateX = 0;
        circleRed.rateY = 0;
        circleRed.xPos = canvasCentre;
        circleRed.yPos = canvasCentre;
        result.textContent = 'You Won!'
    }
    else{
        message.style.display = 'initial';
        result.textContent = "Something's wrong I can feel it";
    }
}

function startGame(){
    
    
    canvas.style.backgroundColor = 'white';
    message.style.display = 'none';
    circleRed.rateX = 5;
    circleRed.rateY = 8;
    circleRed.color = 'red';
    update();
    
   
}

canvas.addEventListener('mousedown', changeColor);












