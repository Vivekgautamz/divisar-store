/**
 * DIVISAR STORE — Main Interactive Application Logic
 * "Connecting Sansar to Divine, in a Sustainable Way."
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 2. Global Modal System
  const modalOverlay = document.getElementById('global-modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const openModal = (title, htmlContent) => {
    if (!modalOverlay || !modalTitle || !modalBody) return;
    modalTitle.innerHTML = title;
    modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.DivisarModal = { openModal, closeModal };

  // 3. Journal Reader Data & Modal Trigger
  const JOURNAL_ARTICLES = {
    'art-1': {
      title: 'The Hidden Cost of Devotion',
      category: 'Impact',
      readTime: '4 min read',
      date: 'Autumn 2026',
      image: 'assets/images/craft-sustainable-incense.jpg',
      content: `
        <p class="intro-paragraph"><strong>What happens after the sacred prayer concludes?</strong></p>
        <p>Across millions of households and temples, our rituals express profound love and gratitude for the Divine. Yet over recent decades, rapid commercialization replaced traditional biodegradable earthen items with single-use plastics, synthetic dyes, and paraffin wicks.</p>
        <p>Devotional products used for just minutes frequently linger in natural habitats for decades. Improper disposal of synthetic garlands and non-soluble decor chokes our sacred rivers and wetlands.</p>
        <div class="intro-quote-card">"Your faith should bring you closer to the Divine — not further away from nature."</div>
        <p>At DIVISAR STORE, we recognize that true devotion has always respected Mother Nature. By choosing raw brass, unbleached cotton, and upcycled floral extracts, we restore reverence to every prayer.</p>
      `
    },
    'art-2': {
      title: 'Spirituality & Inclusivity Without Barriers',
      category: 'Philosophy',
      readTime: '3 min read',
      date: 'Autumn 2026',
      image: 'assets/images/story-reverence.jpg',
      content: `
        <p class="intro-paragraph"><strong>No caste. No community barriers. No discrimination.</strong></p>
        <p>The divine experience belongs to every living soul. DIVISAR was founded on the uncompromising belief that spiritual connection transcends artificial societal boundaries, rituals of exclusion, and commercialized gatekeeping.</p>
        <p>We celebrate traditions from across diverse regions, creating an uplifting sanctuary where everyone feels welcomed, respected, and empowered to connect with their personal conception of the Divine.</p>
      `
    },
    'art-3': {
      title: 'A More Conscious Way to Practice Everyday Devotion',
      category: 'Rituals',
      readTime: '5 min read',
      date: 'Autumn 2026',
      image: 'assets/images/coming-soon-materials.jpg',
      content: `
        <p class="intro-paragraph"><strong>Practical ways to make your home altar a haven of sustainability.</strong></p>
        <p>Transforming your daily spiritual practice does not require abandoning beloved traditions. In fact, returning to authentic traditional materials is the most sustainable choice possible:</p>
        <ul style="margin: 1rem 0 1.5rem 1.5rem; line-height: 1.8; list-style-type: square;">
          <li><strong>Replace synthetic wicks:</strong> Choose unbleached, hand-spun pure organic cotton.</li>
          <li><strong>Say no to paraffin tealights:</strong> Opt for natural ghee, mustard oil, or pure unglazed clay diyas.</li>
          <li><strong>Embrace flower-based incense:</strong> Avoid charcoal incense with synthetic aromatic compounds.</li>
          <li><strong>Compost sacred offerings:</strong> Return dried flowers directly to plant soil.</li>
        </ul>
      `
    },
    'art-4': {
      title: 'Connecting Sansar to Divine: The Meaning Behind DIVISAR',
      category: 'Etymology',
      readTime: '4 min read',
      date: 'Autumn 2026',
      image: 'assets/images/hero-sacred-dawn.jpg',
      content: `
        <p class="intro-paragraph"><strong>Understanding the etymology of DIVISAR.</strong></p>
        <p>In Sanskrit, <em>Sansar</em> represents the living world we inhabit — rivers, soil, forests, and all living beings. <em>DIVI</em> represents the Divine Spirit.</p>
        <p>DIVISAR bridges these two realms, ensuring that our expressions of spirituality leave a positive, restorative legacy on the world around us.</p>
      `
    }
  };

  document.querySelectorAll('.read-journal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = btn.getAttribute('data-article-id');
      const article = JOURNAL_ARTICLES[articleId];
      if (article) {
        const isInternal = window.location.pathname.includes('/pages/');
        const imgPath = isInternal ? '../' + article.image : article.image;

        const modalHtml = `
          <div style="margin-bottom: 1.5rem;">
            <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--color-gold-dark); font-weight: 700; letter-spacing: 0.12em; margin-bottom: 0.4rem;">
              ${article.category} • ${article.readTime}
            </div>
            <h2 style="font-size: 1.7rem; line-height: 1.25; color: var(--color-primary-dark); margin-bottom: 1rem;">${article.title}</h2>
            <img src="${imgPath}" alt="${article.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.5rem;" />
            <div style="color: var(--color-text-muted); font-size: 1rem; line-height: 1.75;">
              ${article.content}
            </div>
          </div>
        `;
        openModal(article.title, modalHtml);
      }
    });
  });

  // 4. Website QR Code Modal handled exclusively by js/qr-modal.js (fixed viewport locking)


  // 5. Search Modal System
  const searchTriggers = document.querySelectorAll('.search-trigger');
  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isInternal = window.location.pathname.includes('/pages/');
      const pagePrefix = isInternal ? '' : 'pages/';

      const searchHtml = `
        <div style="margin-top: 1rem;">
          <input type="text" id="live-search-input" placeholder="Search pages, philosophy, sustainability, pillars..." 
                 style="width: 100%; height: 48px; padding: 0 1.25rem; border: 1px solid var(--color-gold); border-radius: var(--radius-sm); font-size: 1rem; margin-bottom: 1.25rem;" autofocus />
          <div id="search-suggestions">
            <div style="font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.75rem; color: var(--color-gold-dark); margin-bottom: 0.75rem;">
              Quick Page Navigation:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
              <a href="${pagePrefix}our-story.html" class="step-badge" style="cursor: pointer; text-decoration: none;">Our Story</a>
              <a href="${pagePrefix}the-problem.html" class="step-badge" style="cursor: pointer; text-decoration: none;">The Problem</a>
              <a href="${pagePrefix}pillars.html" class="step-badge" style="cursor: pointer; text-decoration: none;">Four Pillars</a>
              <a href="${pagePrefix}philosophy.html" class="step-badge" style="cursor: pointer; text-decoration: none;">Philosophy</a>
              <a href="${pagePrefix}sustainability.html" class="step-badge" style="cursor: pointer; text-decoration: none;">Sustainability</a>
              <a href="${pagePrefix}collections.html" class="step-badge" style="cursor: pointer; text-decoration: none;">Collections</a>
              <a href="${pagePrefix}journal.html" class="step-badge" style="cursor: pointer; text-decoration: none;">Journal</a>
            </div>
          </div>
          <div id="search-results-list" style="display: flex; flex-direction: column; gap: 0.75rem;"></div>
        </div>
      `;
      openModal('Explore DIVISAR STORE', searchHtml);

      setTimeout(() => {
        const input = document.getElementById('live-search-input');
        const results = document.getElementById('search-results-list');
        if (input && results) {
          input.addEventListener('input', () => {
            const query = input.value.toLowerCase().trim();
            if (!query) {
              results.innerHTML = '';
              return;
            }
            const topics = [
              { title: 'Our Story', desc: 'Where Faith Meets Responsibility — The founding purpose of DIVISAR STORE.', link: pagePrefix + 'our-story.html' },
              { title: 'The Problem', desc: 'The Hidden Cost of Devotion — Single-use waste, plastic pollution, and excess packaging.', link: pagePrefix + 'the-problem.html' },
              { title: 'Four Pillars', desc: '01 Sustainable, 02 Inclusive, 03 Responsible, 04 Purposeful devotion.', link: pagePrefix + 'pillars.html' },
              { title: 'Brand Philosophy', desc: 'No caste. No community barriers. No discrimination. Just faith & respect for nature.', link: pagePrefix + 'philosophy.html' },
              { title: 'Sustainability Approach', desc: 'Devotion That Cares for Nature — Natural brass, clay, and plant fibers.', link: pagePrefix + 'sustainability.html' },
              { title: 'Collections (Coming Soon)', desc: 'Pre-launch concept previews for upcoming sacred essentials.', link: pagePrefix + 'collections.html' },
              { title: 'The Journal', desc: 'Editorial reflections on spiritual mindfulness, inclusivity, and sustainability.', link: pagePrefix + 'journal.html' }
            ];
            const matches = topics.filter(t => t.title.toLowerCase().includes(query) || t.desc.toLowerCase().includes(query));
            if (matches.length > 0) {
              results.innerHTML = matches.map(m => `
                <a href="${m.link}" style="display: block; padding: 0.85rem 1rem; background: var(--color-bg-alt); border-radius: var(--radius-sm); border: 1px solid var(--color-gold-border); text-decoration: none;">
                  <div style="font-weight: 700; color: var(--color-primary-dark); font-size: 0.95rem;">${m.title}</div>
                  <div style="font-size: 0.82rem; color: var(--color-text-muted);">${m.desc}</div>
                </a>
              `).join('');
            } else {
              results.innerHTML = `<div style="font-size: 0.88rem; color: var(--color-text-muted); padding: 0.5rem 0;">No direct match found for "${query}". Try navigating via the links above.</div>`;
            }
          });
        }
      }, 100);
    });
  });

  // 6. VIP Email Signup Handler
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const feedback = form.parentElement.querySelector('.newsletter-feedback');
      const email = input?.value.trim();

      if (email && email.includes('@') && email.includes('.')) {
        const existing = JSON.parse(localStorage.getItem('divisar_community') || '[]');
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem('divisar_community', JSON.stringify(existing));
        }

        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `✦ Thank you for joining the journey. You are on the priority early-access list.`;
        }
        form.reset();
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });
});
