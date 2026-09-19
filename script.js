const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h, points;

const COLORS = ['#8b5cf6', '#3b82f6'];
const DENSITY = 0.00009; // puntos por pixel²
const LINK_DIST = 140;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  const count = Math.min(90, Math.floor(w * h * DENSITY));
  points = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  }));
}

function step(){
  ctx.clearRect(0, 0, w, h);

  for(const p of points){
    p.x += p.vx;
    p.y += p.vy;
    if(p.x < 0 || p.x > w) p.vx *= -1;
    if(p.y < 0 || p.y > h) p.vy *= -1;
  }

  for(let i = 0; i < points.length; i++){
    for(let j = i + 1; j < points.length; j++){
      const a = points[i], b = points[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if(dist < LINK_DIST){
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.14 * (1 - dist / LINK_DIST)})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for(const p of points){
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(step);
}

window.addEventListener('resize', resize);
resize();

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  requestAnimationFrame(step);
}