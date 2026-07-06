// backend/services/contractService.js
const Contract = require('../models/Contract');

class ContractService {
  static async getContracts(userId) {
    return await Contract.findByUserId(userId);
  }

  static async getContractById(contractId) {
    return await Contract.findById(contractId);
  }

  static async updateContract(contractId, updateData) {
    return await Contract.update(contractId, updateData);
  }

  static async cancelContract(contractId) {
    return await Contract.update(contractId, { status: 'cancelled' });
  }
}

module.exports = ContractService;
