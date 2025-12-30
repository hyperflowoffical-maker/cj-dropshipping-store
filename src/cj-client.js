/**
 * CJ Dropshipping Client (Connects to Local Server)
 * Use this in your HTML files - it talks to your Node.js server
 */

class CJClient {
    constructor(serverUrl = 'http://localhost:3000') {
        this.serverUrl = serverUrl;
    }

    /**
     * Search for products
     */
    async searchProducts(keyword, count = 10) {
        console.log(`🔍 Searching for: "${keyword}"...`);
        
        try {
            const response = await fetch(
                `${this.serverUrl}/api/search?keyword=${encodeURIComponent(keyword)}&count=${count}`
            );
            
            const data = await response.json();
            
            if (data.success) {
                console.log(`✅ Found ${data.products.length} products`);
                return data.products;
            } else {
                throw new Error(data.error || 'Search failed');
            }
        } catch (error) {
            console.error('❌ Search error:', error.message);
            throw error;
        }
    }

    /**
     * Get single product details
     */
    async getProduct(productId) {
        console.log(`📦 Getting product: ${productId}...`);
        
        try {
            const response = await fetch(
                `${this.serverUrl}/api/product?id=${productId}`
            );
            
            const data = await response.json();
            
            if (data.success) {
                console.log(`✅ Product retrieved: ${data.product.name}`);
                return data.product;
            } else {
                throw new Error(data.error || 'Failed to get product');
            }
        } catch (error) {
            console.error('❌ Product error:', error.message);
            throw error;
        }
    }

    /**
     * Get token status
     */
    async getTokenStatus() {
        try {
            const response = await fetch(`${this.serverUrl}/api/token/status`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Token status error:', error.message);
            throw error;
        }
    }

    /**
     * Manually refresh token
     */
    async refreshToken() {
        console.log('🔄 Refreshing token...');
        
        try {
            const response = await fetch(`${this.serverUrl}/api/token/refresh`, {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('✅ Token refreshed');
                return true;
            } else {
                throw new Error(data.error || 'Refresh failed');
            }
        } catch (error) {
            console.error('❌ Refresh error:', error.message);
            throw error;
        }
    }
}

// Make available globally
window.CJClient = CJClient;