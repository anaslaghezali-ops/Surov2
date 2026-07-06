// services/api.js
const API_URL = 'http://localhost:3000/api';

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

  static async request(endpoint, method, data = null) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      };

      if (data) options.body = JSON.stringify(data);

      const res = await fetch(API_URL + endpoint, options);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Request failed');
      return json;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  }
}
