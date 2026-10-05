/**
 * DIVISAR STORE — Viewport QR Code Modal Component
 * Perfect scroll lock system:
 * 1. Saves exact scroll position (window.scrollY)
 * 2. Locks body with position: fixed, top offset, and scrollbar compensation
 * 3. Prevents layout shifts and background touch scrolling
 * 4. Restores exact scroll position on close with zero page jumps or URL changes.
 */

(function () {
  let qrOverlay = null;
  let qrCloseBtn = null;
  let copyBtn = null;

  // 1. Create and Attach Modal directly to document.body (Portal pattern)
  function initQRModalDOM() {
    if (document.getElementById('divisar-qr-modal-overlay')) {
      qrOverlay = document.getElementById('divisar-qr-modal-overlay');
      qrCloseBtn = document.getElementById('divisar-qr-modal-close');
      copyBtn = document.getElementById('qr-modal-copy-btn');
      return;
    }

    qrOverlay = document.createElement('div');
    qrOverlay.id = 'divisar-qr-modal-overlay';
    qrOverlay.className = 'qr-modal-overlay';
    qrOverlay.setAttribute('role', 'dialog');
    qrOverlay.setAttribute('aria-modal', 'true');
    qrOverlay.setAttribute('aria-label', 'DIVISAR STORE QR Code Modal');

    const isInternal = window.location.pathname.includes('/pages/');
    const basePath = isInternal ? '../' : '';
    const qrImgPath = `${basePath}assets/brand/divisar-qr-code.svg`;
    const qrPngPath = `${basePath}assets/brand/divisar-qr-code.png`;
    const websiteUrl = 'https://divisar-store.vercel.app/';

    qrOverlay.innerHTML = `
      <div class="qr-modal-container" id="divisar-qr-modal-container">
        <button type="button" class="qr-modal-close" id="divisar-qr-modal-close" aria-label="Close QR Code">✕</button>
        
        <h2 class="qr-modal-title">DIVISAR STORE — WEBSITE QR CODE</h2>
        <p class="qr-modal-subtitle">Scan this QR code with any smartphone camera to visit DIVISAR STORE instantly.</p>
        
        <div class="qr-modal-image-wrap">
          <img src="${qrImgPath}" alt="DIVISAR STORE QR Code" class="qr-modal-image" />
        </div>
        
        <div class="qr-modal-domain">${websiteUrl}</div>

        <div class="qr-modal-actions">
          <a href="${qrPngPath}" download="divisar-store-qr.png" class="btn btn-gold">DOWNLOAD PNG</a>
          <a href="${qrImgPath}" download="divisar-store-qr.svg" class="btn btn-primary">DOWNLOAD SVG</a>
          <button type="button" class="btn btn-secondary" id="qr-modal-copy-btn">COPY URL</button>
        </div>
      </div>
    `;

    document.body.appendChild(qrOverlay);

    qrCloseBtn = document.getElementById('divisar-qr-modal-close');
    copyBtn = document.getElementById('qr-modal-copy-btn');

    // Prevent background touch scrolling on mobile
    qrOverlay.addEventListener('touchmove', (e) => {
      if (!e.target.closest('#divisar-qr-modal-container')) {
        e.preventDefault();
      }
    }, { passive: false });

    // Close triggers
    qrCloseBtn?.addEventListener('click', closeQRModal);
    qrOverlay?.addEventListener('click', (e) => {
      if (e.target === qrOverlay) closeQRModal(e);
    });

    // Copy URL trigger
    copyBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(websiteUrl).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'COPIED!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      }).catch(() => {
        alert(`Website URL: ${websiteUrl}`);
      });
    });
  }

  // 2. Open QR Modal — Saves exact scroll position, applies scrollbar compensation, locks body
  function openQRModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!qrOverlay) initQRModalDOM();
    if (qrOverlay.classList.contains('active')) return;

    // Save exact scroll Y position
    const savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.setAttribute('data-saved-scroll-y', savedScrollY.toString());

    // Calculate scrollbar width for zero layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Lock body at exact scroll position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Activate fixed viewport modal
    qrOverlay.classList.add('active');
    qrCloseBtn?.focus();
  }

  // 3. Close QR Modal — Unlocks body, restores scrollbar & restores exact scroll position
  function closeQRModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!qrOverlay || !qrOverlay.classList.contains('active')) return;

    // Read saved scroll position
    const savedTop = document.body.style.top || document.body.getAttribute('data-saved-scroll-y') || '0';
    const restoreY = Math.abs(parseInt(savedTop, 10)) || 0;

    // Deactivate overlay
    qrOverlay.classList.remove('active');

    // Restore body styles & scrollbar compensation
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    // Instantly restore exact scroll Y position without jumps
    window.scrollTo(0, restoreY);
  }

  // 4. Capture-Phase Event Delegation (Instant First-Click Activation)
  const qrSelector = '.footer-qr-card, .open-qr-modal, [aria-label*="QR Code"], [title*="QR code"]';

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest(qrSelector);
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      openQRModal(e);
    }
  }, true);

  // Keyboard accessibility (Enter / Space to open, ESC to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const trigger = e.target.closest(qrSelector);
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        openQRModal(e);
      }
    } else if (e.key === 'Escape' && qrOverlay && qrOverlay.classList.contains('active')) {
      closeQRModal(e);
    }
  });

  // Initialize on load or immediate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQRModalDOM);
  } else {
    initQRModalDOM();
  }

  // Expose global methods
  window.openDivisarQRModal = openQRModal;
  window.closeDivisarQRModal = closeQRModal;
})();
