screenWidth = 0;
screenHeight = 0;
var apple;
var speakData;
var toNumber = "";
var drawApple = "";
x = 0;
y = 0;

drawApple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start() {
    elemento("status").innerHTML = "O sistema está ouvindo, por favor fale o número de maças que você quer que o app desenhe<br>";
    recognition.start();
    
}


function preload() {
   var imagemMaca = loadImage("maca.png");
    apple = imagemMaca;
}

 
recognition.onresult = function(event) {

    console.log(event); 
   
    content = event.results[0][0].transcript;
   
       document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content; 
       toNumber = Number(content);
       if (Number.isInteger(toNumber)) {
           elemento("status").innerHTML = "A maçã começou a ser desenhada";
           drawApple = "set";
       } else {
           elemento("status").innerHTML = "O número não foi reconhecido";
       }
   }
    




function setup() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas = createCanvas(screenWidth, screenHeight-150);
    canvas.position(0, 150);
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speakData + "Maças sendo desenhadas");

    synth.speak(utterThis);

    speakData = "";
}


function draw() {
    if (drawApple == "set") {
        drawApple = "";
        for (var i = 1; i <= toNumber; i++) {
            x = Math.floor(Math.random() * screenWidth);
            y = Math.floor(Math.random() * screenHeight);
            image(apple, x, y, 100, 100);
        }
        elemento("status").innerHTML = toNumber + " maças sendo desenhadas";
        speakData = toNumber;
        speak()
    }
    

}

function elemento(name) {
    return document.getElementById(name);
}