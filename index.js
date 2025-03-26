const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');

// wheel
ctx.beginPath();
ctx.moveTo(250,250);
ctx.arc(250, 250, 215, 1.4*Math.PI, 1.6*Math.PI);
ctx.fillStyle = 'red';
ctx.fill();
ctx.fillStyle = 'black';
ctx.font = '15px Verdana';
ctx.fillText('Płacisz 6 zł', 210, 100);
ctx.fillText('za disney', 215, 120);

ctx.beginPath();
ctx.moveTo(250,250);
ctx.arc(250, 250, 215, -0.4*Math.PI, 1.4*Math.PI);
ctx.fillStyle = '#4461f3';
ctx.fill();
ctx.fillStyle = 'black';
ctx.font = '18px Verdana';
ctx.fillText('Niespodzianka', 188, 300);
ctx.closePath();

// pointer
const pointer = document.getElementById('pointer');
const ptr = pointer.getContext('2d');
ptr.beginPath();
ptr.fillStyle = ' #2b3648';
ptr.fillRect(245 , 250 - 230, 10, 30);
ptr.stroke();

let angle = 0;
const friction = 0.95;
let angularVelocity = 1.98;

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
  angularVelocity = rand(1.97, 2);
}

const rand = (m, M) => Math.random() * (M - m) + m;

document.querySelector('button').addEventListener('click', () => {
  toDefaultRotation();
  spin();
});