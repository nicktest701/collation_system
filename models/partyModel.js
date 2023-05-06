const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const { IMAGE_URL } = process.env;

const PartySchema = new mongoose.Schema(
  {
    flag: String,
    name: String,
    initials: {
      type: String,
      uppercase: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
    virtuals: {
      imageURL: {
        get() {
          const image = `${IMAGE_URL}/images/party/${this.flag}`;
          return image;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

module.exports = db.model('Party', PartySchema);
