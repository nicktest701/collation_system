const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const ParliamentarySchema = new mongoose.Schema(
  {
    pollingStation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'PollingStation',
    },
    parliamentarian: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Parliamentarian',
    },
    score: Number,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model('Parliamentary', ParliamentarySchema);
