const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const PresidentialResultSchema = new mongoose.Schema(
  {
    pollingStation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'PollingStation',
    },
    president: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'President',
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

module.exports = db.model('Presidential', PresidentialResultSchema);
