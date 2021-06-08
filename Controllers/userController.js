const express = require("express");
const { request, response } = require("express");
const mongoose = require("mongoose");
const userSchema = require("../Models/userModel");

exports.postUserDetails = async (request, response, next) => {
  console.log("In post User controller");

  const user = await new userSchema({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    checkIn: request.body.checkIn,
    checkOut: request.body.checkOut,
  });

  user.save((err, res) => {
    if (err) {
      console.log("Error", err);
      response
        .status(400)
        .json({ message: "User is already exists with this email!!" });
    }
    console.log(res);
    // response.status(201).json({ message: "User Created Successfully" });
    response.status(201).json(user);
  });
};

exports.getUserDetails = async (request, response, next) => {
  console.log("Inside get user");
  // const userId = mongoose.Types.ObjectId(request.params.userId);

  const userId = request.params.id;


  console.log("id of user", userId);
  try {
    var userData = await userSchema.findById(userId);
    if (userData) {
      response.status(200).json(userData);
    } else {
      response
        .status(400)
        .json({ message: "User is not found with provided data" });
    }
  } catch (err) {
    response
      .status(400)
      .json({ message: "User is not found with error data" });
  }
};

exports.updateUserDetails = async (request, response, next) => {
  const userId = request.params.id;
  console.log("User id: ", userId);
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const checkIn = request.body.checkIn;
  const checkOut = request.body.checkOut;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  await userSchema
    .findByIdAndUpdate(
      { _id: userId },

      { $set: { firstName: firstName, lastName: lastName, email: email, checkIn: checkInDate, checkOut: checkOutDate } }
    )
    .then(() => {
      userSchema.findOne({ _id: userId }).then((user) => {
        response.send(user);
        console.log("Updated user", user);
      });
    });
};