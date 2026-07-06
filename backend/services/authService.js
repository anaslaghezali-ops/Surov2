// backend/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('User not found');
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid password');
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email }
    };
  }

  static async signup(userData) {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) throw new Error('User already exists');
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email }
    };
  }
}

module.exports = AuthService;
