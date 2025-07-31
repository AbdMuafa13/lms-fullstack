module.exports = function authorizeRole(...allowedIds) {
  return (req, res, next) => {
    const userRoleID = req.user?.roleID;

    if (!allowedIds.includes(userRoleID)) {
      return res
        .status(403)
        .json({ message: "Akses ditolak. Role tidak diizinkan." });
    }

    next();
  };
};
