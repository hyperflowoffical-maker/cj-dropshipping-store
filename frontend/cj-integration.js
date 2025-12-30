/**
 * CJ Dropshipping Frontend Integration
 * Handles communication with CJ Dropshipping backend API
 * Supports demo mode and live API mode with automatic fallback
 */

class CJDropshipping {
    constructor(options = {}) {
        this.apiBase = options.apiBase || 'http://localhost:3000/api';
        this.demoMode = options.demoMode !== undefined ? options.demoMode : true;
        this.autoFallback = options.autoFallback !== undefined ? options.autoFallback : true;
        this.cache = new Map();
        this.cacheDuration = 5 * 60 * 1000; // 5 minutes
        this.rateLimits = {};
        
        console.log('🚀 CJ Dropshipping Integration initialized');
        console.log(`📍 API Base: ${this.apiBase}`);
        console.log(`🎭 Demo Mode: ${this.demoMode ? 'Enabled' : 'Disabled'}`);
        console.log(`🔄 Auto-fallback: ${this.autoFallback ? 'Enabled' : 'Disabled'}`);
    }

    /**
     * Get cached response or set new cache
     */
    getCachedResponse(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return cached.data;
        }
        return null;
    }

    /**
     * Set cache response
     */
    setCachedResponse(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Make API request with error handling
     */
    async makeRequest(endpoint, options = {}) {
        try {
            const url = `${this.apiBase}${endpoint}`;
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                ...options
            };

            console.log(`🔍 Making API request: ${endpoint}`);
            
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }

            const data = await response.json();
            console.log(`✅ API response received for: ${endpoint}`);
            
            return data;
        } catch (error) {
            console.error(`❌ API request failed for ${endpoint}:`, error.message);
            throw error;
        }
    }

    /**
     * Search for products with fallback to demo mode
     */
    async searchProducts(keyword = 'sneakers', count = 20, page = 1) {
        // If explicitly in demo mode and no auto-fallback, skip API call
        if (this.demoMode && !this.autoFallback) {
            console.log('🎭 Demo mode enabled - using sample products');
            return this.getDemoProducts(count);
        }

        // Check cache first
        const cacheKey = `search:${keyword}:${count}:${page}`;
        const cached = this.getCachedResponse(cacheKey);
        if (cached) {
            console.log(`📦 Returning cached search results for: ${keyword}`);
            return cached.products || [];
        }

        // Try real API first
        try {
            const response = await this.makeRequest(`/search?keyword=${encodeURIComponent(keyword)}&count=${count}&page=${page}`);
            
            if (response.success && response.data) {
                const products = response.data.products || [];
                
                // Cache the response
                this.setCachedResponse(cacheKey, products);
                
                console.log(`✅ Loaded ${products.length} products from API`);
                return products;
            } else {
                throw new Error(response.error || 'No products found');
            }
        } catch (error) {
            console.warn('⚠️ API search failed:', error.message);
            
            if (this.autoFallback) {
                console.log('🎭 Falling back to demo mode');
                this.demoMode = true;
                return this.getDemoProducts(count);
            } else {
                throw error;
            }
        }
    }

    /**
     * Get single product details
     */
    async getProduct(productId) {
        // If explicitly in demo mode and no auto-fallback, skip API call
        if (this.demoMode && !this.autoFallback) {
            console.log('🎭 Demo mode - returning sample product');
            return this.getDemoProduct(productId);
        }

        // Check cache first
        const cacheKey = `product:${productId}`;
        const cached = this.getCachedResponse(cacheKey);
        if (cached) {
            console.log(`📦 Returning cached product: ${productId}`);
            return cached;
        }

        // Try real API first
        try {
            const response = await this.makeRequest(`/product?id=${productId}`);
            
            if (response.success && response.data) {
                const product = response.data;
                
                // Cache the response
                this.setCachedResponse(cacheKey, product);
                
                console.log(`✅ Loaded product: ${product.name}`);
                return product;
            } else {
                throw new Error(response.error || 'Product not found');
            }
        } catch (error) {
            console.warn('⚠️ API product request failed:', error.message);
            
            if (this.autoFallback) {
                console.log('🎭 Falling back to demo product');
                this.demoMode = true;
                return this.getDemoProduct(productId);
            } else {
                throw error;
            }
        }
    }

    /**
     * Create order with fallback
     */
    async createOrder(orderData) {
        // If explicitly in demo mode and no auto-fallback, create demo order
        if (this.demoMode && !this.autoFallback) {
            return this.createDemoOrder(orderData);
        }

        try {
            console.log('🛒 Creating order via API...');
            
            const response = await this.makeRequest('/order/create', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });

            if (response.success) {
                console.log(`✅ Order created: ${response.data.orderId}`);
                
                // Save order to localStorage
                this.saveOrder({
                    ...orderData,
                    ...response.data,
                    createdAt: new Date().toISOString(),
                    demo: false
                });

                return {
                    success: true,
                    orderId: response.data.orderId,
                    message: response.message || 'Order sent to CJ Dropshipping for fulfillment',
                    data: response.data,
                    demo: false
                };
            } else {
                throw new Error(response.error || 'Order creation failed');
            }
        } catch (error) {
            console.error('❌ Order creation error:', error);
            
            if (this.autoFallback) {
                console.log('🎭 Falling back to demo order');
                return this.createDemoOrder(orderData, error.message);
            } else {
                return {
                    success: false,
                    error: error.message
                };
            }
        }
    }

    /**
     * Create demo order
     */
    createDemoOrder(orderData, apiError = null) {
        const demoOrder = {
            orderId: `DEMO_${Date.now()}`,
            ...orderData,
            createdAt: new Date().toISOString(),
            status: 'demo',
            demo: true,
            apiError
        };

        this.saveOrder(demoOrder);

        return {
            success: true,
            orderId: demoOrder.orderId,
            message: apiError ? `⚠️ API unavailable. Demo order created.` : '🎭 Demo order created.',
            data: demoOrder,
            demo: true
        };
    }

    /**
     * Check order status
     */
    async getOrderStatus(orderId) {
        // If explicitly in demo mode and no auto-fallback, return demo status
        if (this.demoMode && !this.autoFallback) {
            return this.getDemoOrderStatus(orderId);
        }

        try {
            console.log(`📋 Checking order status: ${orderId}`);
            
            const response = await this.makeRequest(`/order/status?id=${orderId}`);
            
            if (response.success) {
                console.log(`✅ Order status retrieved: ${response.data.status}`);
                return response.data;
            } else {
                throw new Error(response.error || 'Order not found');
            }
        } catch (error) {
            console.warn('⚠️ Order status check failed:', error.message);
            
            if (this.autoFallback) {
                console.log('🎭 Returning demo order status');
                return this.getDemoOrderStatus(orderId, error.message);
            } else {
                throw error;
            }
        }
    }

    /**
     * Get demo order status
     */
    getDemoOrderStatus(orderId, apiError = null) {
        return {
            orderId,
            status: 'demo',
            trackingNumber: null,
            estimatedDelivery: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString(),
            demo: true,
            apiError,
            message: 'Demo order status - API unavailable'
        };
    }

    /**
     * Check API status
     */
    async checkApiStatus() {
        try {
            const response = await this.makeRequest('/health');
            
            return {
                success: true,
                online: true,
                ...response,
                demoMode: this.demoMode,
                apiBase: this.apiBase
            };
        } catch (error) {
            return {
                success: false,
                online: false,
                error: error.message,
                demoMode: this.demoMode,
                apiBase: this.apiBase
            };
        }
    }

    /**
     * Get rate limit status
     */
    async getRateLimitStatus() {
        try {
            const response = await this.makeRequest('/rate-limit');
            return response.data || {};
        } catch (error) {
            console.warn('⚠️ Rate limit check failed:', error.message);
            return {};
        }
    }

    /**
     * Save order to localStorage
     */
    saveOrder(order) {
        try {
            const orders = JSON.parse(localStorage.getItem('cj_orders') || '[]');
            orders.push(order);
            localStorage.setItem('cj_orders', JSON.stringify(orders));
            console.log('💾 Order saved to localStorage');
        } catch (error) {
            console.error('Failed to save order:', error);
        }
    }

    /**
     * Get all orders from localStorage
     */
    getOrders() {
        try {
            return JSON.parse(localStorage.getItem('cj_orders') || '[]');
        } catch (error) {
            console.error('Failed to retrieve orders:', error);
            return [];
        }
    }

    /**
     * Get demo products
     */
    getDemoProducts(count = 20) {
        // Import realistic products if available
        if (typeof REALISTIC_PRODUCTS !== 'undefined') {
            return REALISTIC_PRODUCTS.slice(0, Math.min(count, REALISTIC_PRODUCTS.length));
        }
        
        // Fallback demo products
        return this.getFallbackProducts().slice(0, count);
    }

    /**
     * Get demo product by ID
     */
    getDemoProduct(productId) {
        const demoProducts = this.getDemoProducts(20);
        return demoProducts.find(p => p.id === productId) || demoProducts[0];
    }

    /**
     * Fallback demo products
     */
    getFallbackProducts() {
        return [
            {
                id: 'DEMO_AIR_JORDAN_1',
                name: 'Air Jordan 1 Retro High OG',
                price: '$169.99',
                originalPrice: '$189.99',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
                category: 'Sneakers',
                description: 'Iconic Air Jordan 1 Retro High OG with premium leather construction.',
                stock: 12,
                supplier: 'CJ Dropshipping',
                variants: [
                    { sku: 'AJ1-RED-BLK', name: 'Chicago', price: '$169.99' }
                ]
            },
            {
                id: 'DEMO_NIKE_AIR_MAX',
                name: 'Nike Air Max 90',
                price: '$129.99',
                originalPrice: '$149.99',
                image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
                category: 'Sneakers',
                description: 'Classic Nike Air Max 90 with visible Air cushioning.',
                stock: 25,
                supplier: 'CJ Dropshipping',
                variants: [
                    { sku: 'AM90-WHT', name: 'White', price: '$129.99' }
                ]
            }
        ];
    }

    /**
     * Enable live mode (disable demo)
     */
    enableLiveMode() {
        this.demoMode = false;
        console.log('🚀 Live mode enabled - using real CJ API');
    }

    /**
     * Enable demo mode
     */
    enableDemoMode() {
        this.demoMode = true;
        console.log('🎭 Demo mode enabled - using sample data');
    }

    /**
     * Toggle between demo and live mode
     */
    toggleMode() {
        this.demoMode = !this.demoMode;
        console.log(this.demoMode ? '🎭 Switched to demo mode' : '🚀 Switched to live mode');
        return this.demoMode;
    }

    /**
     * Check if currently in demo mode
     */
    isDemoMode() {
        return this.demoMode;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Frontend cache cleared');
    }

    /**
     * Format price for display
     */
    formatPrice(price) {
        if (typeof price === 'string') {
            return price;
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    /**
     * Format product for consistent display
     */
    formatProduct(product) {
        return {
            id: product.id || product.pid,
            name: product.name || product.productNameEn || product.productName,
            price: product.price || (product.sellPrice ? `$${product.sellPrice}` : null),
            originalPrice: product.originalPrice || (product.originalPrice ? `$${product.originalPrice}` : null),
            image: product.image || product.productImage || product.mainImage,
            category: product.category || product.categoryName,
            description: product.description || product.name,
            stock: product.stock || 0,
            supplier: product.supplier || 'CJ Dropshipping',
            variants: product.variants || [],
            weight: product.weight,
            dimensions: product.dimensions,
            sku: product.sku
        };
    }
}

// Initialize with default settings
const cj = new CJDropshipping({
    demoMode: true,        // Start in demo mode
    autoFallback: true      // Automatically fallback to demo if API fails
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CJDropshipping, cj };
} else if (typeof window !== 'undefined') {
    window.CJDropshipping = CJDropshipping;
    window.cj = cj;
}

// Log initialization
console.log('✅ CJ Dropshipping Frontend Integration loaded');
console.log(`📍 Current mode: ${cj.isDemoMode() ? 'Demo' : 'Live'}`);
console.log(`🔄 Auto-fallback: ${cj.autoFallback ? 'Enabled' : 'Disabled'}`);
