const router = require('express').Router();
const { randomUUID } = require('crypto');
const _ = require('lodash');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const Constituency = require('../models/constituencyModel');

// Storage bucket
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/constituency/');
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split('.')[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});

//
const upload = multer({ storage: Storage });

// @GET All constituencyes
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const constituencys = await Constituency.find();
    res.status(200).json(constituencys);
  })
);

// @GET Constituency by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const constituency = await Constituency.findById(req.params.id);
    res.status(200).json(constituency);
  })
);

// Add new Constituency
router.post(
  '/',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const newConstituency = req.body;

    newConstituency.profile = req.file?.filename;

    console.log(newConstituency);

    const constituency = await Constituency.insertMany(newConstituency);
    if (_.isEmpty(constituency)) {
      return res
        .status(404)
        .send('Error creating new constituency.Try again later');
    }
    // console.log(constituency);
    res.status(201).json('New Constituency has been saved successfully !!');
  })
);

// @PUT Existing Constituency
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedConstituency = await Constituency.findByIdAndUpdate(
      req.body?._id,
      req.body
    );

    if (_.isEmpty(modifiedConstituency)) {
      return res
        .status(404)
        .send('Error updating constituency info.Try again later');
    }

    res.status(201).json('New Constituency has been updated successfully !!');
  })
);

// REMOVE constituency by id

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const constituency = await Constituency.findByIdAndRemove(id, {
      new: true,
    });

    if (_.isEmpty(constituency)) {
      return res
        .status(400)
        .json('Error removing constituency information.Try again later!');
    }

    res
      .status(200)
      .json('Constituency Information has been removed successfully !');
  })
);

module.exports = router;
