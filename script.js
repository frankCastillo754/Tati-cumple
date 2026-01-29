let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  rotating = false;

  init(paper) {
    // Detectar eventos de movimiento
    const moveHandler = (x, y) => {
      if(!this.rotating && this.holdingPaper) {
        this.velX = x - this.prevX;
        this.velY = y - this.prevY;

        this.currentX += this.velX;
        this.currentY += this.velY;

        paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;

        this.prevX = x;
        this.prevY = y;
      }
    };

    // Mouse
    document.addEventListener('mousemove', e => moveHandler(e.clientX, e.clientY));
    // Touch
    document.addEventListener('touchmove', e => {
      e.preventDefault(); // evita scroll
      moveHandler(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: false});

    // Iniciar arrastre
    const startHandler = (x, y, rightClick = false) => {
      if(this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevX = x;
      this.prevY = y;
      this.startX = x;
      this.startY = y;
      this.rotating = rightClick;
    };

    // Mouse down
    paper.addEventListener('mousedown', e => startHandler(e.clientX, e.clientY, e.button === 2));
    // Touch start
    paper.addEventListener('touchstart', e => {
      e.preventDefault();
      startHandler(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: false});

    // Soltar
    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };
    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchend', endHandler);
  }
}

// Inicializar todas las tarjetas
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
