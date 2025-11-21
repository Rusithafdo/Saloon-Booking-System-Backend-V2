const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
const { authenticateToken, requireCustomer } = require('../middleware/authMiddleware');

// Google login - Save or return user with JWT
router.post('/google-login', async (req, res) => {
  const { name, email, photoURL } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Missing email' });
  }

  try {
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({ 
        name: name || 'Google User',
        email: email,
        photoURL: photoURL || '',
        role: 'customer'
      });
      await user.save();
    } else {
      // Update user data if they already exist
      user.name = name || user.name;
      user.photoURL = photoURL || user.photoURL;
      await user.save();
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email, // Make sure email is included
        photoURL: user.photoURL,
        role: user.role,
        phone: user.phone || '', // Ensure phone is included even if empty
        gender: user.gender || '',
        address: user.address || []
      }
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Phone login endpoint
router.post('/phone-login', async (req, res) => {
  const { phone, name } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    let user = await User.findOne({ phone });
    
    if (!user) {
      user = new User({ 
        name: name || 'OTP User',
        phone,
        role: 'customer'
      });
      await user.save();
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      phone: user.phone,
      role: user.role,
      name: user.name
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        email: user.email,
        photoURL: user.photoURL,
        gender: user.gender,
        address: user.address
      }
    });
  } catch (err) {
    console.error('Phone login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get current user profile (protected)
router.get('/profile', authenticateToken, requireCustomer, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photoURL: user.photoURL,
        gender: user.gender,
        address: user.address,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile (protected)
router.put('/:id', authenticateToken, requireCustomer, async (req, res) => {
  try {
    // Ensure user can only update their own profile
    if (req.params.id !== req.user.userId) {
      return res.status(403).json({ message: 'Can only update your own profile' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        photoURL: updatedUser.photoURL,
        gender: updatedUser.gender,
        address: updatedUser.address,
        role: updatedUser.role
      }
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Validate token endpoint
router.post('/validate-token', authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

module.exports = router;