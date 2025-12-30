# LUXE STREETWEAR - Dropshipping Store

A complete 3-page luxury streetwear dropshipping store built with HTML and Tailwind CSS. Ready for Netlify deployment and EPROLO integration.

## 🚀 Quick Start

### Deploy to Netlify

1. **Drag and Drop Method:**
   - Go to [Netlify](https://www.netlify.com/)
   - Sign up or log in
   - Drag the entire project folder into the Netlify dashboard
   - Your site will be live instantly!

2. **Git Method:**
   - Push this code to GitHub
   - Connect your GitHub repo to Netlify
   - Netlify will auto-deploy on every push

### Features

- ✅ 3 Complete Pages (Home, Product Details, Checkout)
- ✅ Luxury Streetwear Theme (Dark Mode, Neon Accents)
- ✅ 3 CJ Dropshipping Product Placeholders
- ✅ Tidio Chat Bubble Integration Ready
- ✅ PayPal Payment Integration Placeholder
- ✅ Fully Responsive Design
- ✅ Netlify-Ready Structure

## 📋 Next Steps: EPROLO Integration

### Step 1: Create EPROLO Account
1. Sign up at [EPROLO.com](https://www.eprolo.com/)
2. Complete your account setup
3. Verify your email address

### Step 2: Connect CJ Dropshipping to EPROLO
1. In EPROLO dashboard, go to **"Suppliers"** or **"Integrations"**
2. Click **"Add Supplier"** or **"Connect Supplier"**
3. Select **"CJ Dropshipping"** from the list
4. Enter your CJ Dropshipping API credentials:
   - API Key
   - API Secret
   - (Get these from your CJ Dropshipping account settings)
5. Authorize the connection

### Step 3: Import Products
1. In EPROLO, navigate to **"Products"**
2. Click **"Import Products"** or **"Add Products"**
3. Select **"CJ Dropshipping"** as source
4. Browse and select the 3 products you want to sell:
   - Premium Oversized Hoodie
   - Designer Graphic Tee
   - Elite Streetwear Joggers
5. Import products with images, descriptions, and pricing

### Step 4: Set Up EPROLO Webhooks
1. In EPROLO dashboard, go to **"Settings"** → **"Webhooks"**
2. Create a new webhook for order notifications
3. Set webhook URL to: `https://your-netlify-site.netlify.app/api/orders`
   (You'll need to create this API endpoint - see Step 5)

### Step 5: Create Order Processing System
You have two options:

**Option A: Use EPROLO API (Recommended)**
1. When a customer completes checkout, send order data to EPROLO API
2. EPROLO will automatically:
   - Process the order
   - Forward to CJ Dropshipping
   - Handle shipping
   - Send tracking information

**Implementation Example:**
```javascript
// In checkout.html, after PayPal payment success
async function createEproloOrder(orderData) {
    const response = await fetch('https://api.eprolo.com/v1/orders', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_EPROLO_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: orderData.productId,
            quantity: orderData.quantity,
            shipping_address: orderData.shippingAddress,
            // ... other order details
        })
    });
    return response.json();
}
```

**Option B: Use EPROLO Order Form**
1. Set up EPROLO order form in your checkout page
2. EPROLO handles order processing automatically
3. Less customization, but easier setup

### Step 6: Update Product Information
1. Replace placeholder product data in `product.html` with real EPROLO product IDs
2. Update product images to use EPROLO image URLs
3. Sync pricing from EPROLO dashboard

### Step 7: Configure Shipping
1. In EPROLO dashboard, go to **"Shipping"**
2. Set up shipping zones and rates
3. Configure shipping methods:
   - Standard Shipping (7-14 days)
   - Express Shipping (3-5 days)
4. EPROLO will automatically calculate shipping costs

### Step 8: Set Up Tracking
1. Enable order tracking in EPROLO settings
2. EPROLO will automatically send tracking numbers to customers
3. Add tracking display to your order confirmation page

### Step 9: Test Order Flow
1. Place a test order through your store
2. Verify order appears in EPROLO dashboard
3. Confirm order is forwarded to CJ Dropshipping
4. Check that tracking information is generated

### Step 10: Add Tidio Chat Integration
1. Sign up at [Tidio.com](https://www.tidio.com/)
2. Get your Tidio API key
3. In each HTML file, find the comment:
   ```html
   <!-- TODO: Replace the script below with your Tidio API key integration -->
   ```
4. Replace with:
   ```html
   <script src="//code.tidio.co/YOUR_API_KEY.js" async></script>
   ```
5. Remove the placeholder chat bubble click handler

### Step 11: Add PayPal Integration
1. Sign up for PayPal Business account
2. Get your PayPal Client ID
3. In `checkout.html`, find the PayPal placeholder section
4. Replace with PayPal SDK code:
   ```html
   <div id="paypal-button-container"></div>
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>
   <script>
       paypal.Buttons({
           createOrder: function(data, actions) {
               return actions.order.create({
                   purchase_units: [{
                       amount: {
                           value: '89.99' // Dynamic price from cart
                       }
                   }]
               });
           },
           onApprove: function(data, actions) {
               return actions.order.capture().then(function(details) {
                   // Send order to EPROLO API
                   createEproloOrder(orderData);
                   // Redirect to thank you page
                   window.location.href = 'thank-you.html';
               });
           }
       }).render('#paypal-button-container');
   </script>
   ```

## 📁 Project Structure

```
MyStore/
├── index.html          # Home page with product listings
├── product.html        # Product details page
├── checkout.html       # Checkout and payment page
└── README.md          # This file
```

## 🎨 Customization

### Colors
- Primary Accent: Cyan (#00ffff)
- Background: Black (#000000)
- Text: White with gray variations
- Neon Effects: Custom CSS in `<style>` tags

### Fonts
- Display Font: Space Grotesk (Headings)
- Body Font: Inter (Body text)

### Products
- Update product data in `product.html` JavaScript section
- Replace placeholder images with actual product images
- Update pricing and descriptions

## 🔧 Technical Details

- **Framework**: Pure HTML + Tailwind CSS (CDN)
- **No Build Process**: Ready to deploy as-is
- **Responsive**: Mobile-first design
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 📞 Support

For EPROLO support:
- Documentation: [EPROLO Help Center](https://help.eprolo.com/)
- Support Email: support@eprolo.com

For CJ Dropshipping support:
- Documentation: [CJ Dropshipping Help](https://help.cjdropshipping.com/)
- Support: Available in CJ Dropshipping dashboard

## 📝 Notes

- All product images are placeholders from Unsplash
- Replace with actual product images from CJ Dropshipping/EPROLO
- Update product IDs and SKUs when connecting to EPROLO
- Test all payment flows before going live
- Ensure GDPR compliance for EU customers
- Set up proper SSL certificate (automatic with Netlify)

## 🚀 Going Live Checklist

- [ ] Replace placeholder product images
- [ ] Connect EPROLO account
- [ ] Import products from CJ Dropshipping via EPROLO
- [ ] Set up PayPal payment integration
- [ ] Add Tidio chat widget
- [ ] Test complete order flow
- [ ] Configure shipping rates
- [ ] Set up order tracking
- [ ] Test on mobile devices
- [ ] Add privacy policy and terms of service
- [ ] Set up email notifications
- [ ] Configure domain name (optional)

---

**Built for Netlify Deployment | Ready for EPROLO Integration**

