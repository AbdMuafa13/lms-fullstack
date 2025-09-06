const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  course_id: { type: DataTypes.INTEGER },
  user_id: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING },
  progress_pct: { type: DataTypes.FLOAT }
}, {
  tableName: 'enrollments',
  timestamps: false
});

module.exports = Enrollment;
