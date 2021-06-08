import { Box, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useStyles } from "../RoomReceipt/Receipt.style";

function Receipt(props) {
  const classes = useStyles();
  //getting room and user details
  let roomDetails = props.location.state.roomDetail;
  let userDetails = props.location.state.userdata;

  //formatting checkin and checkout date
  let checkinDate = new Date(userDetails.checkIn);
  let checkoutDate = new Date(userDetails.checkOut);


  //final checkIn formatted date
  let finalCheckIn =
    checkinDate.getFullYear() +
    (checkinDate.getMonth() > 9 ? "-" : "-0") +
    checkinDate.getMonth() +
    "-" +
    checkinDate.getDate();

 //final checkOut formatted date
    let finalCheckOut =
    checkoutDate.getFullYear() +
    (checkoutDate.getMonth() > 9 ? "-" : "-0") +
    checkoutDate.getMonth() +
    "-" +
    checkoutDate.getDate();


  return (
    <div>
      <Header />
      <Container>
        <Paper className={classes.paper}>
          <Box className={classes.boxDetails}>
            <Typography variant="h4" className={classes.roomReceiptTitle}>
              Room Booking Receipt
            </Typography>
            <hr className={classes.hrStyle} />

            <div className={classes.receiptDetailsContainer}>
              {/* User Name */}
              <div className={classes.Details}>
                <div className={classes.detailsNames}>Name:</div>
                <div className={classes.userNamingDetails}>
                  {userDetails.firstName} {userDetails.lastName}
                </div>
              </div>

              {/* Room Category */}
              <div className={classes.Details}>
                <div className={classes.detailsNames}>Room Booked:</div>
                <div className={classes.userNamingDetails}>
                  {roomDetails.roomCategory}
                </div>
              </div>

                {/* Room Price */}
              <div className={classes.Details}>
                <div className={classes.detailsNames}>Total Amount:</div>
                <div className={classes.userNamingDetails}>
                $  {roomDetails.roomPrice}
                </div>
              </div>
             
              </div>
             
              <hr className={classes.hrStyleCheckin} />
              {/* CheckIn Details */}
              <div className={classes.checkindetails}>
                <div className={classes.detailsNames}>Checkin Details</div>

                <div className={classes.Details}>
                  <div className={classes.detailsNames}> CheckIn: </div>
                  <div className={classes.userNamingDetails} >{finalCheckIn} </div>
                </div>

                <div className={classes.Details}>
                  <div className={classes.detailsNames}> CheckOut: </div>
                  <div className={classes.userNamingDetails}>{finalCheckOut} </div>
                </div>
              </div>
           
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default Receipt;
