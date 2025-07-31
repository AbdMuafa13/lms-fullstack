const Sequelize = require("sequelize");
const sequelize = require("../config/db");

// Import model
const User = require("./user");
const Role = require("./role");

// Definisikan relasi antar model
Role.hasMany(User, { foreignKey: "RoleID" });
User.belongsTo(Role, { foreignKey: "RoleID" });

// Export semua dalam satu objek
module.exports = {
  Sequelize,
  sequelize,
  User,
  Role,
};
