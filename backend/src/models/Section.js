const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Section = sequelize.define('Section', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  course_id: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.INTEGER }
}, {
  tableName: 'sections',
  timestamps: false
});

module.exports = Section;
