// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;   
  attribute vec4 a_Position;    
  attribute vec2 a_UV;                             
  varying vec2 v_UV;           
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;                                       
  uniform mat4 u_ProjectionMatrix;     
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    //gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`;

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;
    varying vec2 v_UV;
    uniform vec4 u_FragColor;// uniform変数
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;
    uniform sampler2D u_Sampler2;
    uniform int u_whichTexture;
    void main() {
      if(u_whichTexture == -2){
        gl_FragColor = u_FragColor;
      }else if(u_whichTexture == -1){
        gl_FragColor = vec4(v_UV,1.0,1.0);
      }else if(u_whichTexture == 0){
        gl_FragColor = texture2D(u_Sampler0,v_UV);
      }else if(u_whichTexture == 1){
        gl_FragColor = texture2D(u_Sampler1,v_UV);
      }else if(u_whichTexture == 2){
        gl_FragColor = texture2D(u_Sampler2,v_UV);
      }else{
        gl_FragColor = vec4(1,0.2,0.2,1);
      }
      
  }`;


//Global Variables
let canvas,gl,a_Position,a_UV,u_FragColor,u_Size,u_ModelMatrix,u_ProjectionMatrix,u_ViewMatrix,u_GlobalRotateMatrix,u_whichTexture;

let u_Sampler0, u_Sampler1,u_Sampler2;

let POINT = 0;
let TRIANGLE = 1;
let CIRCLE = 2;
let chosenAngle = 5;

let g_CurrentAngle = [0,0];
let g_selectedColor = [0.0,0.0,0.0,1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_selectedSeg = 10;
let g_globalAngle = 0;
let g_leftArmAngle = 0;
let g_rightArmAngle = 0;
let g_leftLegAngle = 0;
let g_rightLegAngle = 0;
let g_leftFistAngle = 0;
let g_rightFistAngle = 0;
let g_animationFlag = false;


var g_startTime = performance.now()/1000.0;
var g_pauseTime = 0;
var TimeOffset = 0;
var g_seconds = (performance.now()/1000.0)- g_startTime - g_pauseTime;
var g_run = false;

var jump = false;
var shift_key = false;
var mouse_down = false;


let g_leftArmAnimation = false;
let g_rightArmAnimation = false;

let g_leftFistAnimation = false;
let g_rightFistAnimation = false;

let g_leftLegAnimation = false;
let g_rightLegAnimation = false;

var g_startTime = performance.now()/1000.0;
var g_pauseTime = 0;
var TimeOffset = 0;
var g_seconds = (performance.now()/1000.0)- g_startTime - g_pauseTime;
var g_run = false;

var camera = new Camera();

var g_wall0 = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  //[1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
]

var g_wall1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  //[1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0,0,0,1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1],
]


function drawWall0(){
  for(x = 0 ; x<8; x++){
    for(y = 0; y<8; y++){
      if(g_wall0[x][y] == 1){

        var body = new Cube();
        body.color = [1,1,1,1];
        body.matrix.translate(x-3,-.75,y-4);
        body.matrix.scale(1,0.5,1);
        body.textureNum = 2;
        body.render();

      }
      
    }
  }

}

function drawWall1(){
  for(x = 0 ; x<12; x++){
    for(y = 0; y<12; y++){
      if(g_wall1[x][y] == 1){

        var body = new Cube();
        body.color = [1,1,1,1];
        body.matrix.translate(x-5,-.75,y-6);
        body.matrix.scale(1,0.5,1);
        body.textureNum = 2;
        body.render();

      }
    }
  }

}

function addActionsForHTMLUI(){
  document.getElementById('leftArmSlide').addEventListener('mousemove', function(){ g_leftArmAngle = this.value; renderScenes()});
  document.getElementById('rightArmSlide').addEventListener('mousemove', function(){ g_rightArmAngle = this.value; renderScenes()});

  document.getElementById('leftLegSlide').addEventListener('mousemove', function(){ g_leftLegAngle = this.value; renderScenes()});
  document.getElementById('rightLegSlide').addEventListener('mousemove', function(){ g_rightLegAngle = this.value; renderScenes()});

  document.getElementById('leftFistSlide').addEventListener('mousemove', function(){ g_leftFistAngle = this.value; renderScenes()});
  document.getElementById('rightFistSlide').addEventListener('mousemove', function(){ g_rightFistAngle = this.value; renderScenes()});

  document.getElementById('animationOn').onclick = function(){g_animationFlag = true};
  document.getElementById('animationOff').onclick = function(){g_animationFlag = false};

  document.getElementById('leftArmAnimationOn').onclick = function(){g_leftArmAnimation = true};
  document.getElementById('leftArmAnimationOff').onclick = function(){g_leftArmAnimation = false};

  document.getElementById('rightArmAnimationOn').onclick = function(){g_rightArmAnimation = true};
  document.getElementById('rightArmAnimationOff').onclick = function(){g_rightArmAnimation = false};

  document.getElementById('leftFistAnimationOn').onclick = function(){g_leftFistAnimation = true};
  document.getElementById('leftFistAnimationOff').onclick = function(){g_leftFistAnimation = false};

  document.getElementById('rightFistAnimationOn').onclick = function(){g_rightFistAnimation = true};
  document.getElementById('rightFistAnimationOff').onclick = function(){g_rightFistAnimation = false};

  document.getElementById('leftLegAnimationOn').onclick = function(){g_leftLegAnimation = true};
  document.getElementById('leftLegAnimationOff').onclick = function(){g_leftLegAnimation = false};

  document.getElementById('rightLegAnimationOn').onclick = function(){g_rightLegAnimation = true};
  document.getElementById('rightLegAnimationOff').onclick = function(){g_rightLegAnimation = false};

  document.getElementById('animationOn').onclick = function(){g_animationFlag = true};
  document.getElementById('animationOff').onclick = function(){g_animationFlag = false};

  document.getElementById('angleSlide').addEventListener('mousemove', function(){ g_globalAngle = this.value; renderScenes()});


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

  gl.enable(gl.DEPTH_TEST);
}

function initTexture(){

  var sky = new Image();
  if (!sky) {
    console.log('Failed to create image object');
    return;
  }

  var grass = new Image();
  if (!grass) {
    console.log('Failed to create grass object');
    return;
  }

  var wall = new Image();
  if (!wall) {
    console.log('Failed to create wall object');
    return;
  }
  

  sky.onload = function() { sendSkyToGLSL(sky);};
  grass.onload = function() { sendGrassToGLSL(grass);};
  wall.onload = function()  {sendWallToGLSL(wall);};

  sky.src = 'sky.jpg';
  grass.src = 'grass.jpg'
  wall.src = 'wall.jpg';
  
  return true;

}

function sendSkyToGLSL(image){
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to get texture object');
    return;
  } 

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);

  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  // Set the texture unit 0 to the sample
  gl.uniform1i(u_Sampler0, 0);
}

function sendGrassToGLSL(grass) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE1);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, grass);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler1, 1);
  
  
}

function sendWallToGLSL(wall) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE2);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, wall);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler2, 2);

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

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture')
  if (!u_whichTexture) {
    console.log("Failed to get the storage location of u_whichTexture");
    return;
  }


  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0')
  if (!u_Sampler0) {
    console.log("Failed to get the storage location of u_Sampler0");
    return;
  }

  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1')
  if (!u_Sampler1) {
    console.log("Failed to get the storage location of u_Sampler1");
    return;
  }

  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2')
  if (!u_Sampler2) {
    console.log("Failed to get the storage location of u_Sampler2");
    return;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix,false,identityM.elements);
}

function keydown(ev){
  if(ev.keyCode == 39){ // right arrow move right
    camera.moveRight();
  }
  if(ev.keyCode == 40){ // left arrow move left
    
    camera.moveBackwards(); 
  }
  if(ev.keyCode == 38){ // up arrow move forward
    camera.moveForwards();
  }
  if(ev.keyCode == 37){ // down arrow move back
    camera.moveLeft();
  }

  if(ev.keyCode == 68){ // key D move right
    camera.moveRight();
  }
  if(ev.keyCode == 65){ // key A move left
    camera.moveLeft();
  }
  if(ev.keyCode == 87){ // key W move forward
    camera.moveForwards();
  }
  if(ev.keyCode == 83){ // key S arrow move back
    camera.moveBackwards(); 
  }

  if(ev.keyCode == 81){ // key Q pan left
    camera.panLeft();
  }
  if(ev.keyCode == 69){ // key E pan left
    camera.panRight();
  }
  

}

function main() {
  let eye = new Vector3([0,0,7]);
  let at = new Vector3([0,0,0]);
  let up = new Vector3([0,1,0]);

  var f = new Vector3;
  f = at.sub(eye);
  f.normalize();
  var s = new Vector3;
  s = Vector3.cross(f,up);
  s.normalize();
  var u = Vector3.cross(s,f);
  var view = new Matrix4(new Vector4(s, 0.0),
  new Vector4(u, 0.0),
  new Vector4(-f, 0.0),
  new Vector4(0.0, 0.0, 0,0, 1.0),);

console.log(view);

  setupWebGL();

  connectVariables();
  
  addActionsForHTMLUI();

  // Register function (event handler) to be called on a mouse press
  //canvas.onmousedown = function(ev){ click(ev) };

  initEventHandlers(canvas,chosenAngle);

  document.onkeydown = keydown;

  initTexture();

  // Specify the color for clearing <canvas>
  gl.clearColor(1.0, 0.9, 1.0, 1.0);

  renderScenes(canvas,chosenAngle);

  requestAnimationFrame(tick);
}

function convertCoordinatesEventsToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  
  return ([x,y]);
}

function renderScenes(){

  var startTime = performance.now();


  // Pass the Projection matrix
  var projMat = new Matrix4();
  projMat.setPerspective(90, canvas.width / canvas.height, 0.1, 1000);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

  // Pass the view matrix
  var viewMat = new Matrix4();
  //viewMat.setLookAt(g_eye[0], g_eye[1], g_eye[2], g_at[0], g_at[1], g_at[2], g_up[0], g_up[1], g_up[2], );
  viewMat.setLookAt(camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2], camera.at.elements[0], camera.at.elements[1], camera.at.elements[2], camera.up.elements[0], camera.up.elements[1], camera.up.elements[2], );
  
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  var globalRotaMat = new Matrix4().rotate(g_CurrentAngle[0],1,0,0);
  globalRotaMat.rotate(chosenAngle,0,1,0);
  globalRotaMat.rotate(g_CurrentAngle[1],0,1,0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix,false,globalRotaMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var sky = new Cube();
  sky.textureNum = -2;
  sky.color = [0,181,226,1.0];
  sky.matrix.scale(200,200,200);
  sky.matrix.translate(-.5,-.5,-.5);
  sky.render();

  var grass = new Cube();
  grass.color = [1,1,1,1];
  grass.textureNum = 1;
  grass.matrix.setTranslate(0,-1,0);
  grass.matrix.scale(200,0,200);
  grass.matrix.translate(-.5,0,-.5)
  grass.render();
  

  // draw the face
  var face = new Cube();
  face.color = [206 / 255, 123 / 255, 119 / 255, 1];
  face.matrix.translate(-0.25,0.4+jump,0);
  face.matrix.scale(0.4,.4,0.2);
  // face.textureNum = 0;
  face.render();

  // draw eye
  var eye1 = new Cube();
  eye1.color = [0.0, 0.0, 0.0, 1.0];
  eye1.matrix.translate(-0.15,0.6+jump,-.05);
  eye1.matrix.scale(0.05,0.05,0.05);
  eye1.render();

  var eye2 = new Cube();
  eye2.color = [0.0, 0.0, 0.0, 1.0];
  eye2.matrix.translate(0,0.6+jump,-.05);
  eye2.matrix.scale(0.05,0.05,0.05);
  eye2.render();

  // draw body
  var body = new Cube();
  body.color = [0,0,0,0.8];
  var legMatrix = new Matrix4(body.matrix);
  body.matrix.translate(-.35,-0.4+jump,0);
  body.matrix.scale(0.6,0.8,0.2);
  body.render();

  // draw leg
  var right_leg = new Cube();
  right_leg.color = [0,0,0,1];
  right_leg.matrix= new Matrix4(legMatrix);
  right_leg.matrix.translate(-0.3,-0.4+jump,0);
  right_leg.matrix.scale(0.15,-0.4,0.2);
  right_leg.matrix.rotate(g_rightLegAngle,1,0,0);
  right_leg.render();

  var left_leg = new Cube();
  left_leg.color = [0,0,0,1];
  left_leg.matrix= new Matrix4(legMatrix);
  left_leg.matrix.translate(0.05,-.4+jump,0);
  left_leg.matrix.scale(0.15,-0.4,0.2);
  left_leg.matrix.rotate(g_leftLegAngle,1,0,0);
  left_leg.render();

  // draw arm
  var left_arm = new Cube();
  left_arm.color = [206 / 255, 123 / 255, 119 / 255, 1];
  left_arm.matrix.translate(0.3,0.34+jump,0);
  left_arm.matrix.rotate(g_leftArmAngle,1,0,0);
  var left_armMatrix = new Matrix4(left_arm.matrix);
  left_arm.matrix.scale(0.15,-0.58,0.15);
  left_arm.render();

  var right_arm = new Cube();
  right_arm.color = [206 / 255, 123 / 255, 119 / 255, 1];
  right_arm.matrix.translate(-.55,0.34+jump,0);
  right_arm.matrix.rotate(g_rightArmAngle,1,0,0);
  var right_armMatrix = new Matrix4(right_arm.matrix);
  right_arm.matrix.scale(0.15,-0.58,0.15);
  right_arm.render();

  // draw fist
  var left_fist = new Cube();
  left_fist.color = [206 / 255, 123 / 255, 119 / 255, 1];
  left_fist.matrix = left_armMatrix;
  left_fist.matrix.translate(0,-0.6,0);
  left_fist.matrix.scale(0.15,-0.2,0.15);
  left_fist.matrix.rotate(-g_leftFistAngle,1,0,0);
  left_fist.render();

  var right_fist = new Cube();
  right_fist.color = [206 / 255, 123 / 255, 119 / 255, 1];
  right_fist.matrix = right_armMatrix;
  right_fist.matrix.translate(0,-0.6,0);
  right_fist.matrix.scale(0.15,-0.2,0.15);
  right_fist.matrix.rotate(-g_rightFistAngle,1,0,0);
  right_fist.render();
  
  drawWall0();
  drawWall1();

  var duration = performance.now() - startTime;
  sendTextToHTML("ms: " + Math.floor(duration) + "fps: " + Math.floor(1000/duration)/10, "numdot");


}

function animationUpdate(){
  if(g_animationFlag){
    g_leftArmAngle = 45 * Math.sin(g_seconds);
    g_rightArmAngle = -45 * Math.sin(g_seconds);
    document.getElementById("leftArmSlide").value = g_leftArmAngle;
    document.getElementById("rightArmSlide").value = g_rightArmAngle;

    g_leftLegAngle = -20 * Math.sin(g_seconds);
    g_rightLegAngle = 20 * Math.sin(g_seconds);
    document.getElementById("leftLegSlide").value = g_leftLegAngle;
    document.getElementById("rightLegSlide").value = g_rightLegAngle;

  }
  else{
    if(g_leftArmAnimation){
      g_leftArmAngle = g_leftArmAngle = 45 * Math.sin(g_seconds);
      document.getElementById("leftArmSlide").value = g_leftArmAngle;
    }

    if(g_rightArmAnimation){
      g_rightArmAngle = -45 * Math.sin(g_seconds);
      document.getElementById("rightArmSlide").value = g_rightArmAngle;
    }

    if(g_leftFistAnimation){
      g_leftFistAngle = 45 * Math.abs(Math.sin(g_seconds));
      document.getElementById("leftFistSlide").value = g_leftFistAngle;
    }

    if(g_rightFistAnimation){
      g_rightFistAngle = 45 * Math.abs(Math.sin(g_seconds));
      document.getElementById("rightFistSlide").value = g_rightFistAngle;
    }

    if(g_leftLegAnimation){
      g_leftLegAngle = -20 * Math.sin(g_seconds);
      document.getElementById("leftLegSlide").value = g_leftLegAngle;
    }

    if(g_rightLegAnimation){
      g_rightLegAngle = 20 * Math.sin(g_seconds);
      document.getElementById("rightLegSlide").value = g_rightLegAngle;
    }

  }

  if(g_run){
    console.log(g_run);
    jump = 2*Math.abs(Math.sin(g_seconds));
  }
}

function tick(){

  g_seconds = (performance.now()/1000.0)-g_startTime;

  renderScenes();
  animationUpdate();
  requestAnimationFrame(tick);

}

function sendTextToHTML(text,htmlID){
  var htmlElm = document.getElementById(htmlID);
  if(!htmlElm){
    console.log("Failed to get" + htmlID + " from HTML");
    return;
  }

  htmlElm.innerHTML = text;

}

function initEventHandlers(canvas, chosenAngle) {
  // https://codepen.io/hienlm/pen/BaojoBj
  var dragging = false; // Dragging or not
  var lastX = -1, lastY = -1; // Last position of the mouse
  canvas.onmousedown = function(ev) { // Mouse is pressed
      if(ev.shiftKey){
        console.log("shift");
        g_run = true;
      }
      else{
        g_run = false;
      }
      var x = ev.clientX, y = ev.clientY;
      // Start dragging if a mouse is in <canvas>
      var rect = ev.target.getBoundingClientRect();
      if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
          lastX = x; lastY = y;
          dragging = true;
          }
      };
  // Mouse is released
  canvas.onmouseup = function(ev) { dragging = false; };
      canvas.onmousemove = function(ev) { // Mouse is moved
      var x = ev.clientX, y = ev.clientY;
      if (dragging) {
          var factor = 100/canvas.height; // The rotation ratio
          var dx = factor * (x - lastX);
          var dy = factor * (y - lastY);
          // Limit x-axis rotation angle to -90 to 90 degrees
          g_CurrentAngle[0] = Math.max(Math.min(g_CurrentAngle[0] + dy, 90.0), -90.0);
          g_CurrentAngle[1] = g_CurrentAngle[1] + dx;
          }
      lastX = x, lastY = y;
      };
  }





