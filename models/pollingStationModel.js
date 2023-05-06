const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const pollingStationSchema = new mongoose.Schema(
  {
    region: String,
    constituency: String,
    station: String,
    code: String,

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model('PollingStation', pollingStationSchema);
