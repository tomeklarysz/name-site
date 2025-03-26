const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');

// wheel
ctx.beginPath();
ctx.arc(250, 250, 215, 0, 2 * Math.PI);
ctx.stroke();
ctx.fillStyle = 'blue';
ctx.fill();
ctx.closePath();

// lines of 'pie'
ctx.beginPath();
ctx.moveTo((250 + 250 - 215) / 2, 250-185);
ctx.lineTo(250, 250);
ctx.stroke();
ctx.fillStyle = 'red';
ctx.fill();
ctx.moveTo((250 + 250 + 215) / 2, 250-185);
ctx.lineTo(250, 250);
ctx.stroke();

// pointer 
ctx.fillRect(245 , 250 - 220, 10, 30);