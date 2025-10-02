module.exports = function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: user missing on request' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden: insufficient role',
        requiredRoles: roles,
        yourRole: req.user.role
      });
    }

    next();
  };
};
