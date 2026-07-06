// modules/auth.js
import API from '../services/api.js';
import Storage from '../utils/storage.js';

export default class AuthModule {
  async init() {
    this.checkAuth();
  }

  async login(email, password) {
    try {
      const res = await API.post('/auth/login', { email, password });
      Storage.setToken(res.token);
      Storage.setUser(res.user);
      return res;
    } catch (err) {
      throw new Error('Login failed: ' + err.message);
    }
  }

  async signup(name, email, phone, password) {
    try {
      const res = await API.post('/auth/signup', { name, email, phone, password });
      Storage.setToken(res.token);
      Storage.setUser(res.user);
      return res;
    } catch (err) {
      throw new Error('Signup failed: ' + err.message);
    }
  }

  logout() {
    Storage.clear();
    window.location.hash = '#home';
  }

  checkAuth() {
    return !!Storage.getToken();
  }

  getUser() {
    return Storage.getUser();
  }
}
