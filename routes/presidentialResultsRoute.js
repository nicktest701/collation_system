const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const Presidential = require('../models/presidentialResultModel');

// @GET All presidentiales
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const presidentials = await Presidential.find();
    res.status(200).json(presidentials);
  })
);

// @GET Presidential by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const presidential = await Presidential.findById(req.params.id);
    res.status(200).json(presidential);
  })
);

// Add new Presidential
router.post(
  '/',

  asyncHandler(async (req, res) => {
    const newPresidential = req.body;

    const presidential = await Presidential.create(newPresidential);

    if (_.isEmpty(presidential)) {
      return res
        .status(404)
        .send('Error creating new presidential.Try again later');
    }

    res.status(201).json('New Presidential has been saved successfully !!');
  })
);

// @PUT Existing Presidential
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedPresidential = await Presidential.findByIdAndUpdate(
      req.body?._id,
      req.body
    );

    if (_.isEmpty(modifiedPresidential)) {
      return res
        .status(404)
        .send('Error updating presidential info.Try again later');
    }

    res.status(201).json('New Presidential has been updated successfully !!');
  })
);

// REMOVE presidential by id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Presidential.findByIdAndRemove(id);

    res.sendStatus(201);
  })
);

module.exports = router;
