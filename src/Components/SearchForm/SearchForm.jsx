import React, { useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box, Container, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import DatepickerField from "../Datepicker/DatepickerField";
import { useStyles } from "../SearchForm/SearchForm.style";
import { getUsersData, postUsersData } from "../../services/axiosData";
import { UserContext } from "../../App";


function SearchForm(props) {
  // const initialState = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   checkIn: new Date(),
  //   checkOut: new Date(),
  // };
  const classes = useStyles();

  const { usersData, userDataEmail} = useContext(UserContext);

  //destructuring
  const [usersdata, setUsersData] = usersData;
  const [userEmail, setUserEmail] = userDataEmail;

  // const [serData, setFormData] = useState(initialState);
  let userFinalId = JSON.parse(localStorage.getItem("UserId"));

  useEffect(() => {
    (async function () {
      try {
        const responseUser = await getUsersData(userFinalId);

        setUsersData(responseUser);
        console.log("RESPONSE USER IN SEARCH FORM", responseUser);
        setUserEmail(responseUser.email)
       
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  // const [useremail, setuserEmail] = useState('');


  
  console.log("Users Data EMAIL FROM CONTEXT:", userEmail);
  
  const handleInputChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setUsersData((inputs) => ({
      ...inputs,
      [key]: value,
    }));
  };
  
  // useEffect(() => {
  //   setuserEmail(usersData.email);
  // }, []);
  // console.log("Set Users EMAIL",useremail);




  const handleSubmit = async (event) => {
    event.preventDefault();

    let checkInDateFULL = new Date(usersdata.checkIn);
    let checkOutDateFULL = new Date(usersdata.checkOut);

    let checkinYear = checkInDateFULL.getFullYear();
    let checkoutYear = checkOutDateFULL.getFullYear();
    let checkinMonth = checkInDateFULL.getMonth() + 1;
    let checkoutMonth = checkOutDateFULL.getMonth() + 1;
    let checkinDay = checkInDateFULL.getDate();
    let checkoutDay = checkOutDateFULL.getDate();

    //final dates of checkin and checkout
    let checkInDateFinal =
      checkinYear +
      (checkinMonth > 9 ? "-" : "-0") +
      checkinMonth +
      "-" +
      checkinDay;

    let checkOutDateFinal =
      checkoutYear +
      (checkoutMonth > 9 ? "-" : "-0") +
      checkoutMonth +
      "-" +
      checkoutDay;

    let userDetail = {
      firstName: usersdata.firstName,
      lastName: usersdata.lastName,
      email: usersdata.email,
      checkIn: usersdata.checkIn,
      checkOut: usersdata.checkOut,
    };
    // console.log(" SEARCH FORM EMAIL:", useremail);



    if (usersdata.email == userEmail) {
      try {
        await axios.put(
          `http://localhost:5000/user/updateUserDetails/${userFinalId}`,
          userDetail
        );

        props.history.push(`/allRooms?checkIn=${checkInDateFinal}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        // const res = await axios.post(
        //   "http://localhost:5000/user/addUserDetails",
        //   userDetail
        // );
        const res = await postUsersData(userDetail);
        //  console.log("post user details CONTEXT", res);
        let userId = res._id;
        // console.log("USER ID IN SEARCHFORM", userId);

        localStorage.setItem("UserId", JSON.stringify(userId));
      } catch (err) {
        console.log(err);
      }
      props.history.push(`/allRooms?checkIn=${checkInDateFinal}`);
    }
  };

  return (
    <div>
      <Container className={classes.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Paper className={classes.paper1}>
              <Box className={classes.sideImageBox}>
                <div className={classes.searchBoxImagecontainer}>
                  <img
                    className={classes.halfpaneImage}
                    src={process.env.PUBLIC_URL + "/images/beech.jpg"}
                  />
                  <Typography variant="h6" className={classes.bookRoomTitle}>
                    Stay with Us! Go Grab Amazing Rooms!
                  </Typography>
                </div>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Paper className={classes.paper}>
              <Box className={classes.searchBox}>
                <form
                  className={classes.root}
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <Typography variant="h4" className={classes.bookRoomTitle}>
                    Book Your Room
                  </Typography>
                  <div className={classes.formFields}>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="FirstName"
                        name="firstName"
                        value={usersdata.firstName}
                        onChange={handleInputChange}
                        variant="outlined"
                        type="text"
                        className={classes.textfieldWidth}
                      />
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="LastName"
                        name="lastName"
                        value={usersdata.lastName}
                        onChange={handleInputChange}
                        variant="outlined"
                        type="text"
                        className={classes.textfieldWidth}
                      />
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        name="email"
                        value={usersdata.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        className={classes.textfieldWidth}
                      />
                    </div>

                    <div>
                      <DatepickerField
                        name="checkIn"
                        label="Check In Date"
                        value={usersdata.checkIn}
                        onchange={handleInputChange}
                        className={classes.textfieldWidth}
                      />
                    </div>

                    <div>
                      <DatepickerField
                        name="checkOut"
                        label="Check Out Date"
                        value={usersdata.checkOut}
                        onchange={handleInputChange}
                        className={classes.textfieldWidth}
                      />
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        className={classes.searchButton}
                        type="submit"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </form>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default withRouter(SearchForm);

// const [userData, setUserData] = useState();
// useEffect(() => {
//     // get call for User
//     axios
//     .get(`http://localhost:5000/user/getUser/${userFinalId}`)
//     .then((response) => {
//         console.log("Response:", response.data);
//       //   let usersData = response.data;
//         setFormData(response.data);
//       //   console.log("Get request response:", formData);
//               setuserEmail(response.data.email);
//       })
//       .catch((err) => {
//           console.log("Error:", err);
//       });
//   }, []);
