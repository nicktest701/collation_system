const router = require('express').Router();
const { randomUUID } = require('crypto');
const _ = require('lodash');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const Parliamentarian = require('../models/parliamentarianModel');

// Storage bucket
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/parliamentarian/');
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split('.')[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});

//
const upload = multer({ storage: Storage });

// @GET All parliamentarianes
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const parliamentarians = await Parliamentarian.find().populate('party');
    res.status(200).json(parliamentarians);
  })
);

// @GET Parliamentarian by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const parliamentarian = await Parliamentarian.findById(req.params.id).populate('party');
    res.status(200).json(parliamentarian);
  })
);

// Add new Parliamentarian
router.post(
  '/',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const newParliamentarian = req.body;

    newParliamentarian.profile = req.file?.filename;

    const parliamentarian = await Parliamentarian.create(newParliamentarian);

    if (_.isEmpty(parliamentarian)) {
      return res
        .status(404)
        .send('Error creating new parliamentarian.Try again later');
    }

    res.status(201).json('New Parliamentarian has been saved successfully !!');
  })
);

// @PUT Existing Parliamentarian
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedParliamentarian = await Parliamentarian.findByIdAndUpdate(
      req.body?._id,
      req.body
    );

    if (_.isEmpty(modifiedParliamentarian)) {
      return res
        .status(404)
        .send('Error updating parliamentarian info.Try again later');
    }

    res.status(201).json('New Parliamentarian has been updated successfully !!');
  })
);
// @PUT Update parliamentarian profile

router.put(
  '/profile',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const parliamentarian = await Parliamentarian.findByIdAndUpdate(_id, {
      $set: {
        profile: req.file?.filename,
      },
    });

    if (_.isEmpty(parliamentarian)) {
      return res
        .status(400)
        .json('Error updating profile image.Try again later.');
    }

    res.status(201).json('Profile Image updated!!!');
  })
);

// REMOVE parliamentarian by id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const parliamentarian = await Parliamentarian.findByIdAndRemove(id, {
      new: true,
    });

    if (_.isEmpty(parliamentarian)) {
      return res
        .status(400)
        .json('Error removing candidate information.Try again later!');
    }

    res
      .status(200)
      .json('Candidate Information has been removed successfully !');
  })
);

module.exports = router;
