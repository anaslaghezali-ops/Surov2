// modules/claims.js
import API from '../services/api.js';

export default class ClaimsModule {
  async submit(claimData) {
    try {
      const res = await API.post('/claims', claimData);
      return res;
    } catch (err) {
      throw new Error('Claim submission failed: ' + err.message);
    }
  }

  async getClaims(userId) {
    try {
      return await API.get(`/claims/${userId}`);
    } catch (err) {
      throw new Error('Failed to fetch claims: ' + err.message);
    }
  }

  setType(type) {
    document.getElementById('claimTypeHidden').value = type;
  }
}
