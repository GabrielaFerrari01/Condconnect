document.addEventListener('DOMContentLoaded', function () {
    const adForm = document.getElementById('ad-form');

    if (adForm) {
        adForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Extract data
            const productTitle = document.getElementById('product-title').value;
            const productDescription = document.getElementById('product-description').value;
            const productPrice = document.getElementById('product-price').value;
            const productCategory = document.getElementById('product-category').options[document.getElementById('product-category').selectedIndex].text;
            const productCondition = document.getElementById('product-condition').options[document.getElementById('product-condition').selectedIndex].text;

            // Generate a simple ID
            const productId = 'user_' + Date.now();

            const newProduct = {
                id: productId,
                title: productTitle,
                description: productDescription,
                price: productPrice,
                category: productCategory,
                condition: productCondition,
                date: new Date().toLocaleDateString('pt-BR'),
                status: 'Disponível',
                // For now, using a placeholder image
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop'
            };

            // Save to localStorage
            const userProducts = JSON.parse(localStorage.getItem('condconnect_user_products')) || [];
            userProducts.push(newProduct);
            localStorage.setItem('condconnect_user_products', JSON.stringify(userProducts));

            console.log('Produto criado:', newProduct);

            // Redirect to "Meus Produtos"
            window.location.href = '/Templates/meus-produtos.html';
        });
    }
});
