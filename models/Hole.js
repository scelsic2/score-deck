const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Hole extends Model {}

Hole.init({
  hole_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tee_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  sequelize: db,
  modelName: 'hole'
})

module.exports = Hole