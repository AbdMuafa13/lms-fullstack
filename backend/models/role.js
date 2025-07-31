const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define(
  "Role",
  {
    RoleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    RoleName: {
      type: DataTypes.ENUM("Admin", "Teacher", "Student"),
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Role;
