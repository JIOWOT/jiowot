/* SVG IoT topology animation (standard animation, lightweight)
   Renders in #topology-wrapper on the homepage.
*/
(function(){
  const container = document.getElementById('topology-wrapper');
  if(!container) return;
  container.style.minHeight = '260px';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';

  const svgns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('viewBox','0 0 900 300');
  svg.setAttribute('width','100%');
  svg.setAttribute('height','100%');

  function mkNode(x,y,label,color){
    const g = document.createElementNS(svgns,'g');
    g.setAttribute('transform','translate('+x+','+y+')');
    const rect = document.createElementNS(svgns,'rect');
    rect.setAttribute('x',-56); rect.setAttribute('y',-20); rect.setAttribute('width',112); rect.setAttribute('height',40);
    rect.setAttribute('rx',10); rect.setAttribute('fill', color); rect.setAttribute('opacity',0.12);
    rect.setAttribute('stroke',color); rect.setAttribute('stroke-width',1);
    const text = document.createElementNS(svgns,'text');
    text.setAttribute('x',0); text.setAttribute('y',6); text.setAttribute('text-anchor','middle'); text.setAttribute('font-size','12'); text.setAttribute('fill','#dff8ff');
    text.textContent = label;
    g.appendChild(rect); g.appendChild(text);
    return g;
  }

  // coordinates
  const coords = { sx:100, ex:300, gx:500, nsx:660, cx:820, y:150 };
  // sensors
  const sensors = ['Temp Sensor','Soil Sensor','AQI Sensor'];
  sensors.forEach((s,i)=>{
    const y = coords.y + (i-1)*60;
    const n = mkNode(coords.sx, y, s, '#00bfa6'); svg.appendChild(n);
    const path = document.createElementNS(svgns,'path');
    path.setAttribute('d','M '+(coords.sx+56)+' '+y+' C '+(coords.sx+120)+' '+y+' '+(coords.ex-80)+' '+y+' '+(coords.ex-56)+' '+y);
    path.setAttribute('stroke','rgba(255,255,255,0.06)'); path.setAttribute('fill','none'); path.setAttribute('stroke-width',2);
    svg.appendChild(path);
  });

  const edge = mkNode(coords.ex, coords.y, 'Edge (ESP32/STM32)', '#7c4dff'); svg.appendChild(edge);
  const gw = mkNode(coords.gx, coords.y, 'Gateway (LoRa/NB-IoT)', '#00a8ff'); svg.appendChild(gw);
  const ns = mkNode(coords.nsx, coords.y, 'Network Server', '#00e676'); svg.appendChild(ns);
  const cloud = mkNode(coords.cx, coords.y, 'Cloud IoT Platform', '#ffd54f'); svg.appendChild(cloud);

  function link(x1,x2,y){
    const p = document.createElementNS(svgns,'path');
    p.setAttribute('d','M '+(x1+56)+' '+y+' C '+(x1 + (x2-x1)/2)+' '+(y-60)+' '+(x2 - (x2-x1)/2)+' '+(y+60)+' '+(x2-56)+' '+y);
    p.setAttribute('stroke','rgba(255,255,255,0.06)');
    p.setAttribute('fill','none'); p.setAttribute('stroke-width',2);
    svg.appendChild(p);
    return p;
  }

  const p1 = link(coords.ex, coords.gx, coords.y);
  const p2 = link(coords.gx, coords.nsx, coords.y);
  const p3 = link(coords.nsx, coords.cx, coords.y);

  function animatePacket(path, color, speed){
    const c = document.createElementNS(svgns,'circle');
    c.setAttribute('r',5); c.setAttribute('fill',color);
    svg.appendChild(c);
    const len = path.getTotalLength();
    let pos = Math.random()*len;
    function frame(){
      pos = (pos + speed) % len;
      const pt = path.getPointAtLength(pos);
      c.setAttribute('cx', pt.x);
      c.setAttribute('cy', pt.y);
      requestAnimationFrame(frame);
    }
    frame();
  }

  animatePacket(p1, '#00e5ff', 1.1);
  animatePacket(p1, '#ffd74f', 0.7);
  animatePacket(p2, '#00e5ff', 0.9);
  animatePacket(p3, '#ffd74f', 1.0);

  container.appendChild(svg);
})();
