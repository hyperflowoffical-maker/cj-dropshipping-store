/**
 * CJ Dropshipping Integration - Demo Mode
 * Shows realistic placeholder products ready for CJ API replacement
 */

class CJDropshipping {
    constructor() {
        this.apiBase = 'http://localhost:3000/api';
        this.products = [];
        this.cart = [];
        this.demoMode = true; // Force demo mode for now
    }

    /**
     * Search for products with fallback to demo mode
     * TODO: Replace with real CJ API call when ready
     */
    async searchProducts(keyword = 'sneakers', count = 20) {
        // Force demo mode for now - CJ API has authentication issues
        this.demoMode = true;
        console.log('🎭 Using demo mode - CJ API authentication needs fixing');
        return this.getDemoProducts(count);
        
        /* TODO: Replace with real CJ API call when ready
        try {
            console.log('🔍 Trying CJ API...');
            const response = await fetch(`${this.apiBase}/search?keyword=${encodeURIComponent(keyword)}&count=${count}`);
            const data = await response.json();
            
            if (data.success && data.products && data.products.length > 0) {
                this.products = data.products;
                this.demoMode = false;
                console.log(`✅ Loaded ${data.products.length} products from CJ API`);
                return data.products;
            } else {
                console.log('⚠️ CJ API returned empty results, using demo mode');
            }
        } catch (error) {
            console.log('❌ CJ API not available, using demo mode:', error.message);
        }
        
        // Fallback to demo products
        this.demoMode = true;
        console.log('🎭 Using demo mode with sample products');
        return this.getDemoProducts(count);
        */
    }

    /**
     * Get product details with fallback
     * TODO: Replace with real CJ API call when ready
     */
    async getProduct(productId) {
        // Force demo mode for now
        this.demoMode = true;
        return this.getDemoProduct(productId);
        
        /* TODO: Replace with real CJ API call when ready
        try {
            const response = await fetch(`${this.apiBase}/product?id=${productId}`);
            const data = await response.json();
            
            if (data.success && data.product) {
                this.demoMode = false;
                return data.product;
            }
        } catch (error) {
            console.log('CJ API not available, using demo mode');
        }
        
        // Fallback to demo product
        this.demoMode = true;
        return this.getDemoProduct(productId);
        */
    }

    /**
     * Get demo products for testing
     * TODO: Replace with CJ API call when ready
     */
    getDemoProducts(count = 20) {
        // Import realistic products
        const products = typeof REALISTIC_PRODUCTS !== 'undefined' ? REALISTIC_PRODUCTS : this.getFallbackProducts();
        
        // Return requested count - NO REPEATING!
        return products.slice(0, count);
    }

    /**
     * Fallback products if REALISTIC_PRODUCTS not available
     */
    getFallbackProducts() {
        return [
            {
                id: 'AIR_JORDAN_1_RETRO',
                name: 'Air Jordan 1 Retro High OG',
                price: '$169.99',
                originalPrice: '$189.99',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
                category: 'Sneakers',
                description: 'Iconic Air Jordan 1 Retro High OG with premium leather construction.',
                stock: 12,
                variants: [
                    { sku: 'AJ1-RED-BLK', name: 'Chicago', price: '$169.99', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' }
                ]
            }
        ];
    }

    /**
     * Get demo product by ID
     */
    getDemoProduct(productId) {
        const demoProducts = this.getDemoProducts(10);
        return demoProducts.find(p => p.id === productId) || demoProducts[0];
    }

    /**
     * Create order with fallback
     */
    async createOrder(orderData) {
        if (this.demoMode) {
            // Demo order creation
            const demoOrder = {
                orderId: `DEMO_${Date.now()}`,
                message: 'Demo order created (CJ API not connected)',
                demo: true
            };
            
            this.saveOrder(demoOrder);
            
            return {
                success: true,
                orderId: demoOrder.orderId,
                message: 'Demo order created. Connect CJ API for real order processing.'
            };
        }
        
        try {
            const response = await fetch(`${this.apiBase}/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.saveOrder({
                    orderId: data.orderId,
                    ...orderData,
                    createdAt: new Date().toISOString(),
                    status: 'processing'
                });
                
                return {
                    success: true,
                    orderId: data.orderId,
                    message: data.message || 'Order sent to CJ Dropshipping for fulfillment'
                };
            } else {
                throw new Error(data.error || 'Order creation failed');
            }
        } catch (error) {
            console.error('Order creation error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Format product for display
     */
    formatProductDisplay(product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            description: product.description,
            variants: product.variants || [],
            stock: product.stock || 0,
            supplier: product.supplier || 'CJ Dropshipping'
        };
    }

    /**
     * Save order to localStorage
     */
    saveOrder(order) {
        const orders = JSON.parse(localStorage.getItem('cj_orders') || '[]');
        orders.push(order);
        localStorage.setItem('cj_orders', JSON.stringify(orders));
    }

    /**
     * Get order status
     */
    async getOrderStatus(orderId) {
        if (this.demoMode) {
            return {
                orderId: orderId,
                status: 'demo',
                trackingNumber: null,
                estimatedDelivery: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString()
            };
        }
        
        try {
            const response = await fetch(`${this.apiBase}/order/status?id=${orderId}`);
            const data = await response.json();
            
            if (data.success) {
                return data.status;
            }
        } catch (error) {
            console.error('Status check error:', error);
        }
        
        return null;
    }

    /**
     * Check API status
     */
    async checkApiStatus() {
        try {
            const response = await fetch(`${this.apiBase}/token/status`);
            const data = await response.json();
            
            return {
                connected: data.success,
                hasToken: data.hasToken,
                daysRemaining: data.daysRemaining,
                demoMode: this.demoMode
            };
        } catch (error) {
            return {
                connected: false,
                demoMode: this.demoMode,
                error: error.message
            };
        }
    }
}

// Initialize CJ Dropshipping
const cj = new CJDropshipping();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CJDropshipping;
} else {
    window.CJDropshipping = CJDropshipping;
    window.cj = cj;
}
