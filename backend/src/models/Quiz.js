const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Quiz = sequelize.define('Quiz', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lesson_id: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'quizzes',
  timestamps: false
});

module.exports = Quiz;
