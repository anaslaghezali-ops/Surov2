// backend/services/subscribeService.js
const Contract = require('../models/Contract');

class SubscribeService {
  static async createContract(contractData) {
    if (!contractData.immat || !contractData.plan) {
      throw new Error('Missing required fields');
    }

    const prices = { rc: 1200, tiers: 3500, tousrisques: 5500 };
    const annualPrice = prices[contractData.plan];

    const contract = await Contract.create({
      ...contractData,
      annualPrice,
      monthlyPrice: Math.round(annualPrice / 12),
      status: 'active',
      createdAt: new Date()
    });

    return {
      success: true,
      contractId: contract.id,
      message: 'Contract created successfully'
    };
  }

  static async getContracts(userId) {
    return await Contract.findByUserId(userId);
  }
}

module.exports = SubscribeService;
