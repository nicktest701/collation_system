const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const ConstituencyShema = new mongoose.Schema(
  {
    name: String,
    region: String,
    code: String,
    voters: Number,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model('Constituency', ConstituencyShema);
