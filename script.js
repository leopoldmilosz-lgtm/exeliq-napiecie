(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));

  const kwp = document.getElementById('kwp');
  const hours = document.getElementById('hours');
  const days = document.getElementById('days');
  const price = document.getElementById('price');
  const lossResult = document.getElementById('lossResult');
  const lossValueResult = document.getElementById('lossValueResult');
  const priceLabel = document.getElementById('priceLabel');

  function updateLoss() {
    if (!kwp || !hours || !days || !lossResult) return;
    const value = Math.max(0, Math.round(Number(kwp.value || 0) * Number(hours.value || 0) * Number(days.value || 0) * 0.82));
    const energyPrice = Math.max(0, Number(price?.value || 0));
    const valuePLN = value * energyPrice;
    lossResult.textContent = value.toLocaleString('pl-PL');
    if (lossValueResult) {
      lossValueResult.textContent = valuePLN.toLocaleString('pl-PL', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    if (priceLabel) {
      priceLabel.textContent = energyPrice.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }
  [kwp, hours, days, price].forEach((input) => input && input.addEventListener('input', updateLoss));
  updateLoss();

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dots = [];
  let raf = null;
  let mouse = { x: -9999, y: -9999 };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dotBase = prefersReducedMotion ? 40 : 92;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(42, Math.min(110, Math.round((width * height) / 18500)));
    dots = Array.from({ length: Math.min(dotBase, count) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.7 + .7,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const maxDistance = Math.min(150, Math.max(105, width / 10));

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      if (!prefersReducedMotion) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20 || d.x > width + 20) d.vx *= -1;
        if (d.y < -20 || d.y > height + 20) d.vy *= -1;
      }

      const mdx = d.x - mouse.x;
      const mdy = d.y - mouse.y;
      const md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 130 && !prefersReducedMotion) {
        d.x += mdx / md * .12;
        d.y += mdy / md * .12;
      }

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(140, 247, 255, 0.58)';
      ctx.fill();

      for (let j = i + 1; j < dots.length; j++) {
        const d2 = dots[j];
        const dx = d.x - d2.x;
        const dy = d.y - d2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.strokeStyle = `rgba(39, 220, 227, ${0.12 * (1 - dist / maxDistance)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    if (!prefersReducedMotion) raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', (event) => { mouse = { x: event.clientX, y: event.clientY }; }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse = { x: -9999, y: -9999 }; }, { passive: true });
  resize();
  draw();

  window.addEventListener('beforeunload', () => {
    if (raf) cancelAnimationFrame(raf);
  });
})();
