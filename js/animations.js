// Scroll animations
const animationModule = {
    init() {
        this.observeElements();
        this.handleScrollAnimations();
    },

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
            observer.observe(el);
        });
    },

    handleScrollAnimations() {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            document.querySelector('.hero').style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }
};

document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    document.querySelector('.carousel-track').style.animationPlayState = 'paused';
  });
  
  document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    document.querySelector('.carousel-track').style.animationPlayState = 'running';
  });