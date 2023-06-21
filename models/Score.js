const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  
  hole: {
    type: Number,
    required: false,
  },
  
}, { timestamps: true });

const Score = model('score', scoreSchema);

module.exports = Score;
