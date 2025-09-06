// Middleware untuk cek role user
module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user && req.user.role === 'admin') return next();
    return res.status(403).json({ error: 'Forbidden: Admin only' });
  },
  isGuru: (req, res, next) => {
    if (req.user && req.user.role === 'guru') return next();
    return res.status(403).json({ error: 'Forbidden: Guru only' });
  },
  isMurid: (req, res, next) => {
    if (req.user && req.user.role === 'murid') return next();
    return res.status(403).json({ error: 'Forbidden: Murid only' });
  }
};
