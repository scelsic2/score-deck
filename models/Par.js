const { Schema, model } = require('mongoose');

const parSchema = new Schema({
  
  hole: {
    type: Number,
    required: false,
  },
  
});

const Par = model('par', parSchema);

module.exports = Par;