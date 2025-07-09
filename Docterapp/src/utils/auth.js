// Authentication utility functions for HTTP-only JWT cookies with HTTPS support
import config from '../config';

/**
 * Get CSRF token from cookies
 * @param {string} name - Cookie name (default: 'csrftoken')
 * @returns {string|null} CSRF token value or null if not found
 */
export const getCookie = (name = 'csrftoken') => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

/**
 * Get headers for requests that need CSRF token (like DELETE, POST, PUT requests)
 * @returns {Object} Headers object with CSRF token if available
 */
export const getCSRFHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    headers["X-CSRFToken"] = csrfToken;
  }
  return headers;
};

/**
 * Get fetch options with proper credentials and security settings
 * @param {string} method - HTTP method
 * @param {Object} body - Request body (optional)
 * @param {Object} additionalHeaders - Additional headers (optional)
 * @returns {Object} Fetch options object
 */
export const getFetchOptions = (method = 'GET', body = null, additionalHeaders = {}) => {
  const options = {
    method,
    credentials: config.CORS_CREDENTIALS, // Required for HTTP-only cookies
    headers: {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
  };

  // Add CSRF token for state-changing operations
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      options.headers["X-CSRFToken"] = csrfToken;
    }
  }

  // Add body if provided
  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
};

/**
 * Check if user is authenticated by making a test request
 * @returns {Promise<boolean>} True if user is authenticated
 */
export const isAuthenticated = async () => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/api/auth/verify/`, {
      method: 'GET',
      credentials: config.CORS_CREDENTIALS,
    });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Logout user by calling logout endpoint and redirecting
 * @param {Function} navigate - React Router navigate function
 */
export const logout = async (navigate) => {
  try {
    const options = getFetchOptions('POST');
    await fetch(`${config.API_BASE_URL}/api/register/logout/`, options);
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  if (navigate) {
    navigate("/login");
  }
};

/**
 * Get current environment information for debugging
 * @returns {Object} Environment info
 */
export const getEnvironmentInfo = () => {
  return {
    protocol: window.location.protocol,
    isHttps: config.IS_HTTPS,
    apiBaseUrl: config.API_BASE_URL,
    isDevelopment: config.IS_DEVELOPMENT,
    isProduction: config.IS_PRODUCTION,
    cookies: document.cookie || 'No cookies found',
    userAgent: navigator.userAgent,
    cookieSettings: config.COOKIE_SETTINGS,
  };
};

/**
 * Fetch with automatic token refresh on 401 Unauthorized.
 * Assumes tokens are stored in cookies and refresh endpoint is /api/register/token/refresh/.
 * @param {string} url - The API endpoint.
 * @param {Object} options - Fetch options.
 * @returns {Promise<Response>} - The fetch response.
 */
export async function fetchWithAuth(url, options = {}) {
  let response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Try to refresh the token
    const refreshRes = await fetch(`${config.API_BASE_URL}/api/register/token/refresh/`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      // If you store refresh token in cookies, no need to send in body
      // If you store in localStorage, send: body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') })
    });
    if (refreshRes.ok) {
      // Optionally update access token in memory/localStorage if you use it
      // Retry the original request
      response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          ...options.headers,
        },
      });
    } else {
      // Refresh failed, log out user or redirect to login
      // Optionally clear tokens here
      throw new Error('Session expired. Please log in again.');
    }
  }
  return response;
} 