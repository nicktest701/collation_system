const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const Parliamentary = require('../models/parliamentaryResultModel');

// @GET All parliamentaries
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const parliamentarys = await Parliamentary.find();
    res.status(200).json(parliamentarys);
  })
);

// @GET Parliamentary by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const parliamentary = await Parliamentary.findById(req.params.id);
    res.status(200).json(parliamentary);
  })
);

// Add new Parliamentary
router.post(
  '/',

  asyncHandler(async (req, res) => {
    const newParliamentary = req.body;

    const parliamentary = await Parliamentary.create(newParliamentary);

    if (_.isEmpty(parliamentary)) {
      return res
        .status(404)
        .send('Error creating new parliamentary.Try again later');
    }

    res.status(201).json('New Parliamentary has been saved successfully !!');
  })
);

// @PUT Existing Parliamentary
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedParliamentary = await Parliamentary.findByIdAndUpdate(
      req.body?._id,
      req.body
    );

    if (_.isEmpty(modifiedParliamentary)) {
      return res
        .status(404)
        .send('Error updating parliamentary info.Try again later');
    }

    res.status(201).json('New Parliamentary has been updated successfully !!');
  })
);

// REMOVE parliamentary by id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Parliamentary.findByIdAndRemove(id);

    res.sendStatus(201);
  })
);

module.exports = router;
