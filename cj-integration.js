/**
 * CJ Dropshipping Integration
 * Handles product importing and order fulfillment
 */

class CJDropshipping {
    constructor() {
        this.apiBase = 'http://localhost:3000/api';
        this.products = [];
        this.cart = [];
    }

    /**
     * Search for products
     */
    async searchProducts(keyword = 'sneakers', count = 20) {
        try {
            const response = await fetch(`${this.apiBase}/search?keyword=${encodeURIComponent(keyword)}&count=${count}`);
            const data = await response.json();
            
            if (data.success) {
                this.products = data.products;
                return data.products;
            } else {
                throw new Error(data.error || 'Search failed');
            }
        } catch (error) {
            console.error('Search error:', error);
            return [];
        }
    }

    /**
     * Get product details
     */
    async getProduct(productId) {
        try {
            const response = await fetch(`${this.apiBase}/product?id=${productId}`);
            const data = await response.json();
            
            if (data.success) {
                return data.product;
            } else {
                throw new Error(data.error || 'Product fetch failed');
            }
        } catch (error) {
            console.error('Product error:', error);
            return null;
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
            supplier: 'CJ Dropshipping'
        };
    }

    /**
     * Create order with CJ
     */
    async createOrder(orderData) {
        try {
            console.log('Creating order with CJ:', orderData);
            
            const response = await fetch(`${this.apiBase}/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store order locally for tracking
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
        // This would check CJ's order status API
        const orders = JSON.parse(localStorage.getItem('cj_orders') || '[]');
        const order = orders.find(o => o.orderId === orderId);
        
        return order || null;
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
                daysRemaining: data.daysRemaining
            };
        } catch (error) {
            return {
                connected: false,
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
