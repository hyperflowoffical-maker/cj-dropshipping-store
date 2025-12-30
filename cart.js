// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartUI();
    }

    loadCart() {
        const cart = localStorage.getItem('hyperflow_cart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem('hyperflow_cart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    addItem(product) {
        const existingItem = this.cart.find(item => 
            item.id === product.id && 
            item.size === product.size && 
            item.color === product.color
        );

        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: product.size || 'L',
                color: product.color || 'black',
                quantity: product.quantity || 1
            });
        }

        this.saveCart();
        this.showCartNotification();
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
    }

    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeItem(index);
        } else {
            this.cart[index].quantity = quantity;
            this.saveCart();
        }
    }

    getTotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    updateCartUI() {
        const count = this.getItemCount();
        const cartBadge = document.getElementById('cart-badge');
        const cartCount = document.getElementById('cart-count');
        
        if (cartBadge) {
            if (count > 0) {
                cartBadge.textContent = count;
                cartBadge.classList.remove('hidden');
            } else {
                cartBadge.classList.add('hidden');
            }
        }

        if (cartCount) {
            cartCount.textContent = count;
        }
    }

    showCartNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-cyan-400 text-black px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="font-semibold">Item added to cart!</span>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('animate-slide-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Make cart available globally
window.cart = cart;

