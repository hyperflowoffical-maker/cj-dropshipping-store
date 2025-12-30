/**
 * Production Configuration for CJ Dropshipping
 * Update these values when deploying to production
 */

// PRODUCTION API URLS - Choose your backend hosting:
const BACKEND_URLS = {
    // Heroku (most popular)
    heroku: 'https://your-app-name.herokuapp.com/api',
    
    // Railway (modern alternative)
    railway: 'https://your-app-name-production.up.railway.app/api',
    
    // Vercel (serverless)
    vercel: 'https://your-app-name.vercel.app/api',
    
    // AWS Elastic Beanstalk
    aws: 'https://your-app-name.elasticbeanstalk.com/api',
    
    // DigitalOcean
    digitalocean: 'https://your-app-name.digitalocean.app/api',
    
    // Custom domain
    custom: 'https://api.yourdomain.com/api'
};

// Select your backend hosting
const PRODUCTION_BACKEND = 'heroku'; // Change this to your choice

// Production configuration
const PRODUCTION_CONFIG = {
    // Backend API URL
    apiBase: BACKEND_URLS[PRODUCTION_BACKEND],
    
    // Start in live mode (set to true for production)
    demoMode: false,
    
    // Auto-fallback to demo if API fails
    autoFallback: true,
    
    // Enable production features
    enableLogging: false,        // Disable console logs in production
    enableCaching: true,         // Enable response caching
    enableRateLimiting: true,    // Enable rate limiting awareness
    
    // Production environment
    environment: 'production',
    
    // Security settings
    enforceHttps: true,           // Force HTTPS API calls
    validateResponses: true,       // Validate API responses
    sanitizeErrors: true          // Sanitize error messages
};

// Development configuration (for local testing)
const DEVELOPMENT_CONFIG = {
    apiBase: 'http://localhost:3000/api',
    demoMode: true,
    autoFallback: true,
    enableLogging: true,
    enableCaching: true,
    enableRateLimiting: true,
    environment: 'development',
    enforceHttps: false,
    validateResponses: true,
    sanitizeErrors: true
};

// Get configuration based on environment
function getConfig() {
    const isProduction = window.location.hostname !== 'localhost' && 
                     window.location.hostname !== '127.0.0.1';
    
    return isProduction ? PRODUCTION_CONFIG : DEVELOPMENT_CONFIG;
}

// Auto-detect backend URL (useful for multiple environments)
function detectBackendUrl() {
    const hostname = window.location.hostname;
    
    // Map hostnames to backend URLs
    const backendMap = {
        'your-app.netlify.app': BACKEND_URLS.heroku,
        'your-app--preview.netlify.app': BACKEND_URLS.heroku,
        'store.yourdomain.com': BACKEND_URLS.custom,
        'localhost': 'http://localhost:3000/api',
        '127.0.0.1': 'http://localhost:3000/api'
    };
    
    return backendMap[hostname] || BACKEND_URLS.heroku;
}

// Export configurations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCTION_CONFIG,
        DEVELOPMENT_CONFIG,
        BACKEND_URLS,
        getConfig,
        detectBackendUrl
    };
} else if (typeof window !== 'undefined') {
    window.PRODUCTION_CONFIG = PRODUCTION_CONFIG;
    window.DEVELOPMENT_CONFIG = DEVELOPMENT_CONFIG;
    window.BACKEND_URLS = BACKEND_URLS;
    window.getConfig = getConfig;
    window.detectBackendUrl = detectBackendUrl;
    
    // Auto-initialize with detected config
    window.CJ_PRODUCTION_CONFIG = getConfig();
    
    console.log('🌍 Environment:', window.CJ_PRODUCTION_CONFIG.environment);
    console.log('🔗 API Base:', window.CJ_PRODUCTION_CONFIG.apiBase);
    console.log('🎭 Demo Mode:', window.CJ_PRODUCTION_CONFIG.demoMode);
}
