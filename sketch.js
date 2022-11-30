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

let birds, drops, leaves, dog, thunder, glass, cricket, fly, seagull, wolf, sea;

p5.disableFriendlyErrors = true; // disables FES

function preload() {
  soundFormats("ogg", "mp3");

  birds = loadSound("assets/bird");
  drops = loadSound("assets/drops");
  leaves = loadSound("assets/leaves");
  dog = loadSound("assets/dog");
  thunder = loadSound("assets/thunder");
  glass = loadSound("assets/glass");
  cricket = loadSound("assets/cricket");
  fly = loadSound("assets/fly");
  seagull = loadSound("assets/seagull");
  wolf = loadSound("assets/wolf");
  sea = loadSound("assets/sea");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(4);
  background("white");
  textAlign(CENTER);
  noFill();
  textSize(400);
  stroke("black");
  noFill();
  text("simb", windowWidth / 2, windowHeight / 3);
  text("iose", windowWidth / 2, windowHeight);
  fill(255, 0, 0, 200);
  noStroke();
  circle(windowWidth / 2, windowHeight / 2, windowWidth / 1.5);
  stroke("white");
  textAlign(CENTER);
  textSize(50);
  noFill();
  text("tap to", windowWidth / 2, windowHeight / 2 - 50);
  textSize(100);
  noFill();
  text("start", windowWidth / 2, windowHeight / 2 + 50);

  // audio constructors
  wind = new p5.Noise();
  wind.disconnect();
  wind.start();
  filtr = new p5.BandPass();
  glass.playMode("sustain");
}

function draw() {
  accel = abs(accelerationY);
  nOff = nOff + nVel;
  filtrFreq = map(noise(nOff), 0, 1, fmin, fmax);
  filtr.set(filtrFreq, filtrWidth);

  // Spring
  if (playing === 1 && option === 1) {
    if (drops.isPlaying() === false) {
      drops.play(0, random(0.8, 1.2), 0, 0);
    }
    drops.rate(map(noise(nOff), 0, 1, 0.4, 1.3));
    if (birds.isPlaying() === false) {
      birds.play();
    }
    if (random(100) < 5) {
      cricket.play(0, random(0.6, 2), 0.5, 0);
    }
    birds.rate(map(noise(nOff), 0, 1, 0.2, 1.7));
    let vol = min(accel / 40, 1);
    birds.setVolume(vol);
  }

  // Summer
  if (playing === 1 && option === 2) {
    let rand = random(100);
    if (sea.isPlaying() === false) {
      sea.play();
    }
    if (rand < 10) {
      let tones = [0.35, 0.4, 0.45, 0.5, 0.55];
      glass.play(0, tones[int(random(tones.length))], 0.4, 0);
    }
    if (fly.isPlaying() === false && random(100) < 5) {
      fly.play(0, random(0.8, 1.2), 0.4, 0);
    }
    if (seagull.isPlaying() === false) {
      seagull.play();
    }
    let vol = min(accel / 40, 1);
    seagull.setVolume(vol);
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
    let rand = random(100);
    if (wolf.isPlaying() === false && rand < 4) {
      wolf.play(0, random(0.8, 1), 0.7, random(1.5));
    }
    if (drops.isPlaying() === false) {
      drops.play();
    }
    if (accel > 20 && thunder.isPlaying() === false) {
      thunder.play(0, random(0.5, 1.5), 0.5, random(1));
    }
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
    filtr.connect();
    filtr.gain(0.5);
  } else {
    filtr.disconnect();
  }
}

function run() {
  clear();
  playing = 1;
  createCanvas(windowWidth, windowHeight);

  noFill("darkgrey");
  stroke("black");

  fill(colorSpring);
  rect(0, 0, windowWidth / 2, windowHeight / 2);
  textAlign(LEFT);
  textSize(40);
  text("spring", 10, 50);

  fill(colorSummer);
  rect(windowWidth / 2, 0, windowWidth - 10, windowHeight / 2);
  text("summer", windowWidth / 2 + 10, 50);

  fill(colorAutumn);
  rect(0, windowHeight / 2, windowWidth / 2, windowHeight - 10);
  text("autumn", 10, windowHeight / 2 + 50);

  fill(colorWinter);
  rect(windowWidth / 2, windowHeight / 2, windowWidth - 1, windowHeight - 10);
  text("winter", windowWidth / 2 + 10, windowHeight / 2 + 50);
}

function stop() {
  playRain(0);
  birds.stop();
  drops.stop();
  leaves.stop();
  dog.stop();
  cricket.stop();
  glass.stop();
  fly.stop();
  seagull.stop();
  wolf.stop();
  sea.stop();
}

function mousePressed() {
  if (!playing) {
    glass.play(0,1,1,0);
    fullscreen(1);
    createCanvas(windowWidth, windowHeight);
    background("white");
    stroke("black");
    textSize(50);
    text("double tap", windowWidth / 2, windowHeight / 2 - 100);
    text("the seasons", windowWidth / 2, windowHeight / 2 - 50);
    text("to activate", windowWidth / 2, windowHeight / 2);
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
        stop();
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
        stop();
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
        stop();
        option = 3;
        colorSpring = "white";
        colorSummer = "white";
        colorAutumn = "red";
        colorWinter = "white";
        playRain(1, 400, 800, 3, 0.8);
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
        stop();
        option = 4;
        colorSpring = "white";
        colorSummer = "white";
        colorAutumn = "white";
        colorWinter = "red";
        playRain(1, 400, 1000, 3, 0.8);
      } else {
        option = 0;
        colorWinter = "white";
        stop();
      }
    }
    run();
  }
}
