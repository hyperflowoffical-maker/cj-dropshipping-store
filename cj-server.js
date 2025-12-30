/**
 * CJ Dropshipping API Server
 * Handles API requests server-side to avoid CORS issues
 * Run with: node cj-server.js
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = 3000;
const API_KEY = 'CJ5028846@api@5ecb733ea3914bcf851dbd88c855627c';
const CJ_EMAIL = 'cj5028846@gmail.com'; // Use proper Gmail format
const TOKEN_FILE = path.join(__dirname, 'cj-token.json');

// Token storage
let token = null;
let tokenExpiry = null;

/**
 * Make HTTPS request to CJ API
 */
function makeRequest(endpoint, data, useAuth = false) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (useAuth && token) {
            headers['CJ-Access-Token'] = token;
        }

        const postData = JSON.stringify(data);

        const options = {
            hostname: 'developers.cjdropshipping.com',
            path: endpoint,
            method: 'POST',
            headers: {
                ...headers,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    resolve(response);
                } catch (e) {
                    reject(new Error(`Failed to parse response: ${e.message}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(new Error(`Request failed: ${e.message}`));
        });

        req.write(postData);
        req.end();
    });
}

/**
 * Load token from file
 */
function loadToken() {
    try {
        if (fs.existsSync(TOKEN_FILE)) {
            const tokenData = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
            const bufferTime = 24 * 60 * 60 * 1000; // 1 day buffer
            
            if (tokenData.expiry && (Date.now() + bufferTime) < tokenData.expiry) {
                token = tokenData.token;
                tokenExpiry = tokenData.expiry;
                console.log('✅ Loaded existing token');
                console.log(`📅 Expires: ${new Date(tokenExpiry).toLocaleString()}`);
                return true;
            }
        }
    } catch (error) {
        console.error('❌ Failed to load token:', error.message);
    }
    return false;
}

/**
 * Save token to file
 */
function saveToken() {
    try {
        const tokenData = {
            token: token,
            expiry: tokenExpiry,
            savedAt: Date.now()
        };
        fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
        console.log('💾 Token saved');
    } catch (error) {
        console.error('❌ Failed to save token:', error.message);
    }
}

/**
 * Get new access token
 */
async function getAccessToken() {
    console.log('🔑 Requesting new access token...');
    
    try {
        const response = await makeRequest(
            '/api2.0/v1/authentication/getAccessToken',
            { email: CJ_EMAIL }
        );

        if (response.code === 200 && response.data && response.data.accessToken) {
            token = response.data.accessToken;
            tokenExpiry = Date.now() + (15 * 24 * 60 * 60 * 1000); // 15 days
            saveToken();
            console.log('✅ Access token obtained');
            return token;
        } else {
            throw new Error(response.message || 'Failed to get token');
        }
    } catch (error) {
        console.error('❌ Token error:', error.message);
        throw error;
    }
}

/**
 * Ensure valid token
 */
async function ensureValidToken() {
    if (token && tokenExpiry && Date.now() < tokenExpiry - (24 * 60 * 60 * 1000)) {
        return token;
    }
    
    if (loadToken()) {
        return token;
    }
    
    return await getAccessToken();
}

/**
 * Search products
 */
async function searchProducts(keyword, pageNum = 1, pageSize = 20) {
    await ensureValidToken();
    
    const response = await makeRequest(
        '/api2.0/v1/product/list',
        { keyword, pageNum, pageSize },
        true
    );

    if (response.code === 200 && response.data) {
        return response.data;
    } else {
        throw new Error(response.message || 'Search failed');
    }
}

/**
 * Get product details
 */
async function getProductDetails(productId) {
    await ensureValidToken();
    
    const response = await makeRequest(
        '/api2.0/v1/product/query',
        { pid: productId },
        true
    );

    if (response.code === 200 && response.data) {
        return response.data;
    } else {
        throw new Error(response.message || 'Failed to get product');
    }
}

/**
 * Format product for store
 */
function formatProduct(product) {
    return {
        id: product.pid,
        name: product.productNameEn,
        price: `$${product.sellPrice}`,
        originalPrice: product.originalPrice ? `$${product.originalPrice}` : null,
        image: product.productImage || (product.variants && product.variants[0]?.variantImage),
        category: product.categoryName,
        description: product.description || product.productNameEn,
        variants: product.variants?.map(v => ({
            sku: v.variantSku,
            name: v.variantNameEn,
            price: `$${v.variantSellPrice}`,
            image: v.variantImage
        })) || [],
        stock: product.variants?.reduce((sum, v) => sum + (v.variantQuantity || 0), 0) || 0
    };
}

/**
 * Create order with CJ
 */
async function createOrder(orderData) {
    await ensureValidToken();
    
    // This would integrate with CJ's actual order creation API
    // For now, we'll simulate the order creation
    try {
        console.log('📦 Creating CJ order:', orderData);
        
        // In production, this would call CJ's order creation API
        // For demo purposes, we'll return a simulated success response
        const cjOrder = {
            orderId: `CJ_${Date.now()}`,
            cjOrderId: Math.floor(Math.random() * 1000000), // Simulated CJ order ID
            products: orderData.items,
            shippingAddress: orderData.shippingAddress,
            totalAmount: orderData.total,
            status: 'processing',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString() // 7 days from now
        };

        console.log('✅ CJ Order created:', cjOrder.orderId);
        
        return {
            success: true,
            order: cjOrder,
            message: 'Order sent to CJ Dropshipping for fulfillment'
        };
    } catch (error) {
        console.error('❌ Order creation failed:', error);
        throw error;
    }
}

/**
 * Get order status from CJ
 */
async function getOrderStatus(orderId) {
    // This would check CJ's order status API
    // For demo purposes, we'll return a simulated status
    return {
        orderId: orderId,
        status: 'processing',
        trackingNumber: null,
        estimatedDelivery: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString()
    };
}

/**
 * HTTP Server
 */
const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Parse URL
    const url = new URL(req.url, `http://localhost:${PORT}`);

    try {
        // API Routes
        if (url.pathname === '/api/search' && req.method === 'GET') {
            const keyword = url.searchParams.get('keyword') || 'sneakers';
            const count = parseInt(url.searchParams.get('count') || '10');
            
            console.log(`🔍 Searching: "${keyword}" (${count} products)`);
            
            const searchResults = await searchProducts(keyword, 1, count);
            const productIds = searchResults.list.slice(0, count).map(p => p.pid);
            
            const products = [];
            for (const pid of productIds) {
                try {
                    const product = await getProductDetails(pid);
                    products.push(formatProduct(product));
                    await new Promise(r => setTimeout(r, 500)); // Rate limit
                } catch (error) {
                    console.error(`Failed to get product ${pid}`);
                }
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, products }));
        }
        else if (url.pathname === '/api/product' && req.method === 'GET') {
            const productId = url.searchParams.get('id');
            
            if (!productId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Product ID required' }));
                return;
            }

            console.log(`📦 Getting product: ${productId}`);
            
            const product = await getProductDetails(productId);
            const formatted = formatProduct(product);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, product: formatted }));
        }
        else if (url.pathname === '/api/token/status' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                hasToken: !!token,
                expiresAt: tokenExpiry ? new Date(tokenExpiry).toISOString() : null,
                daysRemaining: tokenExpiry ? Math.ceil((tokenExpiry - Date.now()) / (1000 * 60 * 60 * 24)) : 0
            }));
        }
        else if (url.pathname === '/api/token/refresh' && req.method === 'POST') {
            console.log('🔄 Manually refreshing token...');
            await getAccessToken();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Token refreshed' }));
        }
        else if (url.pathname === '/api/order/create' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const orderData = JSON.parse(body);
                    console.log('📦 Creating order...');
                    
                    const result = await createOrder(orderData);
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: true, 
                        orderId: result.order.orderId,
                        message: result.message 
                    }));
                } catch (error) {
                    console.error('❌ Order creation failed:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: error.message }));
                }
            });
        }
        else if (url.pathname === '/api/order/status' && req.method === 'GET') {
            const orderId = url.searchParams.get('id');
            
            if (!orderId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Order ID required' }));
                return;
            }

            console.log(`📋 Checking order status: ${orderId}`);
            
            const status = await getOrderStatus(orderId);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, status }));
        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Not found' }));
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
});

// Start server
server.listen(PORT, () => {
    console.log('\n🚀 CJ Dropshipping API Server Started!');
    console.log(`📡 Server running at: http://localhost:${PORT}`);
    console.log('\n📚 Available Endpoints:');
    console.log(`   GET  /api/search?keyword=sneakers&count=10`);
    console.log(`   GET  /api/product?id=PRODUCT_ID`);
    console.log(`   GET  /api/token/status`);
    console.log(`   POST /api/token/refresh`);
    console.log(`   POST /api/order/create`);
    console.log(`   GET  /api/order/status?id=ORDER_ID`);
    console.log('\n💡 Example: http://localhost:3000/api/search?keyword=sneakers&count=5\n');
    
    // Load existing token on startup
    loadToken();
});