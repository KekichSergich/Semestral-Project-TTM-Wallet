function closeModal() {
      const modal = document.getElementById('introModal');
      if (modal) modal.style.display = 'none';
    }

document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('rocketSVG');
  const flame = document.getElementById('flame');
  const flameColors = ['orange', '#00bfff', '#ff4500', '#ffa500'];
  let flameIndex = 0;

  function cycleFlameColor() {
    flameIndex = (flameIndex + 1) % flameColors.length;
    flame.setAttribute('fill', flameColors[flameIndex]);
  }

  svg.addEventListener('click', () => {
    setInterval(cycleFlameColor, 100);
    let offset = 0;
    const anim = setInterval(() => {
      offset -= 10;
      svg.style.transform = `translateY(${offset}px)`;
      svg.style.transition = 'transform 0.03s linear';
      if (offset < -220) {
        clearInterval(anim);
        svg.remove();
        closeModal();
      }
    }, 30);
  });
});







