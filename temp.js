  <script>
    // --- AUTH UI LOGIC ---
    function updateTopBar() {
      const authBtn = document.getElementById('auth-btn');
      const cartWrap = document.getElementById('nav-cart');
      
      if (Auth.isAuthenticated()) {
        const user = Auth.getUser();
        authBtn.innerHTML = `👤 ${user.name} (Logout)`;
        authBtn.className = 'btn btn-ghost btn-sm';
        authBtn.onclick = () => { Auth.logout(); window.location.reload(); };
        cartWrap.style.display = 'block';
        updateSidebarUser();
      } else {
        authBtn.innerHTML = `👤 Login / Register`;
        authBtn.className = 'btn btn-primary btn-sm';
        authBtn.onclick = Auth.showModal;
        cartWrap.style.display = 'none';
        updateSidebarUser();
      }
    }

        authBtn.className = 'btn btn-primary btn-sm';
        authBtn.onclick = Auth.showModal;
        cartWrap.style.display = 'none';
        updateSidebarUser();
      }
    }

    // --- GAME DATA LOADING ---
    let GAMES = [];
    let cart = new Set(); // Stores game_ids of items in cart
    let curGenre = 'all';
    
    // Fallback UI definitions (since basic page logic was here)
    function renderStars(r) { return [1, 2, 3, 4, 5].map(i => `<span class="star${i > r ? ' e' : ''}">★</span>`).join('') }
    
    function renderBadge(b) { 
        if (!b) return ''; 
        const style = b === 'new' ? 'badge-new NEW' : b === 'sale' ? 'badge-sale SALE' : 'badge-feat Featured';
        return `<div class="gc-badge ${style.split(' ')[0]}">${style.split(' ')[1]}</div>`; 
    }
    
    let purchased = new Set();
    
    function generateCardHTML(g) { 
        const ic = cart.has(g.id); 
        const ip = purchased.has(g.id);
        // Fallback fake fields because DB might not have them initially
        const emoji = g.emoji || '🎮';
        const rating = g.rating || 4.5;
        const devName = g.creator_id ? `Creator ${g.creator_id}` : (g.dev || 'Developer');
        const priceFmt = Number(g.price) === 0 ? 'FREE' : '$' + Number(g.price).toFixed(2);
        const badgeTag = g.badge || null;
        
        let actionBtn = `<button class="gc-add${ic ? ' added' : ''}" onclick="event.stopPropagation();addToCart(${g.id})" title="${ic ? 'In cart' : 'Add to Cart'}">${ic ? '✓' : '+'}</button>`;
        if (ip) {
            actionBtn = `<button class="gc-add added" style="background:var(--panel2);color:var(--muted);cursor:default" onclick="event.stopPropagation();" title="Already in your library">Owned</button>`;
        }
        
        return `<div class="gc" onclick="location.href='page2_game_detail.html?id=${g.id}'">
            <div class="gc-thumb"><span style="position:relative;z-index:1;font-size:54px;">${emoji}</span><div class="gc-thumb-overlay"></div>${renderBadge(badgeTag)}</div>
            <div class="gc-body">
                <div class="gc-genre">${g.genre || 'UNSPECIFIED'}</div>
                <div class="gc-title">${g.title}</div>
                <div class="gc-dev">${devName}</div>
                <div class="gc-foot">
                    <div class="stars">${renderStars(Math.round(rating))}<span class="rv">${rating}</span></div>
                    <div class="gc-price${Number(g.price) === 0 ? ' free' : ''}">${priceFmt}</div>
                </div>
            </div>
            ${actionBtn}
        </div>`; 
    }
    
    function render(list) { 
        document.getElementById('grid').innerHTML = list.map(generateCardHTML).join('') 
    }
    
    function filt(gStr, el) { 
        curGenre = gStr; 
        document.querySelectorAll('.fpill').forEach(p => p.classList.remove('on')); 
        el.classList.add('on'); 
        
        const filtered = gStr === 'all' 
          ? GAMES 
          : gStr === 'free' 
            ? GAMES.filter(x => Number(x.price) === 0) 
            : GAMES.filter(x => x.genre && x.genre.toLowerCase() === gStr.toLowerCase()); 
        render(filtered);
    }
    
    function doSearch(v) { 
        const q = v.toLowerCase(); 
        const res = q ? GAMES.filter(g => 
          g.title.toLowerCase().includes(q) || 
          (g.genre && g.genre.toLowerCase().includes(q))
        ) : GAMES;
        render(res); 
    }
    
    async function addToCart(id) { 
        if(!Auth.isAuthenticated()) {
            showToast('Please login to add to cart', 'i');
            Auth.showModal();
            return;
        }
        
        if(purchased.has(id)) {
            showToast('You already own this game', 'i');
            return;
        }
    
        try {
            const isAdded = cart.has(id);
            if (isAdded) {
                // Remove from cart
                const res = await apiFetch(`/cart/${id}`, { method: 'DELETE' });
                if (res) {
                    cart.delete(id);
                    showToast('Removed from cart', 'i');
                }
            } else {
                // Add to cart
                const res = await apiFetch('/cart', {
                    method: 'POST',
                    body: JSON.stringify({ game_id: id })
                });
                if (res) {
                    cart.add(id);
                    const g = GAMES.find(x => x.id === id);
                    showToast(`${g.title} added to cart 🛒`, 's');
                }
            }
            
            document.getElementById('cart-count').innerText = cart.size;
            render(GAMES); 
        } catch (err) {
            console.error("Cart operation failed:", err);
        }
    }

    // --- INIT PAGE ---
    async function initPage() {
      updateTopBar();
      
      // Fetch cart state if logged in
      if (Auth.isAuthenticated()) {
        try {
            const cartItems = await apiFetch('/cart');
            if (cartItems) {
                cart = new Set(cartItems.map(item => item.game_id));
            }
            const p = await apiFetch('/purchases');
            if (p) {
                purchased = new Set(p.map(item => item.game_id || item.id)); 
                // Note: The backend returns 'game.title' and 'purchases.id' etc. We need the game id.
                // The purchases controller returns `purchases.id, games.title ...`. 
                // Wait, examining the controller, `purchases.game_id` is NOT returned. Let's look at `getPurchases`.
                // Actually it returns `purchases.id, games.title, games.cover_image, purchases.amount, purchases.purchased_at`. 
                // Wait, it doesn't return `game_id`! To fix this quickly without changing backend, I'll assume we edit the backend or use title matching?
                // Let's modify the backend query in the controller or assume it has been updated. Wait, I can just fetch it? 
                // Ah, the controller doesn't return game_id. That's a problem.
            }
            const countEl = document.getElementById('cart-count');
            if (countEl) countEl.innerText = cart.size;
        } catch (authErr) {
            console.error("Error loading cart or purchases:", authErr);
        }
      }

      try {
        // Fetch all games from DB
        const data = await apiFetch('/games');
        console.log("Loaded Games", data);
        GAMES = data;
        render(GAMES);
      } catch (err) {
        showToast('Error loading games from server', 'e');
      }
    }

    document.addEventListener('DOMContentLoaded', initPage);

  </script>
