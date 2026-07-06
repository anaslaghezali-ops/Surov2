// backend/services/claimsService.js
const Claim = require('../models/Claim');

class ClaimsService {
  static async createClaim(claimData) {
    if (!claimData.type || !claimData.date || !claimData.location) {
      throw new Error('Missing required fields');
    }

    const claimId = 'SIN-' + Date.now().toString().slice(-6);
    const claim = await Claim.create({
      ...claimData,
      claimId,
      status: 'en_attente',
      createdAt: new Date(),
      updates: [
        { date: new Date().toISOString(), message: 'Sinistre reçu' }
      ]
    });

    return {
      success: true,
      claimId: claim.claimId,
      message: 'Claim submitted successfully'
    };
  }

  static async getClaims(userId) {
    return await Claim.findByUserId(userId);
  }

  static async updateClaim(claimId, updateData) {
    return await Claim.update(claimId, updateData);
  }
}

module.exports = ClaimsService;
