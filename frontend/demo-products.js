/**
 * Realistic Demo Products for CJ Dropshipping Integration
 * These products are used as fallback when CJ API is unavailable
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
        variants: [
            { sku: 'AJ1-CHICAGO', name: 'Chicago', price: '$169.99', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
            { sku: 'AJ1-BRED', name: 'Bred', price: '$169.99', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' },
            { sku: 'AJ1-ROYAL', name: 'Royal', price: '$169.99', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'NIKE_AIR_MAX_90',
        name: 'Nike Air Max 90',
        price: '$129.99',
        originalPrice: '$149.99',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Classic Nike Air Max 90 with visible Air cushioning and timeless design.',
        stock: 25,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'AM90-WHT', name: 'White', price: '$129.99', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop' },
            { sku: 'AM90-BLK', name: 'Black', price: '$129.99', image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'ADIDAS_ULTRABOOST_22',
        name: 'Adidas Ultraboost 22',
        price: '$189.99',
        originalPrice: '$219.99',
        image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Premium running shoe with Boost cushioning technology and adaptive fit.',
        stock: 18,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'UB22-CORE', name: 'Core Black', price: '$189.99', image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop' },
            { sku: 'UB22-SOLAR', name: 'Solar Red', price: '$189.99', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'YEEZY_BOOST_350',
        name: 'Yeezy Boost 350 V2',
        price: '$220.00',
        originalPrice: '$250.00',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Kanye West\'s iconic Yeezy Boost 350 with Primeknit upper.',
        stock: 8,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'Y350-CREAM', name: 'Cream White', price: '$220.00', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
            { sku: 'Y350-ZEBRA', name: 'Zebra', price: '$220.00', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'SUPREME_BOX_LOGO_HOODIE',
        name: 'Supreme Box Logo Hoodie',
        price: '$198.00',
        originalPrice: '$228.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Classic Supreme box logo hoodie with premium cotton construction.',
        stock: 15,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'SUP-HOOD-BLK', name: 'Black', price: '$198.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'SUP-HOOD-WHT', name: 'White', price: '$198.00', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop' },
            { sku: 'SUP-HOOD-RED', name: 'Red', price: '$198.00', image: 'https://images.unsplash.com/photo-1516849847145-053482d5f5d5?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'OFF_WHITE_JORDAN_1',
        name: 'Off-White x Air Jordan 1',
        price: '$275.00',
        originalPrice: '$300.00',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Virgil Abloh\'s collaboration with Jordan Brand featuring deconstructed design.',
        stock: 5,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'OW-AJ1-CHICAGO', name: 'Chicago', price: '$275.00', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'BAPE_SHARK_HOODIE',
        name: 'BAPE Shark Full Zip Hoodie',
        price: '$325.00',
        originalPrice: '$375.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Iconic BAPE shark hoodie with full zip and camo design.',
        stock: 10,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'BAPE-SHARK-GREEN', name: 'Green Camo', price: '$325.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'BAPE-SHARK-BLUE', name: 'Blue Camo', price: '$325.00', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'TRAVIS_SCOTT_JORDAN_1',
        name: 'Travis Scott x Air Jordan 1',
        price: '$1,200.00',
        originalPrice: '$1,500.00',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Highly sought-after Travis Scott collaboration with Jordan Brand.',
        stock: 2,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'TS-AJ1-BROWN', name: 'Mocha', price: '$1,200.00', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'PALM_ANGELS_TEE',
        name: 'Palm Angels Graphic Tee',
        price: '$145.00',
        originalPrice: '$175.00',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        category: 'T-Shirts',
        description: 'Premium cotton tee with signature Palm Angels graphic.',
        stock: 20,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'PA-TEE-BLK', name: 'Black', price: '$145.00', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
            { sku: 'PA-TEE-WHT', name: 'White', price: '$145.00', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2f6?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'FEAR_OF_GOD_ESSENTIALS_HOODIE',
        name: 'Fear of God Essentials Hoodie',
        price: '$120.00',
        originalPrice: '$150.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Minimalist essentials hoodie from Jerry Lorenzo\'s Fear of God line.',
        stock: 18,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'FOG-HOOD-BLK', name: 'Black', price: '$120.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'FOG-HOOD-GRY', name: 'Grey', price: '$120.00', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'NIKE_DUNK_LOW_PANDA',
        name: 'Nike Dunk Low Panda',
        price: '$110.00',
        originalPrice: '$130.00',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Classic Nike Dunk Low in the popular Panda colorway.',
        stock: 30,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'ND-PANDA', name: 'Panda', price: '$110.00', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'STONE_ISLAND_CREWNECK',
        name: 'Stone Island Crewneck',
        price: '$185.00',
        originalPrice: '$220.00',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop',
        category: 'Sweaters',
        description: 'Premium Stone Island crewneck with compass patch.',
        stock: 12,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'SI-CREW-BLK', name: 'Black', price: '$185.00', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop' },
            { sku: 'SI-CREW-NAV', name: 'Navy', price: '$185.00', image: 'https://images.unsplash.com/photo-1516849847145-053482d5f5d5?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'NEW_BALANCE_550',
        name: 'New Balance 550',
        price: '$140.00',
        originalPrice: '$160.00',
        image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Retro-inspired New Balance 550 with premium materials.',
        stock: 22,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'NB550-GREEN', name: 'Green', price: '$140.00', image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop' },
            { sku: 'NB550-BEIGE', name: 'Beige', price: '$140.00', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'STUSSY_STOCK_LOGO_TEE',
        name: 'Stussy Stock Logo Tee',
        price: '$65.00',
        originalPrice: '$85.00',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        category: 'T-Shirts',
        description: 'Classic Stussy stock logo t-shirt in premium cotton.',
        stock: 35,
        supplier: 'CJ Dropshipping',
        variants: [
            { sku: 'STUSSY-TEE-BLK', name: 'Black', price: '$65.00', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
            { sku: 'STUSSY-TEE-WHT', name: 'White', price: '$65.00', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2f6?w=400&h=400&fit=crop' }
        ]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = REALISTIC_PRODUCTS;
} else if (typeof window !== 'undefined') {
    window.REALISTIC_PRODUCTS = REALISTIC_PRODUCTS;
}

console.log(`📦 Loaded ${REALISTIC_PRODUCTS.length} realistic demo products`);
