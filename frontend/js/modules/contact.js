// modules/contact.js
import API from '../services/api.js';

export default class ContactModule {
  async submit(contactData) {
    try {
      return await API.post('/contact', contactData);
    } catch (err) {
      throw new Error('Contact submission failed: ' + err.message);
    }
  }
}
