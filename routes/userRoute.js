const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @GET All useres
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  })
);

// @GET User by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  })
);

// Add new User
router.post(
  '/',
  asyncHandler(async (req, res) => {
    // Create new User
    const user = await User.create(req.body);
    if (!user) {
      return res.status(404).send('Error creating new user.Try again later');
    }
    // console.log(user);
    res.send(user);
  })
);

// @PUT Existing User
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedUser = await User.findByIdAndUpdate(req.body.id, req.body);

    if (!modifiedUser) {
      return res.status(404).send('Error updating user info.Try again later');
    }

    res.send(modifiedUser);
  })
);

// REMOVE user by id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndRemove(id);

    res.sendStatus(201);
  })
);

module.exports = router;
