// js/services/api.js - CORRECTED VERSION
// Environment-aware API URL configuration

const getAPIUrl = () => {
  // Development environment
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000/api';
  }
  
  // Production environment - use custom API URL or relative path
  // For Railway/Heroku deployments, use full URL
  // Example: https://suro-backend-xxx.railway.app/api
  
  // Option 1: Use environment variable set at build time
  if (window.API_URL) {
    return window.API_URL;
  }
  
  // Option 2: Use relative path if frontend and backend are on same server
  // Uncomment this if deploying together:
  // return '/api';
  
  // Option 3: Default to production domain
  // Replace with your actual backend domain
  return 'https://suro-backend-xxx.railway.app/api';
};

const API_URL = getAPIUrl();

console.log('[API] Using endpoint:', API_URL, '(Environment:', window.location.hostname, ')');

export default class API {
  static async get(endpoint) {
    return this.request(endpoint, 'GET');
  }

  static async post(endpoint, data) {
    return this.request(endpoint, 'POST', data);
  }

  static async put(endpoint, data) {
    return this.request(endpoint, 'PUT', data);
  }

  static async delete(endpoint) {
    return this.request(endpoint, 'DELETE');
  }

  static async request(endpoint, method, data = null) {
    try {
      const token = localStorage.getItem('token');
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      // Add JWT token if available
      if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
      }

      // Add body for POST/PUT requests
      if (data) {
        options.body = JSON.stringify(data);
      }

      const fullUrl = API_URL + endpoint;
      
      console.log(`[API] ${method} ${endpoint}`, data ? '(with data)' : '');

      const res = await fetch(fullUrl, options);
      
      // Parse response
      let json;
      try {
        json = await res.json();
      } catch (e) {
        // Server returned non-JSON response
        console.error('[API] Invalid JSON response:', res);
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      // Check for HTTP errors
      if (!res.ok) {
        console.error('[API] Error response:', {
          status: res.status,
          statusText: res.statusText,
          error: json.error || 'Unknown error'
        });
        throw new Error(json.error || `HTTP ${res.status}`);
      }

      console.log(`[API] Success (${res.status}):`, json);
      return json;
      
    } catch (err) {
      // Distinguish between network errors and server errors
      if (err instanceof TypeError) {
        // Network error (CORS, server unreachable, etc.)
        console.error('[API] Network error:', {
          message: err.message,
          endpoint: endpoint,
          url: API_URL + endpoint
        });
        throw new Error(`Unable to reach API: ${err.message}`);
      }
      
      console.error('[API] Request error:', err);
      throw err;
    }
  }

  // Utility: Check if API is reachable
  static async checkHealth() {
    try {
      const health = await this.get('/health');
      console.log('[API] Health check passed:', health);
      return true;
    } catch (err) {
      console.warn('[API] Health check failed:', err.message);
      return false;
    }
  }
}
