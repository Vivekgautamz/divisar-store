/**
 * DIVISAR STORE — Future-Ready E-Commerce & Catalog Engine
 * Scalable data models, reactive cart/wishlist state, and checkout readiness.
 * "Connecting Sansar to Divine, in a Sustainable Way."
 */

const DivisarStore = (() => {
  // 1. Initial Planned Catalog Architecture (Structured for Physical Production Inventory)
  const CATALOG = [
    {
      id: 'div-001',
      title: 'Artisanal Eco Pooja Kit',
      subtitle: 'Complete ritual kit crafted with pure natural materials',
      price: 1350,
      currency: '₹',
      category: 'Pooja Essentials',
      collection: 'Sacred Rituals',
      image: 'assets/images/collection-puja-thali.jpg',
      rating: 4.9,
      reviewCount: 42,
      inStock: true,
      materials: 'Hand-pressed river clay, virgin brass, pure cow ghee, organic cotton',
      packaging: '100% recycled temple-flower paper and unbleached cotton cord',
      description: 'A thoughtfully assembled spiritual kit designed to honor sacred rituals without contributing to single-use plastic or environmental waste.',
      included: [
        '2 Hand-turned Terracotta Diyas',
        'Pure Cow Ghee Jar (Brass)',
        '30 Organic Cotton Floral Wicks',
        '20 Hand-rolled Sacred Temple Incense Sticks',
        'Natural Sandalwood Tablet'
      ],
      sustainability: 'Zero plastic components. Every element returns cleanly to the soil.'
    },
    {
      id: 'div-002',
      title: 'Heritage Brass Puja Thali',
      subtitle: 'Heirloom heavy brass thali with subtle sacred geometry',
      price: 2450,
      currency: '₹',
      category: 'Pooja Essentials',
      collection: 'Sacred Rituals',
      image: 'assets/images/collection-puja-thali.jpg',
      rating: 5.0,
      reviewCount: 38,
      inStock: true,
      materials: 'Pure virgin bell brass, unlacquered and food-safe',
      packaging: 'Reusable jute storage bag with plantable seed paper tag',
      description: 'Handcrafted by master coppersmiths using traditional casting techniques. Built to last generations, reducing the desire for cheap synthetic alternatives.',
      included: [
        '10.5-inch Solid Brass Thali',
        'Brass Diya Holder',
        'Small Brass Offering Katori'
      ],
      sustainability: 'Lifetime heirloom piece. 100% recyclable metal with zero synthetic coatings.'
    },
    {
      id: 'div-003',
      title: 'Temple Flower Upcycled Dhoop Sticks',
      subtitle: 'Charcoal-free incense made from consecrated floral offerings',
      price: 380,
      currency: '₹',
      category: 'Spiritual Lifestyle',
      collection: 'Aromatics & Air',
      image: 'assets/images/craft-sustainable-incense.jpg',
      rating: 4.8,
      reviewCount: 64,
      inStock: true,
      materials: 'Upcycled marigold and rose petals, natural sambrani, bamboo splints',
      packaging: 'Handmade cotton rag paper box printed with non-toxic vegetable inks',
      description: 'Gently collected temple flowers given sacred second life. Free from petroleum resins, synthetic perfumes, and charcoal smoke.',
      included: ['40 Sticks per box', 'Handmade terracotta stick holder'],
      sustainability: 'Diverts floral waste from holy rivers and employs female artisan collectives.'
    },
    {
      id: 'div-004',
      title: 'Biodegradable Earthen Diya Set',
      subtitle: 'Pure unglazed river clay lamps designed for clean dissolution',
      price: 290,
      currency: '₹',
      category: 'Eco-Friendly Devotion',
      collection: 'Festival & Light',
      image: 'assets/images/coming-soon-materials.jpg',
      rating: 4.9,
      reviewCount: 51,
      inStock: true,
      materials: 'Locally sourced Gangetic alluvial silt and natural terracotta',
      packaging: 'Corrugated craft cardboard cushioned with natural dried hay',
      description: 'Traditional earthen lamps hand-shaped on potter wheels. Free from toxic chemical glazes, chemical hardeners, or plastic packaging.',
      included: ['Pack of 12 Clay Diyas', 'Organic cotton wicks included'],
      sustainability: 'Naturally biodegrades back into clay when immersed in water bodies.'
    }
  ];

  // 2. Reactive State Management (Cart & Wishlist)
  let state = {
    cart: JSON.parse(localStorage.getItem('divisar_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('divisar_wishlist') || '[]'),
    appliedCoupon: null
  };

  const saveState = () => {
    localStorage.setItem('divisar_cart', JSON.stringify(state.cart));
    localStorage.setItem('divisar_wishlist', JSON.stringify(state.wishlist));
    dispatchStoreEvent('state-updated', state);
  };

  const dispatchStoreEvent = (name, detail) => {
    window.dispatchEvent(new CustomEvent(`divisar:${name}`, { detail }));
  };

  // 3. Cart Logic
  const addToCart = (productId, quantity = 1) => {
    const product = CATALOG.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        currency: product.currency,
        quantity
      });
    }
    saveState();
  };

  const removeFromCart = (productId) => {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveState();
  };

  const updateQuantity = (productId, delta) => {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveState();
    }
  };

  const getCartCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 4. Wishlist Logic
  const toggleWishlist = (productId) => {
    const exists = state.wishlist.includes(productId);
    if (exists) {
      state.wishlist = state.wishlist.filter(id => id !== productId);
    } else {
      state.wishlist.push(productId);
    }
    saveState();
    return !exists;
  };

  const isInWishlist = (productId) => {
    return state.wishlist.includes(productId);
  };

  // 5. Render Preview Cards into Drawer
  const renderCatalogPreview = (containerElement) => {
    if (!containerElement) return;

    containerElement.innerHTML = CATALOG.map(prod => `
      <div class="store-preview-card" data-product-id="${prod.id}">
        <img src="${prod.image}" alt="${prod.title}" class="store-preview-img" loading="lazy">
        <div class="store-preview-info">
          <h4 class="store-preview-name">${prod.title}</h4>
          <div class="store-preview-price">${prod.currency}${prod.price.toLocaleString('en-IN')}</div>
          <p class="store-preview-spec">${prod.materials}</p>
          <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm preview-add-btn" style="padding: 0.35rem 0.8rem; font-size: 0.75rem;" onclick="DivisarStore.addToCart('${prod.id}', 1)">
              Add to Test Cart
            </button>
            <button class="btn btn-outline-white btn-sm" style="padding: 0.35rem 0.8rem; font-size: 0.75rem; color: var(--color-primary); border-color: var(--color-gold-border);" onclick="DivisarStore.toggleWishlist('${prod.id}')">
              ${isInWishlist(prod.id) ? '♥ Saved' : '♡ Wishlist'}
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  // 6. Public API
  return {
    getCatalog: () => [...CATALOG],
    getProductById: (id) => CATALOG.find(p => p.id === id),
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartSubtotal,
    toggleWishlist,
    isInWishlist,
    renderCatalogPreview,
    getState: () => ({ ...state })
  };
})();

// Attach to window
window.DivisarStore = DivisarStore;
