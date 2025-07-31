const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "RoleID",
      },
    },
    ProfilePictureURL: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    IsActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
