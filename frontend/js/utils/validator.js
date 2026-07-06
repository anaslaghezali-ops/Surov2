// utils/validator.js
export default class Validator {
  static validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static validatePhone(phone) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
  }

  static validateSubscribe(data) {
    if (!data.immat || data.immat.length < 5) throw new Error('Invalid immatriculation');
    if (!data.marque || data.marque.length < 2) throw new Error('Invalid brand');
    if (!data.conduEmail || !this.validateEmail(data.conduEmail)) throw new Error('Invalid email');
    if (!data.conduPhone || !this.validatePhone(data.conduPhone)) throw new Error('Invalid phone');
    if (!data.plan) throw new Error('Plan is required');
    return true;
  }

  static validateLogin(email, password) {
    if (!this.validateEmail(email)) throw new Error('Invalid email');
    if (!password || password.length < 6) throw new Error('Invalid password');
    return true;
  }
}
