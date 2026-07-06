// backend/routes/contracts.js
const express = require('express');
const router = express.Router();
const ContractService = require('../services/contractService');
const authMiddleware = require('../middleware/auth');

router.get('/:userId', authMiddleware, async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      throw new Error('Unauthorized');
    }
    const contracts = await ContractService.getContracts(req.params.userId);
    res.json(contracts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
