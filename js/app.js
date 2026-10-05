/**
 * DIVISAR STORE — Master JS Controller
 * "Connecting Sansar to Divine, in a Sustainable Way."
 */

// Legacy helper bindings for store preview drawer integration
document.addEventListener('DOMContentLoaded', () => {
  const catalogDrawer = document.getElementById('catalog-preview-drawer');
  const catalogDrawerTrigger = document.querySelectorAll('.toggle-catalog-preview');
  const catalogCloseBtn = document.getElementById('catalog-drawer-close');
  const catalogListContainer = document.getElementById('catalog-cards-container');

  const openCatalogDrawer = () => {
    if (window.DivisarStore) {
      window.DivisarStore.renderCatalogPreview(catalogListContainer);
    }
    catalogDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCatalogDrawer = () => {
    catalogDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  };

  catalogDrawerTrigger.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCatalogDrawer();
  }));

  catalogCloseBtn?.addEventListener('click', closeCatalogDrawer);

  const updateCartBadge = () => {
    const badges = document.querySelectorAll('.cart-count-badge');
    const count = window.DivisarStore ? window.DivisarStore.getCartCount() : 0;
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  };

  window.addEventListener('divisar:state-updated', () => {
    updateCartBadge();
    if (catalogDrawer?.classList.contains('active')) {
      window.DivisarStore.renderCatalogPreview(catalogListContainer);
    }
  });
  
  updateCartBadge();
});
