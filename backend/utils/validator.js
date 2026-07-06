// backend/utils/validator.js
class Validator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  static validatePhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error('Invalid phone format');
    }
  }

  static validateContractData(data) {
    if (!data.immat || data.immat.length < 5) {
      throw new Error('Invalid immatriculation');
    }
    if (!data.plan || !['rc', 'tiers', 'tousrisques'].includes(data.plan)) {
      throw new Error('Invalid plan');
    }
  }

  static validateClaimData(data) {
    if (!data.type || !['accident', 'vol', 'vandalisme', 'incendie', 'bris'].includes(data.type)) {
      throw new Error('Invalid claim type');
    }
    if (!data.date || !data.location || !data.description) {
      throw new Error('Missing required fields');
    }
  }
}

module.exports = Validator;
