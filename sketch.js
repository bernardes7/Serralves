let playing = 0;
let option = 0;
let accel = 0.0;
let filtrFreq = 400;
let fmin = 40;
let fmax = 600;
let filtrWidth = 8;
let nOff = 0.0;
let nVel = 0.05;
let colorSpring = "white";
let colorSummer = "white";
let colorAutumn = "white";
let colorWinter = "white";

p5.disableFriendlyErrors = true; // disables FES

function preload() {
  birds = loadSound("assets/bird.ogg");
  chord = loadSound("assets/chord.ogg");
  drops = loadSound("assets/drops.ogg");
  leaves = loadSound("assets/leaves.ogg");
  dog = loadSound("assets/dog.ogg");
  thunder = loadSound("assets/thunder.ogg");
  glass = loadSound("assets/glass.ogg");
  cricket = loadSound("assets/cricket.ogg");
}

function setup() {
  // frameRate(4);
  createCanvas(windowWidth, windowHeight);
  background("white");
  textAlign(CENTER);
  noFill();
  textSize(400);
  stroke("black");
  fill(0,0,0,100);
  text("simb", windowWidth / 2, windowHeight / 3);
  text("iose", windowWidth / 2, windowHeight);
  fill(255,0,0,180);
  noStroke();
  circle(windowWidth / 2, windowHeight / 2, windowWidth / 1.5);
  stroke("white");
  textAlign(CENTER);
  textSize(50);
  noFill()
  text('tap to', windowWidth / 2, (windowHeight / 2) - 50);
  textSize(100);
  noFill();
  text('start', windowWidth / 2, (windowHeight / 2) + 50);

  // audio constructors
  wind = new p5.Noise();
  wind.disconnect();
  wind.start();
  filtr = new p5.BandPass();
  reverb = new p5.Reverb();
  
  glass.playMode('sustain');

}
  
function draw() {
  accel = abs(accelerationY);
  nOff = nOff + nVel;
  filtrFreq = map(noise(nOff), 0, 1, fmin, fmax); //
  filtr.set(filtrFreq, filtrWidth);

  // Spring
  if (playing === 1 && option === 1) {
    if (birds.isPlaying() === false) {
      birds.play();
    }
    if(random(100) < 8) {
    cricket.play(0, random(0.5, 2), 0.6, 0);
    }
      birds.rate(map(noise(nOff), 0, 1, 0.2, 1.7));
    let vol = min(accel / 60, 1);
    print(vol);
    birds.setVolume(vol);
  }
  
    // Summer
  if (playing === 1 && option === 2){ 
    let rand = random(100); 
    if(rand < 10) {
    let tones = [0.35,0.4,0.45,0.5,0.55];
    glass.play(0, tones[int(random(tones.length))], 0.1, 0);
    }
  }

     // Autumn
  if (playing === 1 && option === 3) {
    if (leaves.isPlaying() === false && random(100) < 10) {
      leaves.play(0, 1, 0.6, random(2));
    }
    leaves.rate(map(noise(nOff), 0, 1, 0.6, 1));
   
    if (dog.isPlaying() === false && random(100) < 5) {
      dog.play(0, 1, 0.6, random(0.2));

    }
    dog.rate(map(noise(nOff), 0, 1, 0.4, 1));
  } 

  //winter
  if (playing === 1 && option === 4) {
    if (drops.isPlaying() === false && second() % 5 === 0) {
    drops.play();
    reverb.process(drops,3,1);
    setInterval(drops.play(), 2500);
    }
    if(accel>20 && thunder.isPlaying() === false){thunder.play(0,random(0.5,1.5),0.5,random(1))}
    drops.rate(map(noise(nOff), 0, 1, 0.4, 1.3));
  }
}

function playRain(start, min, max, w, v) {
  if (start) {
    filtrWidth = w;
    nVel = v;
    fmin = min;
    fmax = max;
    filtr.process(wind);
    filtr.disconnect();
    filtr.gain(0.5);
    reverb.connect();

    // 3 second reverbTime, decayRate of 2%
    reverb.drywet(0.8);
    reverb.process(filtr, 3, 2);
  } else {
    reverb.disconnect();
  }
}

function run() {
  playing = 1;
  createCanvas(windowWidth, windowHeight);

  noFill('darkgrey');
  stroke('black');

  
  fill(colorSpring);
  rect(0, 0, windowWidth / 2, windowHeight / 2);
  textAlign(LEFT);
  textSize(40);
  text('spring', 10, 50);

  fill(colorSummer);
  rect(windowWidth / 2, 0, windowWidth - 10, windowHeight / 2);
  text('summer', (windowWidth / 2) + 10, 50);

  fill(colorAutumn);
  rect(0, windowHeight / 2, windowWidth / 2, windowHeight - 10);
  text('autumn', 10, (windowHeight/2)+50);

  fill(colorWinter);
  rect(windowWidth / 2, windowHeight / 2, windowWidth - 1, windowHeight - 10);
  text('winter', (windowWidth / 2) + 10, (windowHeight/2)+50);  
}

function stop() {
  playRain(0);
  birds.stop();
  chord.stop();
  drops.stop();
  leaves.stop();
  dog.stop();
}

function mousePressed() {
  if (!playing) {
    fullscreen(1);
    background('white');
    stroke('black');
    textSize(50);
    text('double tap', windowWidth/2, windowHeight/2 -100); 
    text('the seasons',windowWidth/2, windowHeight/2 - 50); 
    text('to activate', windowWidth/2, windowHeight/2);
    setTimeout(run, 2000);
  }
}

function doubleClicked() {
  if (playing) {
   // Spring
    if (
      mouseX > 0 &&
      mouseX < windowWidth / 2 &&
      mouseY > 0 &&
      mouseY < windowHeight / 2
    ) {
      if (option != 1) {
        option = 1;
        colorSpring = "red";
        colorSummer = "white";
        colorAutumn = "white";
        colorWinter = "white";
        playRain(1, 40, 600, 8, 0.05);
      } else {
        option = 0;
        colorSpring = "white";
        stop();
      }
    }

    // Summer
    if (
      mouseX > windowWidth / 2 &&
      mouseX < windowWidth &&
      mouseY > 0 &&
      mouseY < windowHeight / 2
    ) {
      if (option != 2) {
        option = 2;
        colorSpring = "white";
        colorSummer = "red";
        colorAutumn = "white";
        colorWinter = "white";
        playRain(1, 40, 200, 10, 0.05);
      } else {
        option = 0;
        colorSummer = "white";
        stop();
      }
    }

    // Autumn
    if (
      mouseX > 0 &&
      mouseX < windowWidth / 2 &&
      mouseY > windowHeight / 2 &&
      mouseY < windowHeight
    ) {
      if (option != 3) {
        option = 3;
        colorSpring = "white";
        colorSummer = "white";
        colorAutumn = "red";
        colorWinter = "white";
        playRain(1,200, 800, 3, 1);
      } else {
        option = 0;
        colorAutumn = "white";
        stop();
      }
    }

    // Winter
    if (
      mouseX > windowWidth / 2 &&
      mouseX < windowWidth &&
      mouseY > windowHeight / 2 &&
      mouseY < windowHeight
    ) {
      if (option != 4) {
        option = 4;
        colorSpring = "white";
        colorSummer = "white";
        colorAutumn = "white";
        colorWinter = "red";
        playRain(1, 400, 1200, 1, 1);
      } else {
        option = 0;
        colorWinter = "white";
        stop();
      }
    }
    run();
  }
}
