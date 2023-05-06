const mongoose = require('mongoose');
const _ = require('lodash');
const moment = require('moment');
const db = require('../db/DBConnection');

const { IMAGE_URL } = process.env;
const PresidentSchema = new mongoose.Schema(
  {
    profile: String,
    firstname: {
      type: String,
      lowercase: true,
      required: true,
    },
    surname: {
      type: String,
      lowercase: true,
      required: true,
    },
    othername: {
      type: String,
      lowercase: true,
    },
    dateofbirth: String,
    gender: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phonenumber: String,
    placeofbirth: String,
    address: String,
    region: String,
    party: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Party',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          const name = _.startCase(
            `${this.surname} ${this.firstname} ${this.othername}`
          );
          return name;
        },
      },
      age: {
        get() {
          const age =
            moment(new Date()).year() -
            moment(new Date(this.dateofbirth)).year();
          return age;
        },
      },
      imageURL: {
        get() {
          const image = `${IMAGE_URL}/images/president/${this.profile}`;
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

module.exports = db.model('President', PresidentSchema);
