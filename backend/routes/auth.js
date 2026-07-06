// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService');
const Validator = require('../utils/validator');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    Validator.validateEmail(email);
    if (!password) throw new Error('Password required');
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    Validator.validateEmail(email);
    Validator.validatePhone(phone);
    if (!name || name.length < 2) throw new Error('Invalid name');
    if (!password || password.length < 6) throw new Error('Password too short');
    const result = await AuthService.signup({ name, email, phone, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
