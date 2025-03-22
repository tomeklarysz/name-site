import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";

let squareRotation = 0.0;
let deltaTime = 0;
let isSpinning = false;
let spinVelocity = 0;
const friction = 2.5; // Adjusts how quickly the wheel slows down
const initialSpinSpeed = 15; // Initial rotation speed when spin starts
let resultText = document.createElement("div");

main();

function main() {
  const canvas = document.querySelector("#gl-canvas");
  
  // Set canvas size to be smaller
  canvas.width = 400;
  canvas.height = 400;
  
  // Center the canvas and make background transparent
  canvas.style.display = "block";
  canvas.style.margin = "20px auto";
  canvas.style.backgroundColor = "transparent";
  
  // Style the button to look better
  const spinButton = document.createElement("button");
  spinButton.textContent = "Spin Wheel";
  spinButton.style.display = "block";
  spinButton.style.margin = "10px auto";
  spinButton.style.padding = "10px 20px";
  spinButton.style.fontSize = "16px";
  spinButton.style.cursor = "pointer";
  canvas.parentNode.insertBefore(spinButton, canvas.nextSibling);
  
  // Add result text display
  resultText.style.textAlign = "center";
  resultText.style.margin = "10px";
  resultText.style.fontSize = "20px";
  resultText.style.fontFamily = "Arial, sans-serif";
  canvas.parentNode.insertBefore(resultText, canvas.nextSibling);

  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it.",
    );
    return;
  }

  // Update the clear color to be transparent
  gl.clearColor(0.0, 0.0, 0.0, 0.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  const fsSource = `
    varying lowp vec4 vColor;
    void main() {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);
  
  let then = 0;

  // Add button click handler
  spinButton.addEventListener("click", () => {
    if (!isSpinning) {
      isSpinning = true;
      spinVelocity = initialSpinSpeed;
      spinButton.disabled = true;
      spinButton.textContent = "Spinning...";
    }
  });

  function updateResult(rotation) {
    // Normalize rotation to 0-360 degrees
    const degrees = ((rotation * 180 / Math.PI) % 360 + 360) % 360;
    // Calculate if pointer is in blue section (85% = 306 degrees)
    // No need to add 90 degrees now since pointer is at top
    const isBlue = degrees <= 306;
    resultText.textContent = `Result: ${isBlue ? 'Blue' : 'Red'}`;
    resultText.style.color = isBlue ? '#0000FF' : '#FF0000';
  }

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001; // convert to seconds
    deltaTime = now - then;
    then = now;
  
    if (isSpinning) {
      // Apply friction to slow down the spin
      spinVelocity = Math.max(0, spinVelocity - friction * deltaTime);
      
      // Update rotation based on current velocity
      squareRotation += spinVelocity * deltaTime;

      // Check if the wheel has essentially stopped
      if (spinVelocity < 0.01) {
        isSpinning = false;
        spinVelocity = 0;
        spinButton.disabled = false;
        spinButton.textContent = "Spin Wheel";
        updateResult(squareRotation);
      }
    }
  
    drawScene(gl, programInfo, buffers, squareRotation);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram,
      )}`,
    );
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`,
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
