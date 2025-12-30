/**
 * Realistic Sneaker & Streetwear Products
 * Ready for CJ API replacement when ready
 */

const REALISTIC_PRODUCTS = [
    // Premium Sneakers
    {
        id: 'AIR_JORDAN_1_RETRO',
        name: 'Air Jordan 1 Retro High OG',
        price: '$169.99',
        originalPrice: '$189.99',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Iconic Air Jordan 1 Retro High OG with premium leather construction and classic colorway.',
        stock: 12,
        variants: [
            { sku: 'AJ1-RED-BLK', name: 'Chicago', price: '$169.99', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
            { sku: 'AJ1-WHT-BLK', name: 'Bred', price: '$169.99', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'NIKE_DUNK_LOW',
        name: 'Nike Dunk Low Panda',
        price: '$109.99',
        originalPrice: '$129.99',
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Nike Dunk Low Panda - the most sought-after colorway with clean white and black design.',
        stock: 8,
        variants: [
            { sku: 'NDL-PANDA', name: 'Panda', price: '$109.99', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' },
            { sku: 'NDL-SENA', name: 'Syracuse', price: '$109.99', image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'YEEZY_350_V2',
        name: 'Adidas Yeezy Boost 350 V2',
        price: '$219.99',
        originalPrice: '$259.99',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Yeezy Boost 350 V2 with Primeknit upper and responsive Boost cushioning.',
        stock: 6,
        variants: [
            { sku: 'Y350-CORE-BLK', name: 'Core Black', price: '$219.99', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
            { sku: 'Y350-ZEBRA', name: 'Zebra', price: '$219.99', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'NEW_BALANCE_550',
        name: 'New Balance 550 White Green',
        price: '$149.99',
        originalPrice: '$179.99',
        image: 'https://images.unsplash.com/photo-1541590564564-0a2b1b5a9a57?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'New Balance 550 retro basketball silhouette with modern comfort and classic styling.',
        stock: 15,
        variants: [
            { sku: 'NB550-WHT-GRN', name: 'White Green', price: '$149.99', image: 'https://images.unsplash.com/photo-1541590564564-0a2b1b5a9a57?w=400&h=400&fit=crop' },
            { sku: 'NB550-BLK-WHT', name: 'Black White', price: '$149.99', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'ADIDAS_FORUM_LOW',
        name: 'Adidas Forum Low',
        price: '$89.99',
        originalPrice: '$109.99',
        image: 'https://images.unsplash.com/photo-1516849847145-053482d5f5d5?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Adidas Forum Low with classic 80s basketball aesthetic and modern comfort.',
        stock: 18,
        variants: [
            { sku: 'AFLOW-WHT', name: 'White', price: '$89.99', image: 'https://images.unsplash.com/photo-1516849847145-053482d5f5d5?w=400&h=400&fit=crop' },
            { sku: 'AFLOW-BLK', name: 'Black', price: '$89.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'CONVERSE_CHUCK_70',
        name: 'Converse Chuck 70 High',
        price: '$79.99',
        originalPrice: '$89.99',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Converse Chuck 70 with premium canvas, cushioned footbed, and vintage-inspired details.',
        stock: 22,
        variants: [
            { sku: 'CC70-BLK', name: 'Black', price: '$79.99', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop' },
            { sku: 'CC70-WHT', name: 'White', price: '$79.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'VANS_OLD_SKOOL',
        name: 'Vans Old Skool',
        price: '$64.99',
        originalPrice: '$74.99',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Vans Old Skool with classic side stripe and durable suede and canvas upper.',
        stock: 25,
        variants: [
            { sku: 'VOS-BLK-WHT', name: 'Black White', price: '$64.99', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
            { sku: 'VOS-CHK-BLK', name: 'Checkboard', price: '$64.99', image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'PUMA_SUEDE_CLASSIC',
        name: 'Puma Suede Classic',
        price: '$69.99',
        originalPrice: '$79.99',
        image: 'https://images.unsplash.com/photo-1523275335684-e0e672d76e5c?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Puma Suede Classic with iconic silhouette and premium suede upper.',
        stock: 20,
        variants: [
            { sku: 'PSC-BLK', name: 'Black', price: '$69.99', image: 'https://images.unsplash.com/photo-1523275335684-e0e672d76e5c?w=400&h=400&fit=crop' },
            { sku: 'PSC-WHT', name: 'White', price: '$69.99', image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'ASICS_GEL_KAYANO',
        name: 'ASICS Gel Kayano 14',
        price: '$159.99',
        originalPrice: '$189.99',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'ASICS Gel Kayano 14 with advanced GEL cushioning and stability features.',
        stock: 10,
        variants: [
            { sku: 'AGK14-WHT', name: 'White', price: '$159.99', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
            { sku: 'AGK14-BLK', name: 'Black', price: '$159.99', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'REEBOK_CLUB_C',
        name: 'Reebok Club C 85',
        price: '$74.99',
        originalPrice: '$89.99',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Reebok Club C 85 vintage tennis shoe with classic 80s styling.',
        stock: 16,
        variants: [
            { sku: 'RCC85-WHT', name: 'White', price: '$74.99', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop' },
            { sku: 'RCC85-GUM', name: 'Gum Sole', price: '$74.99', image: 'https://images.unsplash.com/photo-1608230709728-2c9b0b4a8c9e?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'AIR_FORCE_1_LOW',
        name: 'Nike Air Force 1 Low White',
        price: '$89.99',
        originalPrice: '$109.99',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Nike Air Force 1 Low White - the iconic basketball sneaker that never goes out of style.',
        stock: 30,
        variants: [
            { sku: 'AF1-WHT', name: 'White', price: '$89.99', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
            { sku: 'AF1-BLK', name: 'Black', price: '$89.99', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'AIR_MAX_90',
        name: 'Nike Air Max 90',
        price: '$129.99',
        originalPrice: '$149.99',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        category: 'Sneakers',
        description: 'Nike Air Max 90 with visible Air unit and classic color blocking.',
        stock: 14,
        variants: [
            { sku: 'AM90-INFRARED', name: 'Infrared', price: '$129.99', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' },
            { sku: 'AM90-BLK', name: 'Black', price: '$129.99', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' }
        ]
    },
    // Premium Hoodies
    {
        id: 'SUPREME_BOX_LOGO',
        name: 'Supreme Box Logo Hoodie',
        price: '$198.00',
        originalPrice: '$248.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Supreme Box Logo Hoodie with iconic logo and premium heavyweight cotton.',
        stock: 8,
        variants: [
            { sku: 'SBL-BLK', name: 'Black', price: '$198.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'SBL-WHT', name: 'White', price: '$198.00', image: 'https://images.unsplash.com/photo-1516849847145-053482d5f5d5?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'FEAR_OF_GOD_ESSENTIALS',
        name: 'Fear of God Essentials Hoodie',
        price: '$128.00',
        originalPrice: '$158.00',
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Fear of God Essentials Hoodie with minimalist design and premium fabric.',
        stock: 12,
        variants: [
            { sku: 'FOE-GRY', name: 'Heather Grey', price: '$128.00', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop' },
            { sku: 'FOE-BLK', name: 'Black', price: '$128.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'STUSSY_STOCK_HOODIE',
        name: 'Stussy Stock Hoodie',
        price: '$108.00',
        originalPrice: '$138.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Stussy Stock Hoodie with signature logo and relaxed fit.',
        stock: 15,
        variants: [
            { sku: 'SSH-BLK', name: 'Black', price: '$108.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'SSH-NAV', name: 'Navy', price: '$108.00', image: 'https://images.unsplash.com/photo-1516849847145-053482d5f5d5?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'OFF_WHITE_HOODIE',
        name: 'Off-White Arrow Hoodie',
        price: '$325.00',
        originalPrice: '$395.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Off-White Arrow Hoodie with signature diagonal stripes and premium construction.',
        stock: 6,
        variants: [
            { sku: 'OWA-BLK', name: 'Black', price: '$325.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'OWA-WHT', name: 'White', price: '$325.00', image: 'https://images.unsplash.com/photo-1516849847145-053482d5f5d5?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'PALACE_SKATE_HOODIE',
        name: 'Palace Skateboards Hoodie',
        price: '$118.00',
        originalPrice: '$148.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Palace Skateboards Hoodie with signature Tri-Ferg logo and UK skate culture.',
        stock: 10,
        variants: [
            { sku: 'PSH-BLK', name: 'Black', price: '$118.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'PSH-BRN', name: 'Brown', price: '$118.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'BAPE_APE_HEAD',
        name: 'BAPE Ape Head Hoodie',
        price: '$285.00',
        originalPrice: '$335.00',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'BAPE Ape Head Hoodie with iconic camo pattern and premium Japanese quality.',
        stock: 7,
        variants: [
            { sku: 'BAH-CAMO', name: 'Camo', price: '$285.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'BAH-BLK', name: 'Black', price: '$285.00', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'CHAMPION_REVERSE_WEAVE',
        name: 'Champion Reverse Weave Hoodie',
        price: '$79.99',
        originalPrice: '$99.99',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Champion Reverse Weave Hoodie with legendary durability and classic athletic style.',
        stock: 20,
        variants: [
            { sku: 'CRW-BLK', name: 'Black', price: '$79.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'CRW-GRY', name: 'Grey', price: '$79.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'NIKE_TECH_FLEECE',
        name: 'Nike Tech Fleece Hoodie',
        price: '$129.99',
        originalPrice: '$159.99',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        category: 'Hoodies',
        description: 'Nike Tech Fleece Hoodie with innovative thermal mapping and modern athletic design.',
        stock: 18,
        variants: [
            { sku: 'NTF-BLK', name: 'Black', price: '$129.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
            { sku: 'NTF-GRY', name: 'Grey', price: '$129.99', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' }
        ]
    },
    // Accessories
    {
        id: 'NORTH_FACE_BOREALIS',
        name: 'The North Face Borealis Backpack',
        price: '$69.99',
        originalPrice: '$89.99',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'The North Face Borealis Backpack with laptop sleeve and comfortable suspension system.',
        stock: 25,
        variants: [
            { sku: 'TNB-BLK', name: 'Black', price: '$69.99', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
            { sku: 'TNB-GRN', name: 'Forest Green', price: '$69.99', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'ADIDAS_THREE_STRIPE',
        name: 'Adidas Three Stripe Backpack',
        price: '$54.99',
        originalPrice: '$69.99',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'Adidas Three Stripe Backpack with iconic branding and durable construction.',
        stock: 30,
        variants: [
            { sku: 'ATS-BLK', name: 'Black', price: '$54.99', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
            { sku: 'ATS-NAV', name: 'Navy', price: '$54.99', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'NEW_ERA_59FIFTY',
        name: 'New Era 59FIFTY Fitted Cap',
        price: '$39.99',
        originalPrice: '$49.99',
        image: 'https://images.unsplash.com/photo-1574361492334-9f2b8b2b5b5a?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'New Era 59FIFTY Fitted Cap with structured fit and embroidered team logo.',
        stock: 40,
        variants: [
            { sku: 'NE59-BLK', name: 'Black', price: '$39.99', image: 'https://images.unsplash.com/photo-1574361492334-9f2b8b2b5b5a?w=400&h=400&fit=crop' },
            { sku: 'NE59-NAV', name: 'Navy', price: '$39.99', image: 'https://images.unsplash.com/photo-1574361492334-9f2b8b2b5b5a?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'OAKLEY_FROGSKINS',
        name: 'Oakley Frogskins Sunglasses',
        price: '$89.99',
        originalPrice: '$119.99',
        image: 'https://images.unsplash.com/photo-1473496915835-1e98f42f3a2b?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'Oakley Frogskins Sunglasses with classic 80s styling and premium optics.',
        stock: 22,
        variants: [
            { sku: 'OF-BLK', name: 'Black', price: '$89.99', image: 'https://images.unsplash.com/photo-1473496915835-1e98f42f3a2b?w=400&h=400&fit=crop' },
            { sku: 'OF-TORCH', name: 'Torch Red', price: '$89.99', image: 'https://images.unsplash.com/photo-1473496915835-1e98f42f3a2b?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'APPLE_AIR_TAG',
        name: 'Apple AirTag 4-Pack',
        price: '$99.99',
        originalPrice: '$119.99',
        image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'Apple AirTag 4-Pack with precision finding and replaceable battery.',
        stock: 35,
        variants: [
            { sku: 'AAT-4PK', name: '4 Pack', price: '$99.99', image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'SAMSUNG_GALAXY_WATCH',
        name: 'Samsung Galaxy Watch 5',
        price: '$279.99',
        originalPrice: '$329.99',
        image: 'https://images.unsplash.com/photo-1523275335684-e0e672d76e5c?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'Samsung Galaxy Watch 5 with advanced health tracking and long battery life.',
        stock: 18,
        variants: [
            { sku: 'SGW5-BLK', name: 'Black', price: '$279.99', image: 'https://images.unsplash.com/photo-1523275335684-e0e672d76e5c?w=400&h=400&fit=crop' },
            { sku: 'SGW5-BLU', name: 'Blue', price: '$279.99', image: 'https://images.unsplash.com/photo-1523275335684-e0e672d76e5c?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'RAZER_HAMMERHEAD',
        name: 'Razer Hammerhead True Wireless',
        price: '$79.99',
        originalPrice: '$99.99',
        image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'Razer Hammerhead True Wireless earbuds with gaming-grade audio and low latency.',
        stock: 28,
        variants: [
            { sku: 'RHT-BLK', name: 'Black', price: '$79.99', image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'LEATHER_WALLET',
        name: 'Premium Leather Bifold Wallet',
        price: '$49.99',
        originalPrice: '$69.99',
        image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'Premium leather bifold wallet with RFID protection and multiple card slots.',
        stock: 45,
        variants: [
            { sku: 'PLW-BRN', name: 'Brown', price: '$49.99', image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop' },
            { sku: 'PLW-BLK', name: 'Black', price: '$49.99', image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop' }
        ]
    },
    {
        id: 'PHONE_CASE',
        name: 'MagSafe Compatible Phone Case',
        price: '$34.99',
        originalPrice: '$44.99',
        image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop',
        category: 'Accessories',
        description: 'MagSafe compatible phone case with military-grade protection and wireless charging.',
        stock: 50,
        variants: [
            { sku: 'MPC-BLK', name: 'Black', price: '$34.99', image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop' },
            { sku: 'MPC-CLR', name: 'Clear', price: '$34.99', image: 'https://images.unsplash.com/photo-1594752724065-952d02d8a28?w=400&h=400&fit=crop' }
        ]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = REALISTIC_PRODUCTS;
}
