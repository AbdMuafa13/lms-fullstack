const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");

User.belongsTo(Role, { foreignKey: "RoleID" });

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { Email: email },
      include: {
        model: Role,
        attributes: ["RoleID", "RoleName"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      {
        id: user.UserID,
        role: user.Role?.RoleName,
        roleID: user.RoleID,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.UserID,
        fullname: user.FullName,
        email: user.Email,
        role: user.Role?.RoleName,
        roleID: user.RoleID,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["Password"],
      },
      include: {
        model: Role,
        attributes: ["RoleID", "RoleName"],
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil semua user",
      users,
    });
  } catch (err) {
    console.error("Get users error:", err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

exports.register = async (req, res) => {
  const { fullname, email, password, roleID } = req.body;

  try {
    const existingUser = await User.findOne({ where: { Email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await Role.findByPk(roleID);
    if (!role) {
      return res.status(400).json({ message: "Role tidak ditemukan" });
    }

    const newUser = await User.create({
      FullName: fullname,
      Email: email,
      Password: hashedPassword,
      RoleID: roleID,
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser.UserID,
        fullname: newUser.FullName,
        email: newUser.Email,
        role: role.RoleName,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server " });
  }
};
