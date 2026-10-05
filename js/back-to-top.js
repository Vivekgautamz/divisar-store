/**
 * DIVISAR STORE — Floating Back To Top Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  const fab = document.getElementById('back-to-top-fab');
  const SCROLL_THRESHOLD = 150;

  const handleScroll = () => {
    if (window.scrollY >= SCROLL_THRESHOLD) {
      fab?.classList.add('is-visible');
    } else {
      fab?.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  const scrollToTop = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  fab?.addEventListener('click', scrollToTop);

  // Keyboard accessibility
  fab?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  handleScroll();
});
