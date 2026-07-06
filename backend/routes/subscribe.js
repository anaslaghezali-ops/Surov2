// backend/routes/subscribe.js
const express = require('express');
const router = express.Router();
const SubscribeService = require('../services/subscribeService');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const contractData = {
      ...req.body,
      userId: req.user.id
    };
    const result = await SubscribeService.createContract(contractData);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
