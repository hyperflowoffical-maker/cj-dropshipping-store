/**
 * Awesome Demo Products for CJ Dropshipping Integration
 * High-quality, realistic products with great variety
 */

const REALISTIC_PRODUCTS = [
    {
        id: 'AIR_JORDAN_1_RETRO',
        name: 'Air Jordan 1 Retro High OG',
        price: '$169.99',
        originalPrice: '$189.99',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Iconic Air Jordan 1 Retro High OG with premium leather construction and classic Chicago colorway.',
        stock: 12,
        supplier: 'CJ Dropshipping',
        rating: 4.8,
        reviews: 234
    },
    {
        id: 'NIKE_DUNK_LOW_PANDA',
        name: 'Nike Dunk Low Panda',
        price: '$110.00',
        originalPrice: '$130.00',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Classic Nike Dunk Low in the popular Panda colorway. Clean, versatile, and always in style.',
        stock: 30,
        supplier: 'CJ Dropshipping',
        rating: 4.9,
        reviews: 567
    },
    {
        id: 'ADIDAS_ULTRABOOST_22',
        name: 'Adidas Ultraboost 22',
        price: '$189.99',
        originalPrice: '$219.99',
        image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Premium running shoe with Boost cushioning technology and adaptive fit for ultimate comfort.',
        stock: 18,
        supplier: 'CJ Dropshipping',
        rating: 4.7,
        reviews: 189
    },
    {
        id: 'YEEZY_BOOST_350_V2',
        name: 'Yeezy Boost 350 V2',
        price: '$220.00',
        originalPrice: '$250.00',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: "Kanye West's iconic Yeezy Boost 350 with Primeknit upper and responsive Boost cushioning.",
        stock: 8,
        supplier: 'CJ Dropshipping',
        rating: 4.6,
        reviews: 445
    },
    {
        id: 'NEW_BALANCE_550',
        name: 'New Balance 550',
        price: '$140.00',
        originalPrice: '$160.00',
        image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Retro-inspired New Balance 550 with premium materials and classic basketball silhouette.',
        stock: 22,
        supplier: 'CJ Dropshipping',
        rating: 4.5,
        reviews: 123
    },
    {
        id: 'SUPREME_BOX_LOGO_HOODIE',
        name: 'Supreme Box Logo Hoodie',
        price: '$198.00',
        originalPrice: '$228.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Classic Supreme box logo hoodie with premium cotton construction and iconic branding.',
        stock: 15,
        supplier: 'CJ Dropshipping',
        rating: 4.8,
        reviews: 678
    },
    {
        id: 'FEAR_OF_GOD_ESSENTIALS_HOODIE',
        name: 'Fear of God Essentials Hoodie',
        price: '$120.00',
        originalPrice: '$150.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Minimalist essentials hoodie from Jerry Lorenzo\'s Fear of God line. Premium quality, timeless design.',
        stock: 18,
        supplier: 'CJ Dropshipping',
        rating: 4.4,
        reviews: 234
    },
    {
        id: 'BAPE_SHARK_FULL_ZIP_HOODIE',
        name: 'BAPE Shark Full Zip Hoodie',
        price: '$325.00',
        originalPrice: '$375.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Iconic BAPE shark hoodie with full zip and camo design. Streetwear staple with premium quality.',
        stock: 10,
        supplier: 'CJ Dropshipping',
        rating: 4.9,
        reviews: 891
    },
    {
        id: 'OFF_WHITE_ARROWS_HOODIE',
        name: 'Off-White Arrows Hoodie',
        price: '$275.00',
        originalPrice: '$325.00',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Virgil Abloh\'s Off-White hoodie with signature arrows branding. High-end streetwear luxury.',
        stock: 12,
        supplier: 'CJ Dropshipping',
        rating: 4.7,
        reviews: 456
    },
    {
        id: 'STUSSY_STOCK_LOGO_TEE',
        name: 'Stussy Stock Logo Tee',
        price: '$65.00',
        originalPrice: '$85.00',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        category: 'T-Shirts',
        description: 'Classic Stussy stock logo t-shirt in premium cotton. Authentic streetwear since 1980.',
        stock: 35,
        supplier: 'CJ Dropshipping',
        rating: 4.6,
        reviews: 789
    },
    {
        id: 'PALM_ANGELS_LA_TEE',
        name: 'Palm Angels LA Tee',
        price: '$145.00',
        originalPrice: '$175.00',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2f6?w=400&h=400&fit=crop',
        category: 'T-Shirts',
        description: 'Premium cotton tee with signature Palm Angels graphic. LA street culture aesthetic.',
        stock: 20,
        supplier: 'CJ Dropshipping',
        rating: 4.5,
        reviews: 234
    },
    {
        id: 'STONE_ISLAND_COMPASS_CREWNECK',
        name: 'Stone Island Compass Crewneck',
        price: '$185.00',
        originalPrice: '$220.00',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop',
        category: 'Sweaters',
        description: 'Premium Stone Island crewneck with iconic compass patch. Italian technical wear at its finest.',
        stock: 12,
        supplier: 'CJ Dropshipping',
        rating: 4.8,
        reviews: 345
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = REALISTIC_PRODUCTS;
} else if (typeof window !== 'undefined') {
    window.REALISTIC_PRODUCTS = REALISTIC_PRODUCTS;
}

console.log(`📦 Loaded ${REALISTIC_PRODUCTS.length} awesome demo products`);
