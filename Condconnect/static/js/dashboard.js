document.addEventListener('DOMContentLoaded', function () {
    const recentProductsGrid = document.getElementById('recent-products-grid');
    const productsCountSpan = document.getElementById('stat-products-count');
    const favoritesCountSpan = document.getElementById('stat-favorites-count');

    function updateDashboard() {
        // 1. Update Statistics
        const allProducts = CondConnect.getProducts();
        const userProducts = JSON.parse(localStorage.getItem('condconnect_user_products')) || [];
        const favorites = JSON.parse(localStorage.getItem('condconnect_favorites')) || [];

        if (productsCountSpan) productsCountSpan.textContent = userProducts.length;
        if (favoritesCountSpan) favoritesCountSpan.textContent = favorites.length;

        // 2. Render Recent Products (First 4)
        if (recentProductsGrid) {
            const recentOnes = allProducts.slice(0, 4);

            recentProductsGrid.innerHTML = recentOnes.map(product => `
                <a href="/Templates/detalhes-produto.html?id=${product.id}" class="product-card">
                    <div class="product-image-container">
                        <img src="${product.image}" class="product-image" alt="${product.title}">
                        <span class="product-tag ${product.condition === 'Novo' ? 'green' : 'blue'}">${product.condition}</span>
                        <div class="like-btn" data-id="${product.id}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                        <h3 class="product-title">${product.title}</h3>
                        <span class="product-price">${product.price}</span>
                        <div class="product-footer">
                            <div class="seller-info">👤 ${product.seller}</div>
                            <div class="location-info">📍 ${product.location.split(' - ')[0]}</div>
                        </div>
                    </div>
                </a>
            `).join('');
        }
    }

    // Initial load
    updateDashboard();
    if (window.CondConnect && window.CondConnect.syncHearts) {
        window.CondConnect.syncHearts();
    }

    // Listen for storage changes to keep it updated if multiple tabs are open (optional but good)
    window.addEventListener('storage', updateDashboard);
});
