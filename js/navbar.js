/**
 * DIVISAR STORE — Shared Navbar & Active Navigation Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header State on Scroll
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Drawer Controls
  const menuTrigger = document.querySelector('.mobile-menu-trigger');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  const openDrawer = () => {
    drawerOverlay?.classList.add('active');
    mobileDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawerOverlay?.classList.remove('active');
    mobileDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuTrigger?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // Close drawer and allow clean navigation on drawer link click
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // 3. Highlight Active Navigation Item Based on Current Page URL
  const currentPath = window.location.pathname.toLowerCase();
  
  // Desktop Nav Links
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const hrefLower = href.toLowerCase();
    
    // Match page filenames
    if (
      (hrefLower.includes('our-story.html') && currentPath.includes('our-story.html')) ||
      (hrefLower.includes('the-problem.html') && currentPath.includes('the-problem.html')) ||
      (hrefLower.includes('pillars.html') && currentPath.includes('pillars.html')) ||
      (hrefLower.includes('philosophy.html') && currentPath.includes('philosophy.html')) ||
      (hrefLower.includes('sustainability.html') && currentPath.includes('sustainability.html')) ||
      (hrefLower.includes('collections.html') && currentPath.includes('collections.html')) ||
      (hrefLower.includes('journal.html') && currentPath.includes('journal.html'))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Drawer Links
  drawerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const hrefLower = href.toLowerCase();
    if (
      (hrefLower.includes('our-story.html') && currentPath.includes('our-story.html')) ||
      (hrefLower.includes('the-problem.html') && currentPath.includes('the-problem.html')) ||
      (hrefLower.includes('pillars.html') && currentPath.includes('pillars.html')) ||
      (hrefLower.includes('philosophy.html') && currentPath.includes('philosophy.html')) ||
      (hrefLower.includes('sustainability.html') && currentPath.includes('sustainability.html')) ||
      (hrefLower.includes('collections.html') && currentPath.includes('collections.html')) ||
      (hrefLower.includes('journal.html') && currentPath.includes('journal.html')) ||
      ((hrefLower.includes('index.html') || hrefLower === '#top') && (currentPath === '/' || currentPath.endsWith('index.html')))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Bottom Bar Active Item
  const bottomItems = document.querySelectorAll('.mobile-bottom-item');
  bottomItems.forEach(item => {
    const href = item.getAttribute('href');
    if (!href) return;
    const hrefLower = href.toLowerCase();

    if (
      (hrefLower.includes('our-story.html') && currentPath.includes('our-story.html')) ||
      (hrefLower.includes('sustainability.html') && currentPath.includes('sustainability.html')) ||
      (hrefLower.includes('journal.html') && currentPath.includes('journal.html')) ||
      ((hrefLower.includes('index.html') || hrefLower === '#top') && (currentPath === '/' || currentPath.endsWith('index.html')))
    ) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});
