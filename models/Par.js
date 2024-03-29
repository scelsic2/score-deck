const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Par extends Model {}

Par.init({
  par: {
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
  modelName: 'par'
})

module.exports = Par