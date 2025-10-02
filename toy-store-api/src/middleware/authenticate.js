const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Missing auth header' });

    if (!header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid auth header format. Use: Bearer <token>' });
    }

    const token = header.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token not provided' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);

    if (!user) return res.status(401).json({ message: 'User not found for this token' });

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name
    };

    console.log('✅ Authenticated User:', req.user);
    next();

  } catch (err) {
    console.error('JWT verify error:', err.message);
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};
