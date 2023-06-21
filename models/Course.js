const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  tees: {
    type: String,
    required: true,
  },
  gender: {
  type: String,
  required: true,
  },

  par: [
    {
      type: Schema.Types.ObjectId,
      ref: 'par'
    }
  ],
  scores: [
    {
      type: Schema.Types.ObjectId,
      ref: 'score'
    }
  ]

});


const Course = model('course', courseSchema)

module.exports = Course