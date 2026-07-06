// backend/routes/claims.js
const express = require('express');
const router = express.Router();
const ClaimsService = require('../services/claimsService');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const claimData = {
      ...req.body,
      userId: req.user.id
    };
    const result = await ClaimsService.createClaim(claimData);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', authMiddleware, async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      throw new Error('Unauthorized');
    }
    const claims = await ClaimsService.getClaims(req.params.userId);
    res.json(claims);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
