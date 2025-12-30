/**
 * CJ Dropshipping Backend Server
 * Connects to CJ Dropshipping API and provides endpoints for frontend
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: ['https://cj-hyperlow-store.netlify.app', 'http://localhost:3000', 'https://localhost:3000'],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CJ API Configuration
const CJ_ACCESS_TOKEN = process.env.CJ_ACCESS_TOKEN;
const CJ_API_BASE = process.env.CJ_API_BASE || 'https://developers.cjdropshipping.com/api2.0/v1';
const CJ_ACCOUNT_ID = process.env.CJ_ACCOUNT_ID;

// Cache for API responses (5 minutes)
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Rate limiting (1000 calls per day per endpoint)
const rateLimits = new Map();
const DAILY_LIMIT = 1000;

/**
 * Check rate limit
 */
function checkRateLimit(endpoint) {
    const key = `${endpoint}:${new Date().toDateString()}`;
    const count = rateLimits.get(key) || 0;
    
    if (count >= DAILY_LIMIT) {
        return false;
    }
    
    rateLimits.set(key, count + 1);
    return true;
}

/**
 * Get cached response or set new cache
 */
function getCachedResponse(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    return null;
}

/**
 * Set cache response
 */
function setCachedResponse(key, data) {
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
}

/**
 * Make CJ API request with proper headers
 */
async function makeCJRequest(endpoint, params = {}) {
    try {
        const url = `${CJ_API_BASE}${endpoint}`;
        const headers = {
            'CJ-Access-Token': CJ_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        };

        console.log(`🔍 Making CJ API request: ${endpoint}`);
        console.log(`📋 Parameters:`, params);

        const response = await axios.post(url, params, {
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 seconds timeout
        });

        console.log(`✅ CJ API response received for: ${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`❌ CJ API error for ${endpoint}:`, error.message);
        
        if (error.response) {
            console.error(`📊 Status: ${error.response.status}`);
            console.error(`📄 Data:`, error.response.data);
        }
        
        throw error;
    }
}

/**
 * Format CJ product to standard format
 */
function formatCJProduct(product) {
    return {
        id: product.pid,
        name: product.productNameEn || product.productName,
        price: product.sellPrice ? `$${product.sellPrice}` : null,
        originalPrice: product.originalPrice ? `$${product.originalPrice}` : null,
        image: product.productImage || product.mainImage,
        category: product.categoryName || product.category,
        description: product.description || product.productNameEn || product.productName,
        stock: product.stock || 0,
        supplier: 'CJ Dropshipping',
        variants: product.variants || [],
        weight: product.weight,
        dimensions: product.dimensions,
        sku: product.sku
    };
}

// ==================== API ENDPOINTS ====================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    console.log('🏥 Health check requested');
    res.json({
        success: true,
        message: 'CJ Dropshipping API server is running',
        timestamp: new Date().toISOString(),
        server: {
            node: process.version,
            platform: process.platform,
            environment: process.env.NODE_ENV
        },
        cj: {
            apiBase: CJ_API_BASE,
            hasToken: !!CJ_ACCESS_TOKEN,
            accountId: CJ_ACCOUNT_ID ? CJ_ACCOUNT_ID.substring(0, 8) + '***' : null
        }
    });
});

/**
 * Check API token status
 */
app.get('/api/token/status', (req, res) => {
    console.log('🔑 Token status check requested');
    
    if (!CJ_ACCESS_TOKEN) {
        return res.json({
            success: false,
            error: 'No CJ Access Token configured'
        });
    }

    // Check if token looks valid (basic format check)
    const tokenLength = CJ_ACCESS_TOKEN.length;
    const isValidFormat = tokenLength >= 20; // CJ tokens are typically long
    
    res.json({
        success: true,
        hasToken: !!CJ_ACCESS_TOKEN,
        isValidFormat,
        tokenLength,
        accountId: CJ_ACCOUNT_ID ? CJ_ACCOUNT_ID.substring(0, 8) + '***' : null,
        apiBase: CJ_API_BASE,
        message: isValidFormat ? 'Token appears valid' : 'Token format may be invalid'
    });
});

/**
 * Search products
 * GET /api/search?keyword=shoes&count=20&page=1
 */
app.get('/api/search', async (req, res) => {
    try {
        const { keyword = 'sneakers', count = 20, page = 1 } = req.query;
        
        console.log(`🔍 Product search requested: keyword="${keyword}", count=${count}, page=${page}`);
        
        // Check rate limit
        if (!checkRateLimit('search')) {
            return res.status(429).json({
                success: false,
                error: 'Rate limit exceeded. Please try again later.',
                limit: DAILY_LIMIT
            });
        }

        // Check cache
        const cacheKey = `search:${keyword}:${count}:${page}`;
        const cached = getCachedResponse(cacheKey);
        if (cached) {
            console.log(`📦 Returning cached results for: ${keyword}`);
            return res.json({
                success: true,
                data: cached,
                cached: true
            });
        }

        // Make CJ API request
        const cjResponse = await makeCJRequest('/product/list', {
            productNameEn: keyword,
            pageNum: parseInt(page),
            pageSize: parseInt(count)
        });

        if (cjResponse.code === 200 && cjResponse.data) {
            const products = cjResponse.data.list || [];
            const formattedProducts = products.map(formatCJProduct);
            
            const result = {
                products: formattedProducts,
                pagination: {
                    page: parseInt(page),
                    count: parseInt(count),
                    total: cjResponse.data.total || 0,
                    totalPages: Math.ceil((cjResponse.data.total || 0) / parseInt(count))
                }
            };

            // Cache the response
            setCachedResponse(cacheKey, result);

            res.json({
                success: true,
                data: result,
                cached: false
            });
        } else {
            throw new Error(cjResponse.message || 'Failed to search products');
        }
    } catch (error) {
        console.error('❌ Search products error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to search products'
        });
    }
});

/**
 * Get single product details
 * GET /api/product?id=PRODUCT_ID
 */
app.get('/api/product', async (req, res) => {
    try {
        const { id } = req.query;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Product ID is required'
            });
        }

        console.log(`📦 Product details requested: id=${id}`);
        
        // Check rate limit
        if (!checkRateLimit('product')) {
            return res.status(429).json({
                success: false,
                error: 'Rate limit exceeded. Please try again later.',
                limit: DAILY_LIMIT
            });
        }

        // Check cache
        const cacheKey = `product:${id}`;
        const cached = getCachedResponse(cacheKey);
        if (cached) {
            console.log(`📦 Returning cached product: ${id}`);
            return res.json({
                success: true,
                data: cached,
                cached: true
            });
        }

        // Make CJ API request
        const cjResponse = await makeCJRequest('/product/query', {
            pid: id
        });

        if (cjResponse.code === 200 && cjResponse.data) {
            const product = formatCJProduct(cjResponse.data);
            
            // Cache the response
            setCachedResponse(cacheKey, product);

            res.json({
                success: true,
                data: product,
                cached: false
            });
        } else {
            throw new Error(cjResponse.message || 'Product not found');
        }
    } catch (error) {
        console.error('❌ Get product error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to get product details'
        });
    }
});

/**
 * Create order
 * POST /api/order/create
 */
app.post('/api/order/create', async (req, res) => {
    try {
        const orderData = req.body;
        
        console.log('🛒 Order creation requested:', {
            customer: orderData.customer?.name,
            products: orderData.products?.length,
            total: orderData.total
        });
        
        // Validate required fields
        if (!orderData.products || !orderData.customer) {
            return res.status(400).json({
                success: false,
                error: 'Products and customer information are required'
            });
        }

        // Check rate limit
        if (!checkRateLimit('order')) {
            return res.status(429).json({
                success: false,
                error: 'Rate limit exceeded. Please try again later.',
                limit: DAILY_LIMIT
            });
        }

        // Format order for CJ API
        const cjOrderData = {
            // Customer information
            firstName: orderData.customer.firstName || orderData.customer.name?.split(' ')[0],
            lastName: orderData.customer.lastName || orderData.customer.name?.split(' ')[1] || '',
            email: orderData.customer.email,
            tel: orderData.customer.phone || orderData.customer.tel,
            country: orderData.customer.country || 'US',
            state: orderData.customer.state,
            city: orderData.customer.city,
            address: orderData.customer.address,
            address2: orderData.customer.address2 || '',
            zipCode: orderData.customer.zip || orderData.customer.zipCode,
            
            // Order information
            orderComment: orderData.notes || '',
            shippingMethod: orderData.shippingMethod || 'STANDARD',
            
            // Products
            productList: orderData.products.map(product => ({
                pid: product.id,
                quantity: product.quantity,
                // Add variant info if available
                vid: product.variantId,
                attribute: product.attributes || []
            }))
        };

        // Make CJ API request
        const cjResponse = await axios.post(`${CJ_API_BASE}/shopping/order/createOrder`, cjOrderData, {
            headers: {
                'CJ-Access-Token': CJ_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        if (cjResponse.data.code === 200) {
            const order = cjResponse.data;
            
            console.log(`✅ Order created successfully: ${order.orderId}`);
            
            res.json({
                success: true,
                data: {
                    orderId: order.orderId,
                    cjOrderId: order.cjOrderId,
                    status: order.status,
                    totalAmount: order.totalAmount,
                    currency: order.currency,
                    trackingNumber: order.trackingNumber,
                    estimatedDelivery: order.estimatedDelivery
                },
                message: 'Order sent to CJ Dropshipping for fulfillment'
            });
        } else {
            throw new Error(cjResponse.data.message || 'Failed to create order');
        }
    } catch (error) {
        console.error('❌ Create order error:', error.message);
        
        if (error.response) {
            console.error('📊 CJ Error Response:', error.response.data);
        }
        
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to create order',
            details: error.response?.data
        });
    }
});

/**
 * Check order status
 * GET /api/order/status?id=ORDER_ID
 */
app.get('/api/order/status', async (req, res) => {
    try {
        const { id } = req.query;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Order ID is required'
            });
        }

        console.log(`📋 Order status check requested: id=${id}`);
        
        // Check rate limit
        if (!checkRateLimit('status')) {
            return res.status(429).json({
                success: false,
                error: 'Rate limit exceeded. Please try again later.',
                limit: DAILY_LIMIT
            });
        }

        // Make CJ API request
        const cjResponse = await makeCJRequest('/shopping/order/query', {
            orderId: id
        });

        if (cjResponse.code === 200 && cjResponse.data) {
            const order = cjResponse.data;
            
            res.json({
                success: true,
                data: {
                    orderId: order.orderId,
                    cjOrderId: order.cjOrderId,
                    status: order.status,
                    trackingNumber: order.trackingNumber,
                    estimatedDelivery: order.estimatedDelivery,
                    shippedDate: order.shippedDate,
                    deliveredDate: order.deliveredDate,
                    totalAmount: order.totalAmount,
                    currency: order.currency
                }
            });
        } else {
            throw new Error(cjResponse.message || 'Order not found');
        }
    } catch (error) {
        console.error('❌ Order status error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to check order status'
        });
    }
});

/**
 * Get rate limit status
 */
app.get('/api/rate-limit', (req, res) => {
    const today = new Date().toDateString();
    const limits = {};
    
    ['search', 'product', 'order', 'status'].forEach(endpoint => {
        const key = `${endpoint}:${today}`;
        const count = rateLimits.get(key) || 0;
        limits[endpoint] = {
            used: count,
            remaining: Math.max(0, DAILY_LIMIT - count),
            limit: DAILY_LIMIT
        };
    });
    
    res.json({
        success: true,
        data: limits,
        date: today
    });
});

/**
 * Clear cache (for development)
 */
app.post('/api/cache/clear', (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({
            success: false,
            error: 'Cache clearing only available in development mode'
        });
    }
    
    cache.clear();
    console.log('🗑️ Cache cleared');
    
    res.json({
        success: true,
        message: 'Cache cleared successfully'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('❌ Unhandled error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.originalUrl,
        availableEndpoints: [
            'GET /api/health',
            'GET /api/token/status',
            'GET /api/search',
            'GET /api/product',
            'POST /api/order/create',
            'GET /api/order/status',
            'GET /api/rate-limit',
            'POST /api/cache/clear (dev only)'
        ]
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('🚀 CJ Dropshipping API Server Started');
    console.log(`📍 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 CJ API Base: ${CJ_API_BASE}`);
    console.log(`🔑 Token configured: ${!!CJ_ACCESS_TOKEN}`);
    console.log(`👤 Account ID: ${CJ_ACCOUNT_ID ? CJ_ACCOUNT_ID.substring(0, 8) + '***' : 'Not configured'}`);
    console.log('');
    console.log('📋 Available endpoints:');
    console.log('  GET  /api/health - Health check');
    console.log('  GET  /api/token/status - Check API token');
    console.log('  GET  /api/search - Search products');
    console.log('  GET  /api/product - Get product details');
    console.log('  POST /api/order/create - Create order');
    console.log('  GET  /api/order/status - Check order status');
    console.log('  GET  /api/rate-limit - Check rate limits');
    console.log('  POST /api/cache/clear - Clear cache (dev only)');
    console.log('');
    console.log('🌐 Test with: curl http://localhost:' + PORT + '/api/health');
});
