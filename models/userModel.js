const mongoose = require('mongoose');
const db = require('../db/DBConnection');

const UserSchema = new mongoose.Schema(
  {
    profile: String,
    fullname: {
      type: String,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
    },
    dateofbirth: String,

    gender: String,
    email: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
    },
    phonenumber: String,
    address: String,
    residence: String,
    nationality: String,

    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


UserSchema.statics.findByPhoneNumber = function (phonenumber) {
  return this.findOne({ phonenumber });
};

module.exports = db.model('User', UserSchema);
