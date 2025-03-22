function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

function initPositionBuffer(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [];
  const segments = 64;
  const innerRadius = 0.20;      // Radius of the filled inner circle
  const borderInnerRadius = 0.20; // Inner radius of the black border
  const borderOuterRadius = 0.20; // Outer radius of the black border
  
  // Create vertices for the main wheel
  positions.push(0.0, 0.0);
  for (let i = 0; i <= segments; i++) {
    const theta = (i * 2.0 * Math.PI) / segments;
    const x = Math.cos(theta) * 0.8;
    const y = Math.sin(theta) * 0.8;
    positions.push(x, y);
  }

  // Create vertices for the filled inner circle
  positions.push(0.0, 0.0);
  for (let i = 0; i <= segments; i++) {
    const theta = (i * 2.0 * Math.PI) / segments;
    const x = Math.cos(theta) * innerRadius;
    const y = Math.sin(theta) * innerRadius;
    positions.push(x, y);
  }

  // Create vertices for the black border ring
  for (let i = 0; i <= segments; i++) {
    const theta = (i * 2.0 * Math.PI) / segments;
    const x = Math.cos(theta) * borderInnerRadius;
    const y = Math.sin(theta) * borderInnerRadius;
    positions.push(x, y);
  }
  for (let i = 0; i <= segments; i++) {
    const theta = (i * 2.0 * Math.PI) / segments;
    const x = Math.cos(theta) * borderOuterRadius;
    const y = Math.sin(theta) * borderOuterRadius;
    positions.push(x, y);
  }

  // Add pointer
  positions.push(-0.08, 0.0);  // Left base point
  positions.push(0.08, 0.0);   // Right base point
  positions.push(0.0, 0.3);    // Top point

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return positionBuffer;
}

function initColorBuffer(gl) {
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  const segments = 64;
  const percentage = 0.85;
  const blueSegments = Math.floor(segments * percentage);
  
  const colors = [];
  
  // Colors for main wheel
  colors.push(1.0, 1.0, 1.0, 1.0); // Center
  for (let i = 0; i <= segments; i++) {
    if (i <= blueSegments) {
      colors.push(0.3, 0.3, 1.0, 1.0); // Blue
    } else {
      colors.push(1.0, 0.2, 0.2, 1.0); // Red
    }
  }

  // Colors for filled inner circle (light gray)
  colors.push(0.9, 0.9, 0.9, 1.0); // Center
  for (let i = 0; i <= segments; i++) {
    colors.push(0.9, 0.9, 0.9, 1.0); // Light gray
  }

  // Colors for black border ring
  for (let i = 0; i <= segments * 2 + 1; i++) {
    colors.push(0.0, 0.0, 0.0, 1.0); // Pure black
  }

  // Colors for pointer
  colors.push(0.0, 0.0, 0.0, 1.0);
  colors.push(0.0, 0.0, 0.0, 1.0);
  colors.push(0.0, 0.0, 0.0, 1.0);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  return colorBuffer;
}

export { initBuffers };
