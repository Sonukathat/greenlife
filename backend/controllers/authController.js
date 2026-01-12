import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Invalid email or password' });
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    res.json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User already exists' });
    
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // All users are registered with isAdmin: false by default
    // Admin status must be set manually in the database
    const user = await User.create({ name, email, password: hashedPassword, isAdmin: false });
    res.status(201).json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        isAdmin: false
      } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
