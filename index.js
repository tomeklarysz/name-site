const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const pointer = document.getElementById('pointer');
const ptr = pointer.getContext('2d');

const containerSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
canvas.style.width = containerSize + "px";
canvas.style.height = containerSize + "px";
pointer.style.width = containerSize + "px";
pointer.style.height = containerSize + "px";

const r = 215;
const cx = canvas.width / 2;
const cy = canvas.height / 2;

const N = 9;
const angleStep = (2*Math.PI) / N;


for (let i=0; i<N; i++) {
  
  const startAngle = i * angleStep;
  const endAngle = startAngle + angleStep;
  const middleAngle = (startAngle + endAngle) / 2;
  
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = i == 8 ? 'red' :'#4461f3';
  ctx.fill();
  
  ctx.strokeStyle = 'black';
  ctx.stroke();
  
  const x = cx + 0.6*r*Math.cos(middleAngle);
  const y = cy + 0.6*r*Math.sin(middleAngle);
  
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(middleAngle);
  
  ctx.fillStyle = "black";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const text = i == 8 ? 'Płacisz 6zł za disney' : 'Niespodzianka';
  ctx.fillText(text, 0, 0);
  
  ctx.restore();
}

ctx.canvas.style.transform = `rotate(${0.9}rad)`;

// pointer
ptr.beginPath();
ptr.fillStyle = ' #2b3648';
ptr.fillRect(450, 245, 30, 10);
ptr.stroke();

const MIN = 1.9101
const MAX = 1.918
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

document.querySelector('#spin').addEventListener('click', () => {
  toDefaultRotation();
  spin();
});
