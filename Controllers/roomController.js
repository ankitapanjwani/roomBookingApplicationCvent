const express = require("express");
const { request, response } = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const roomSchema = require("../Models/roomsModel");

exports.postRoomDetails = async (request, response, next) => {
  console.log("In post Room controller");

  const room = await new roomSchema({
    roomCategory: request.body.roomCategory,
    roomPrice: request.body.roomPrice,
    roomImages: request.body.roomImages,
    roomDescription: request.body.roomDescription,
    roomSize: request.body.roomSize,
    maxCapacityOfpersons: request.body.maxCapacityOfpersons,
    extraFacilities: request.body.extraFacilities,
    bookedFrom: request.body.bookedFrom,
    bookedTill: request.body.bookedTill,
    // booking: request.body.booking,
  });

  room.save((err, res) => {
    if (err) {
      console.log("Error", err);
      response.status(400).json({ message: "Room already exists!" });
    }
    console.log(res);
    response.status(201).json({ message: "Room Details Entered Successfully" });
  });
};

exports.getAllRooms = async (request, response, next) => {
  console.log("Inside all rooms controller");

  const checkIn = request.params.checkIn;
  // const checkOut = request.params.checkOut;

  
  console.log("CheckIn type:", typeof (checkIn));
  console.log("CheckIn value:", checkIn);
  // console.log("date converted into object:", new Date(checkIn));

  // "availableFrom": {$lte:  new Date(checkIn)},
  // "availableTo": {$gte: new Date(checkOut)}
  const checkInDate = new Date(checkIn);
  // const checkOutDate = new Date(checkOut);

  try {
    const filteredRooms = await roomSchema.find({
      // "$and" :[{
      //   "availableFrom": {
      //     "$lte": checkInDate
      //   }
      // }, {
      //   "availableTo": {
      //     "$gte": checkOutDate
      //   }
      // }]

      $and: [
        {
          bookedFrom: {
            $lt: checkInDate,
          },
        },
        {
          bookedTill: {
            $lt: checkInDate,
            // "$gte": checkOutDate
          },
        },
      ],
    });

    console.log("ROOMS ", filteredRooms);
    if (filteredRooms) {
      response.status(200).json(filteredRooms);
    } else {
      response
        .status(400)
        .json({ message: "Room is not found with provided data" });
    }
  } catch (error) {
    console.log("Error:", error);
    response.status(400).json({ message: "Can't fetch Rooms" });
  }
};

// exports.getAllRooms = async (request, response, next) => {
//   console.log("Inside all rooms controller");

//   const checkIn = request.body.checkIn;
//   const checkOut = request.body.checkOut;

//   console.log("CheckIn:", typeof checkIn, "checkOyt:", checkOut);

//   console.log("date converted into object:", new Date(checkIn));

//   // "availableFrom": {$lte:  new Date(checkIn)},
//   // "availableTo": {$gte: new Date(checkOut)}
//   const checkInDate = new Date(checkIn);
//   const checkOutDate = new Date(checkOut);

//   // const filteredRooms = await roomSchema.find();

//   // console.log("ROOMS booking array ", filteredRooms);

//   let parseDataBooking ;
//   await roomSchema.find({}, "booking", function (err, someValue) {
//     if (err) return next(err);
//     // res.send(someValue);
//     parseDataBooking = someValue;
//     // return someValue;
//   });


//   // console.log("parseData length:", parseData[0].booking[0].availableFrom);
// //   for(let i=0;i<parseDataBooking.length;i++){

// //  console.log("booking arrays",  console.log("PARSEDATABOOKING",parseDataBooking[i].booking[i]));
// //    }

//   // function dateCompare(Checkinstart, Checkoutend, from, till) {
//   //   if (Checkinstart > till) {
//   //     return true;
//   //   }
//   //   if (Checkoutend < from) {
//   //     return true;
//   //   }
//   //   return false;
//   // }
//   // for (var i = 0; i < parseDataBooking.length; i++) {
//     // // console.log(
//     // //   "ava dates: ",
//     //  parseDataBooking +=  parseDataBooking[i].booking[i];
//     // //   // "ava to: ",
//     // //   // parseDataBooking[i].booking[i]
//     // // );
//     // console.log(
//     //   parseDataBooking[i].booking[i].availableFrom +
//     //     " : " +
//     //     parseDataBooking[i].booking[i].availableTo +
//     //     " => " +
//     //     dateCompare(
//     //       checkInDate,
//     //       checkOutDate,
//     //       parseDataBooking[i].booking[i].availableFrom,
//     //        parseDataBooking[i].booking[i].availableTo
//     //     )
//     // );
//     //   try{
//     //   if (dateCompare(
//     //           checkInDate,
//     //           checkOutDate,
//     //           parseDataBooking[i].booking[i].availableFrom,
//     //           parseDataBooking[i].booking[i].availableTo
//     //         )) {
//     //     response.status(200).json(filteredRooms[i]);
//     //   } else {
//     //     response
//     //       .status(400)
//     //       .json({ message: "Room is not found with provided data" });
//     //   }
//     // }catch (error) {
//     //     console.log("Error:", error);
//     //     response.status(400).json({ message: "Can't fetch Rooms" });
//     //   }
//   // }

//   // console.log("Rooms filtered  ",filteredRooms );

//   //   if (Comparevalue() === true) {
//   //     response.status(200).json(filteredRooms);
//   //   } else {
//   //     response
//   //       .status(400)
//   //       .json({ message: "Room is not found with provided data" });
//   //   }
//   // } catch (error) {
//   //   console.log("Error:", error);
//   //   response.status(400).json({ message: "Can't fetch Rooms" });
//   // }
// };

exports.getroomById = async (request, response, next) => {
  console.log("Inside get room by id");
  // const userId = mongoose.Types.ObjectId(request.params.userId);

  const roomId = request.params.roomId;

  console.log("id of particular room", roomId);
  try {
    var roomData = await roomSchema.findById(roomId);
    if (roomData) {
      response.status(200).json(roomData);
    } else {
      response
        .status(400)
        .json({ message: "Room is not found with provided data" });
    }
  } catch (err) {
    response.status(400).json({ message: "Room is not found with error data" });
  }
};



exports.updateRoomDates = async (request, response, next) => {
  console.log("In rooms update controller");
  const roomId = request.params.id;
  console.log("Room id: ", roomId);
  const checkIn = request.body.checkIn;
  const checkOut = request.body.checkOut;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  console.log("checkin :", checkIn,"formatted:", checkInDate);
  // db.Employee.update(
  //   {"Employeeid" : 1},
  //   {$set: { "EmployeeName" : "NewMartin"}});

  await roomSchema
    .findByIdAndUpdate(
      { _id: roomId },

      { $set: { bookedFrom: checkInDate, bookedTill: checkOutDate } }
    )
    .then(() => {
      roomSchema.findOne({ _id: roomId }).then((room) => {
        response.send(room);
        console.log("Updated room", room);
      });
    });
};






















// router.put('/rooms/:id', (req, res, next) => {
//   Room.findByIdAndUpdate({_id: req.params.id}, req.body)
//   .then(() => {
//       Room.findOne({_id: req.params.id})
//       .then( room => {
//           res.send(room);
//       });
//   });
// });






// const userId = request.params.id;
// let parseData;
// await roomSchema.find({}, "availableFrom availableTo", function (err, someValue) {
//   if (err) return next(err);
//   // res.send(someValue);
//    parseData = someValue;
//   // console.log("parseData:", parseData);

// });
// console.log(typeof(parseData));

// try {
//   const renderAllRooms = await roomSchema.find();
//   if(renderAllRooms){

//     response.status(200).json(renderAllRooms);
//   }
//   else{
//     response
//     .status(400)
//     .json({ message: "Room is not found with provided data" });
//   }

// } catch (error) {
//   console.log("Error:", error);
//   response.status(400).json({ message: "Can't fetch Rooms" });
// }
