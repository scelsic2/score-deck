const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Score extends Model {}

Score.init({
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  score_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  par_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hole_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tee_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  sequelize: db,
  modelName: 'score'
})

module.exports = Score