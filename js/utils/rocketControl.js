function closeModal() {
      const modal = document.getElementById('introModal');
      if (modal) modal.style.display = 'none';
    }

document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('rocketSVG');
    svg.addEventListener('click', () => {
    let offset = 0;
    const anim = setInterval(() => {
        offset -=10;
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