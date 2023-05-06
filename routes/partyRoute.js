const router = require('express').Router();
const { randomUUID } = require('crypto');
const _ = require('lodash');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const Party = require('../models/partyModel');

// Storage bucket
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/party');
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split('.')[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});

//
const upload = multer({ storage: Storage });

// @GET All partyes
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const parties = await Party.find();

    res.status(200).json(parties);
  })
);

// @POST Update party flag

router.put(
  '/flag',
  upload.single('flag'),
  asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const party = await Party.findByIdAndUpdate(_id, {
      $set: {
        flag: req.file?.filename,
      },
    });

    if (_.isEmpty(party)) {
      return res.status(400).json('Error updating flag image.Try again later.');
    }

    res.status(201).json('Flag image updated!!!');
  })
);

// @GET Party by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const party = await Party.findById(req.params.id);
    res.status(200).json(party);
  })
);

// Add new Party
router.post(
  '/',
  upload.single('flag'),
  asyncHandler(async (req, res) => {
    const newParty = req.body;

    newParty.flag = req.file?.filename;
    console.log(newParty);

    const party = await Party.create(newParty);

    if (_.isEmpty(party)) {
      return res.status(404).send('Error creating new party.Try again later');
    }

    res.status(201).json('New Party has been saved successfully !!');
  })
);

// @PUT Existing Party
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const id = req?.body?._id;
    const modifiedParty = await Party.findByIdAndUpdate(id, {
      $set: {
        name: req.body?.name,
        initials: req.body?.initials,
      },
    });

    if (_.isEmpty(modifiedParty)) {
      return res.status(404).send('Error updating party info.Try again later');
    }

    res.status(201).json('New Party has been updated successfully !!');
  })
);

// REMOVE party by id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Party.findByIdAndRemove(id);

    res.sendStatus(201);
  })
);

module.exports = router;
