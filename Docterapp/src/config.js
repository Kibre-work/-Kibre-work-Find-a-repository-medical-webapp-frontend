// Application configuration for different environments

const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Environment detection
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  IS_HTTPS: window.location.protocol === 'https:',
  
  // Security settings
  SECURE_COOKIES: window.location.protocol === 'https:',
  
  // CORS settings
  CORS_CREDENTIALS: 'include',
  
  // Cookie settings
  COOKIE_SETTINGS: {
    httpOnly: true, // Must be set by backend
    secure: window.location.protocol === 'https:', // Secure in HTTPS
    sameSite: 'Lax', // Recommended for most cases
    path: '/',
  },
};

export default config; 