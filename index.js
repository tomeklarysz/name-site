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
ctx.beginPath();
ctx.fillStyle = ' #2b3648';
ctx.fillRect(245 , 250 - 230, 10, 30);
ctx.stroke();