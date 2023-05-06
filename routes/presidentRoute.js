const router = require('express').Router();
const { randomUUID } = require('crypto');
const _ = require('lodash');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const President = require('../models/presidentModel');

// Storage bucket
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/president/');
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split('.')[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});

//
const upload = multer({ storage: Storage });

// @GET All presidentes
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const presidents = await President.find().populate('party');
    res.status(200).json(presidents);
  })
);

// @GET President by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const president = await President.findById(req.params.id).populate('party');
    res.status(200).json(president);
  })
);

// Add new President
router.post(
  '/',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const newPresident = req.body;

    newPresident.profile = req.file?.filename;

    const president = await President.create(newPresident);

    if (_.isEmpty(president)) {
      return res
        .status(404)
        .send('Error creating new president.Try again later');
    }

    res.status(201).json('New President has been saved successfully !!');
  })
);

// @PUT Existing President
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedPresident = await President.findByIdAndUpdate(
      req.body?._id,
      req.body
    );

    if (_.isEmpty(modifiedPresident)) {
      return res
        .status(404)
        .send('Error updating president info.Try again later');
    }

    res.status(201).json('New President has been updated successfully !!');
  })
);
// @PUT Update president profile

router.put(
  '/profile',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const president = await President.findByIdAndUpdate(_id, {
      $set: {
        profile: req.file?.filename,
      },
    });

    if (_.isEmpty(president)) {
      return res
        .status(400)
        .json('Error updating profile image.Try again later.');
    }

    res.status(201).json('Profile Image updated!!!');
  })
);

// REMOVE president by id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const president = await President.findByIdAndRemove(id, {
      new: true,
    });

    if (_.isEmpty(president)) {
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
