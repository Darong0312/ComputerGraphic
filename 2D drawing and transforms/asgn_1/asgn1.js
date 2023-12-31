// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`;

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;// uniform変数
    void main() {
      gl_FragColor = u_FragColor;
  }`;

//Global Variables
let canvas,gl,a_Position,u_FragColor,u_Size;

let POINT = 0;
let TRIANGLE = 1;
let CIRCLE = 2;
let g_selectedColor = [0.0,0.0,0.0,1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_selectedSeg = 10;

function addActionsForHTMLUI(){
  document.getElementById('green').onclick = function(){ g_selectedColor = [0.0,1.0,0.0,1.0];};
  document.getElementById('red').onclick = function(){ g_selectedColor = [1.0,0.0,0.0,1.0];};
  document.getElementById('blue').onclick = function(){ g_selectedColor = [0.0,0.0,1.0,1.0];};
  document.getElementById('clear').onclick = function(){ g_shapeList=[]; renderAllShapes();};

  document.getElementById('point').onclick = function(){ g_selectedType = POINT; };
  document.getElementById('triangle').onclick = function(){ g_selectedType = TRIANGLE; };
  document.getElementById('circle').onclick = function(){ g_selectedType = CIRCLE; };

  document.getElementById('redSlide').addEventListener('mouseup', function(){ g_selectedColor[0] = this.value/100; console.log(this.value/100); console.log(g_selectedColor);})
  document.getElementById('greenSlide').addEventListener('mouseup', function(){ g_selectedColor[1] = this.value/100;})
  document.getElementById('blueSlide').addEventListener('mouseup', function(){ g_selectedColor[2] = this.value/100;})
  
  document.getElementById('sizeSlide').addEventListener('mouseup', function(){ g_selectedSize = this.value;})
  document.getElementById('segSlide').addEventListener('mouseup', function(){ g_selectedSeg = this.value;})
}

function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {preserveDrawingBuffer:true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

}

function connectVariables(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

function main() {

  setupWebGL();

  connectVariables();
  
  addActionsForHTMLUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;

  canvas.onmousemove = function(ev){ if(ev.buttons == 1) { click(ev); } }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_shapeList = [];
function click(ev) {

  [x,y] = convertCoordinatesEventsToGL(ev);

  let point;

  if(g_selectedType == POINT){
    point = new Point();
  }
  else if(g_selectedType == TRIANGLE){
    point = new Triangle();
  }
  else if(g_selectedType == CIRCLE){
    point = new Circle();
    point.segments = g_selectedSeg;
  }

  point.position = [x,y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapeList.push(point);

  renderAllShapes();
}

function convertCoordinatesEventsToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  
  return ([x,y]);
}

function renderAllShapes(){

  var startTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapeList.length;
  for(var i = 0; i < len; i++) {
    g_shapeList[i].render();
  }

  var duration = performance.now() - startTime;
  sendTextToHTML("number of dots: " + len + "ms: " + Math.floor(duration) + "fps: " + Math.floor(1000/duration)/10, "numdot");

}

function sendTextToHTML(text,htmlID){
  var htmlElm = document.getElementById(htmlID);
  if(!htmlElm){
    console.log("Failed to get" + htmlID + " from HTML");
    return;
  }

  htmlElm.innerHTML = text;

}