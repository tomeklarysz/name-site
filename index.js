const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');

// wheel
ctx.beginPath();
ctx.moveTo(250,250);
ctx.arc(250, 250, 215, 1.8*Math.PI, 2*Math.PI);
ctx.closePath();
ctx.fillStyle = 'red';
ctx.fill();
ctx.strokeStyle = 'black';
ctx.stroke();
ctx.fillStyle = 'black';
ctx.font = '15px Verdana';
// ctx.fillText('Płacisz 6 zł', 210, 100);
// ctx.fillText('za disney', 215, 120);

let N = 9;
let sectorsAngle = 0;
for (let i=0; i<N; i++) {
  ctx.beginPath();
  ctx.moveTo(250,250);
  ctx.arc(250, 250, 215, sectorsAngle*Math.PI, (sectorsAngle+0.2)*Math.PI);
  ctx.closePath();

  ctx.fillStyle = '#4461f3';
  ctx.fill();

  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = 'black';
  ctx.font = '18px Verdana';
  // ctx.fillText('Niespodzianka', 188, 300);
  ctx.closePath();
  sectorsAngle += 0.2;
}
// pointer
const pointer = document.getElementById('pointer');
const ptr = pointer.getContext('2d');
ptr.beginPath();
ptr.fillStyle = ' #2b3648';
ptr.fillRect(245 , 250 - 230, 10, 30);
ptr.stroke();

const MIN = 1.906
const MAX = 1.913
const friction = 0.988;
let angularVelocity = 0;
let angle = 0;

const spin = () => {
  angularVelocity *= friction;
  if (angularVelocity < 0.002) angularVelocity = 0;
  angle += angularVelocity
  ctx.canvas.style.transform = `rotate(${angle}rad)`;
  if (angularVelocity > 0) {
    requestAnimationFrame(spin);
  }
}

const toDefaultRotation = () => {
  angle = 0;
  angularVelocity = rand(MIN, MAX);
}

const rand = (m, M) => Math.random() * (M - m) + m;

document.querySelector('button').addEventListener('click', () => {
  toDefaultRotation();
  spin();
});