let w, h;
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
  w =windowWidth;
  h = windowHeight;
  createCanvas(w,h);
  frameRate(4);
  background("white");
  textAlign(CENTER);
  noFill();
  textSize(400);
  stroke("black");
  noFill();
  text("simb", w / 2, h / 3);
  text("iose", w / 2, h);
  fill(255, 0, 0, 200);
  noStroke();
  circle(w / 2, h / 2, w / 1.5);
  stroke("white");
  textAlign(CENTER);
  textSize(50);
  noFill();
  text("tap to", w / 2, h / 2 - 50);
  textSize(100);
  noFill();
  text("start", w / 2, h / 2 + 50);

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
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);

  noFill("darkgrey");
  stroke("black");

  fill(colorSpring);
  rect(0, 0, w / 2, h / 2);
  textAlign(LEFT);
  textSize(40);
  text("spring", 10, 50);

  fill(colorSummer);
  rect(w / 2, 0, w - 10, h / 2);
  text("summer", w / 2 + 10, 50);

  fill(colorAutumn);
  rect(0, h / 2, w / 2, h - 10);
  text("autumn", 10, h / 2 + 50);

  fill(colorWinter);
  rect(w / 2, h / 2, w - 1, h - 10);
  text("winter", w / 2 + 10, h / 2 + 50);
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
    w = windowWidth;
    h = windowHeight;    
    createCanvas(w, h);
    background("white");
    stroke("black");
    textSize(50);
    fill('black');
    text("double tap", w / 2, h / 2 - 100);
    noFill();
    text("the seasons", w / 2, h / 2 - 50);
    text("to activate", w / 2, h / 2);
    setTimeout(run, 2000);
  }
}

function doubleClicked() {
  if (playing) {
    // Spring
    if (
      mouseX > 0 &&
      mouseX < w / 2 &&
      mouseY > 0 &&
      mouseY < h / 2
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
      mouseX > w / 2 &&
      mouseX < w &&
      mouseY > 0 &&
      mouseY < w / 2
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
      mouseX < w / 2 &&
      mouseY > h / 2 &&
      mouseY < h
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
      mouseX > w / 2 &&
      mouseX < w &&
      mouseY > h / 2 &&
      mouseY < h
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
