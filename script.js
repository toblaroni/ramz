let rotX = 0
let rotY = 0
let c
let r = 0
let inc = 0

let diameter = 0
let kerning = 0
let distance = 0

let font

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function preload(){
  font = loadFont("assets/Poggers-Bold.ttf")
}

function setup(){
  let density = displayDensity();
  pixelDensity(density);

  createCanvas(window.innerWidth, window.innerHeight, WEBGL).center
  smooth()
  angleMode(DEGREES)
  ortho()

  textAlign(CENTER, CENTER)
  textFont(font)

  frameRate(60)
}

function draw(){
  background(10)
  const rFactor = 0.5

  rotateZ(15)
  rotateX(-20)
  console.log(width)

  // For Responsive web design
  if(width > 1024){
    diameter = height * 0.75
    kerning = diameter * 0.07
    distance = 0.08
    textSize(diameter * 0.27)
  } else {
    diameter = width * 0.67
    kerning = diameter * 0.11
    distance = 0.08
    textSize(diameter * 0.25)
  }


  rotateY(-r)
  discoBall(27, 15, diameter, 1)
  rotateY(r * 2)
  drawText('RAM-Z', diameter, kerning, distance)
  drawAxis(15, 1, 500)


  r += rFactor
  inc += 2
}

function discoBall(vNum, hNum, d, w){
  // noFill()
  fill(0)
  stroke(200)
  lights()
  let r = d/2

  // Calculate lengths
  let vLength = 360 / vNum
  let hLength = d / hNum

  // For loop to create vertical lines
  for(let i = 0; i < 360; i += vLength){
    push()
    rotateY(i)
    strokeWeight(w + sin(inc * 2 - i * 2) * 0.5)
    circle(0, 0, d)
    pop()
  }

  // For Loop to create horizontal lines
  for(let x = 0, y = -r; x <= d; x += hLength, y += hLength){
    /* Calculate the diameters of the circles based off the equation of a circle.
       (I don't know why you have to multiply by two but it works...) */
    let D = sqrt(-pow(x - r, 2) + pow(r, 2)) * 2

    push()
    translate(0, y)
    rotateX(90)

    strokeWeight(w + sin(inc * 2 - x * 1.5) * 0.5)
    circle(0, 0, D)
    pop()
  }
}

// Function to draw lines down the Y axis and around the circle
function drawAxis(dashLength, w, diameter, dashed){
  strokeWeight(w)
  stroke(255, 200)

  if(dashed == 'dashed'){
    for(i = -height * 2; i < 0 * 2; i += dashLength * 3){
      line(0, i, 0, i + dashLength)
    }

    // Draw the outer circle
    // for(let i = 0; i < 360; i += dashLength){
    //   let X = sin(i) * diameter
    //   let Y = cos(i) * diameter

    //   push()
    //   rotateX(90)
    //   rotate(i)
    //   line(diameter / 2, 0, diameter / 2, dashLength )
    //   pop()
    // }

  } else {
    noFill()
    strokeWeight(2)
    line(0, -height * 2, 0, 0)
  }
}

// Function for drawing text around the ball
function drawText(letters, diameter, kerning, distance){ 
  fill(255)
  let r = diameter / 2

  // Turn the text into an array
  let tArray = Array.from(letters)

  // Loop through the elements of the array
  for(let letter of tArray){
    let i = tArray.indexOf(letter)

    push()
    rotateY(i * kerning)    
    translate(0, 0, r + r * distance)
    text(letter, 0, 0)
    pop()
  }  
}

function rotMouse(rFactor){
  // Rotate using mouse
  let rX = mouseX - pmouseX
  let rY = mouseY - pmouseY
  rotX += rX * rFactor
  rotY += rY * rFactor
  rotateY(rotX)
}