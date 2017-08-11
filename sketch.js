//Circle Flower Step : 0.011

var d,n,pause,l;
var startButton,saveButton;
var radiusSlider,stepSlider,dSlider,nSlider,speedSlider,durationSlider;


function setup() {
  createCanvas(640,480);
  stroke(255);
  noFill();
  strokeWeight(1);
  initVals();
  initLayout();
  noLoop();
}

function draw() {

  var s = stepSlider.value();
  var radius = radiusSlider.value();
  var dStep = dSlider.value();
  var nStep = nSlider.value();
  var speed = speedSlider.value();
  var dur = durationSlider.value();
  background(51);
  beginShape();
  push();
  translate(width / 2 - 100, height / 2);
  for(var t = 0; t < TWO_PI*l; t+=s*l){
    let k = (n / d) * t;
    /*
      default : cos(k);
      petals : sin(k) * cos(k);
      oscilating circle : sin(k)^2
      turning circle : sin(cos(k)^2)
    */
    let r = radius * (cos(k));
    let x = r * cos(t);
    let y = r * sin(t);

    vertex(x,y);
  }

  endShape(CLOSE);
  pop();
  if(pause)
    return;
  l += speed;

  d += (l%dStep);
  n += (l%nStep);
  console.log("d = " + d + " n = " + n + " l = " + l);
}


function start(){
  if(pause){
    startButton.html("Pause");
    loop();
  }
  else{
    startButton.html("Start");
    noLoop();
  }

  pause = !pause;
}

function save(){

}

function initLayout(){
  radiusSlider = addSlider("Radius","rad-td",1,800,200,5);
  stepSlider = addSlider("Roundness","step-td",0.009,3,0.1,0.01);
  dSlider = addSlider("D Step","dStep-td",1,100,9,1);
  nSlider = addSlider("N Step","nStep-td",1,100,7,1);
  speedSlider = addSlider("Speed","speed-td",0.0001,1,0.01,0.001);
  durationSlider = addSlider("Duration","duration-td",1,10000,100,10);

  startButton = createButton("Start");
  startButton.mousePressed(start);
  saveButton = createButton("Save");
  saveButton.mousePressed(save);
}

function addSlider(name,parent,min,max,def,step){
  createElement('h5',name).parent(parent);
  var slider = createSlider(min,max,def,step)
          .parent(parent).input(draw);
  var p = createElement('p',def+"").parent(parent);
  slider.changed(()=>{
      p.html(slider.value()+"");
  });
  return slider;
}
function initVals(){
  d = 9;
  n = 7;
  pause = true;
  l = 1;

}
