// modules/subscribe.js
import API from '../services/api.js';
import Validator from '../utils/validator.js';

export default class SubscribeModule {
  async submit(formData) {
    try {
      // Validate
      Validator.validateSubscribe(formData);
      
      // Submit
      const res = await API.post('/subscribe', formData);
      
      // Success
      return res;
    } catch (err) {
      throw new Error('Subscription failed: ' + err.message);
    }
  }

  updatePrice() {
    const plan = document.querySelector('input[name="plan"]:checked')?.value;
    const prices = { rc: 1200, tiers: 3500, tousrisques: 5500 };
    const price = prices[plan] || 3500;
    document.getElementById('annual').textContent = price + ' DH';
    document.getElementById('monthly').textContent = Math.round(price / 12) + ' DH';
  }
}
