// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const ContactService = require('../services/contactService');
const Validator = require('../utils/validator');

router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    Validator.validateEmail(email);
    if (!name || name.length < 2) throw new Error('Invalid name');
    if (!subject || !message) throw new Error('Missing fields');
    
    await ContactService.sendEmail({ name, email, subject, message });
    res.json({ success: true, message: 'Email sent' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
