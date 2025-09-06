const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  org_id: { type: DataTypes.INTEGER },
  owner_id: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING },
  visibility: { type: DataTypes.STRING },
  price_cents: { type: DataTypes.INTEGER }
}, {
  tableName: 'courses',
  timestamps: false
});

module.exports = Course;
