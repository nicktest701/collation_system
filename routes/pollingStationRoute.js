const router = require('express').Router();
const { randomUUID } = require('crypto');
const _ = require('lodash');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const PollingStation = require('../models/pollingStationModel');

// Storage bucket
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/pollingStation/');
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split('.')[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});

//
const upload = multer({ storage: Storage });

// @GET All pollingStationes
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const pollingStations = await PollingStation.find();
    res.status(200).json(pollingStations);
  })
);

// @POST Update pollingStation profile

router.put(
  '/profile',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const pollingStation = await PollingStation.findByIdAndUpdate(_id, {
      $set: {
        profile: req.file?.filename,
      },
    });

    if (_.isEmpty(pollingStation)) {
      return res
        .status(400)
        .json('Error updating profile image.Try again later.');
    }

    res.status(201).json('Profile image updated!!!');
  })
);

// @GET PollingStation by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const pollingStation = await PollingStation.findById(req.params.id);
    res.status(200).json(pollingStation);
  })
);

// Add new PollingStation
router.post(
  '/',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const newPollingStation = req.body;

    newPollingStation.profile = req.file?.filename;

    console.log(newPollingStation);

    const pollingStation = await PollingStation.create(newPollingStation);
    if (_.isEmpty(pollingStation)) {
      return res.status(404).send('Error creating new pollingStation.Try again later');
    }
    // console.log(pollingStation);
    res.status(201).json('New PollingStation has been saved successfully !!');
  })
);

// @PUT Existing PollingStation
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedPollingStation = await PollingStation.findByIdAndUpdate(
      req.body?._id,
      req.body
    );

    if (_.isEmpty(modifiedPollingStation)) {
      return res.status(404).send('Error updating pollingStation info.Try again later');
    }

    res.status(201).json('New PollingStation has been updated successfully !!');
  })
);

// REMOVE pollingStation by id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await PollingStation.findByIdAndRemove(id);

    res.sendStatus(201);
  })
);

module.exports = router;
