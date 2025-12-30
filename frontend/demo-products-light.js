/**
 * Lightweight Demo Products for CJ Dropshipping Integration
 * Optimized for performance
 */

const REALISTIC_PRODUCTS = [
    {
        id: 'AIR_JORDAN_1_RETRO',
        name: 'Air Jordan 1 Retro High OG',
        price: '$169.99',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Iconic Air Jordan 1 Retro High OG with premium leather.',
        stock: 12,
        supplier: 'CJ Dropshipping'
    },
    {
        id: 'NIKE_AIR_MAX_90',
        name: 'Nike Air Max 90',
        price: '$129.99',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Classic Nike Air Max 90 with visible Air cushioning.',
        stock: 25,
        supplier: 'CJ Dropshipping'
    },
    {
        id: 'ADIDAS_ULTRABOOST_22',
        name: 'Adidas Ultraboost 22',
        price: '$189.99',
        image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Premium running shoe with Boost cushioning technology.',
        stock: 18,
        supplier: 'CJ Dropshipping'
    },
    {
        id: 'YEEZY_BOOST_350',
        name: 'Yeezy Boost 350 V2',
        price: '$220.00',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: "Kanye West's iconic Yeezy Boost 350 with Primeknit upper.",
        stock: 8,
        supplier: 'CJ Dropshipping'
    },
    {
        id: 'SUPREME_BOX_LOGO_HOODIE',
        name: 'Supreme Box Logo Hoodie',
        price: '$198.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Classic Supreme box logo hoodie with premium cotton.',
        stock: 15,
        supplier: 'CJ Dropshipping'
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = REALISTIC_PRODUCTS;
} else if (typeof window !== 'undefined') {
    window.REALISTIC_PRODUCTS = REALISTIC_PRODUCTS;
}

console.log(`📦 Loaded ${REALISTIC_PRODUCTS.length} optimized demo products`);
