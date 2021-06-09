import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { getUsersData } from "../../services/axiosData";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useStyles } from "../RoomDetailPage/RoomDetails.style";

function RoomDetails(props) {
  const classes = useStyles();
  const [roomDetail, setroomDetail] = useState("");

  const [userdata, setuserData] = useState("");
  const [images, setImages] = useState([]);
  const [extras, setExtras] = useState([]);
  const roomId = props.match.params.id;
  const userId = JSON.parse(localStorage.getItem("UserId"));
  

  const userCheckInCheckOut = {
    checkIn: userdata.checkIn,
    checkOut: userdata.checkOut,
  };
  console.log("users RESPONSE", userdata);
console.log("user checkin from object", userCheckInCheckOut.checkIn, "checkout", userCheckInCheckOut.checkOut);
  const handleBookNow = () => {
    axios
      .put(
        `http://localhost:5000/room/updateRoom/${roomId}`,
        userCheckInCheckOut
      )
      .then((response) => {
        console.log("Put Response:", response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    console.log("Room Id", roomId);

    axios
      .get(`http://localhost:5000/room/getRoom/${roomId}`)
      .then((response) => {
        console.log("Response:", response.data);
        // let roomData = response.data;
        setroomDetail(response.data);
        // props.history.replace("/login");
        setImages(response.data.roomImages);
        setExtras(response.data.extraFacilities);
      })
      .catch((err) => {
        console.log("Error:", err);
      });

    (async function () {
      try {
        const responseUser = await getUsersData(userId);
        // console.log("users data in detail page", response);
        setuserData(responseUser);
        console.log("response get user", responseUser);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // console.log("Get request response:", roomDetail);
  console.log("Get IMAGES ARRAY:", images);

  // console.log("User data in Detail Page", userdata);
  console.log(
    "User checkin checkout in Detail Page",
    userCheckInCheckOut.checkIn,
    userCheckInCheckOut.checkOut
  );

  let checkinDate = new Date(userdata.checkIn);
  console.log("user checkin", checkinDate);
  let checkInDateFinal =
    checkinDate?.getFullYear() +
    (checkinDate?.getMonth() + 1 > 9 ? "-" : "-0") +
    (checkinDate?.getMonth() + 1) +
    "-" +
    checkinDate?.getDate();
console.log("CHECKIN DATE FINAL", checkInDateFinal);
  const handleBackToRooms = () => {
    // console.log("in handle rooms checkin date", checkInDateFinal);
    props.history.push(`/allRooms?checkIn=${checkInDateFinal}`);
  };

  return (
    <div>
      <Header />
      <div className={classes.roomDetailbanner}></div>
      <Container className={classes.roomBannerContainer}>
        <div className={classes.imageContainer}>
          <Typography variant="h4" className={classes.roomCategory}>
            {roomDetail?.roomCategory}

            <span className={classes.booknowbtnContainer}>
              <Button
                className={classes.bookNowBtn}
                onClick={handleBackToRooms}
              >
                Back to Rooms
              </Button>
              
            </span>
          </Typography>

          <img className={classes.roomImage} src={images[0]} />
        </div>
      </Container>

      <Container className={classes.roomDetails}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Paper className={classes.paper}>
              <Box className={classes.boxDetails}>
                <Typography
                  variant="h4"
                  className={classes.roomDescriptionTitle}
                >
                  Details
                </Typography>
                <div className={classes.roomDescription}>
                  {roomDetail?.roomDescription}
                </div>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <Box className={classes.boxBorder}>
                <Typography
                  variant="h4"
                  className={classes.roomDescriptionTitle}
                >
                  Info
                </Typography>
                <div className={classes.roomDescription}>
                  <div className={classes.infoAbt}>
                    Price: $<span>{roomDetail?.roomPrice} per room/ night</span>
                  </div>
                  <div className={classes.infoAbt}>
                    Size: <span>{roomDetail?.roomSize}</span> SQFT{" "}
                  </div>
                  <div className={classes.infoAbt}>
                    Max-Capacity:{" "}
                    <span>{roomDetail?.maxCapacityOfpersons} Persons</span>{" "}
                  </div>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={3}>
          {images.length > 0
            ? images.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  className={classes.ImageGrid}
                >
                  <Paper className={classes.imagePaper}>
                    <Box className={classes.imagesArrayContainers}>
                      <img
                        className={classes.roomArrayImages}
                        src={item}
                        // height="180"
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))
            : null}
        </Grid>
      </Container>

      <Container className={classes.roomExtras}>
        <Typography variant="h4" className={classes.roomDescriptionTitle}>
          Extras
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper className={classes.extrasPaper}>
              <Box className={classes.extrasBox}>
                <div className={classes.roomDescription}> - {extras[0]} </div>
                <div className={classes.roomDescription}> - {extras[1]} </div>
                <div className={classes.roomDescription}> - {extras[2]} </div>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper className={classes.extrasPaper}>
              <Box className={classes.extrasBox}>
                <div className={classes.roomDescription}> - {extras[3]} </div>
                <div className={classes.roomDescription}> - {extras[4]} </div>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper className={classes.extrasPaper}>
              <Box className={classes.extrasBox}>
                <div className={classes.roomDescription}> - {extras[5]} </div>
                <div className={classes.roomDescription}> - {extras[6]} </div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.booknowBottom}>
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/room-booking-receipt",
            state: { roomDetail/* , userdata  */},
          }}
        >
          <Button className={classes.bookNowBtn} onClick={handleBookNow}>
            Book Now
          </Button>
        </Link>
      </Container>
      <Footer />
    </div>
  );
}

export default RoomDetails;
