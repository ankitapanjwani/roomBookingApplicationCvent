import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box, Container, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import DatepickerField from "../Datepicker/DatepickerField";
import { useStyles } from "../SearchForm/SearchForm.style";
import {getUsersData} from '../../services/axiosData';



const initialState = {
    firstName:'',
    lastName: '',
    email: '',
    checkIn: new Date(),
    checkOut: new Date(),
  };
function SearchForm(props) {
  const classes = useStyles();
  
  
  const [formData, setFormData] = useState(initialState);
  const[useremail,setuserEmail] = useState('');
  let userFinalId=  JSON.parse(localStorage.getItem('UserId'));



    useEffect(() => {
      (async function () {

        try{

          const response = await getUsersData(userFinalId);
          console.log("data in search form",response);
          setFormData(response);
          setuserEmail(response.email);
        }
        catch(error){
            console.log(error);
        }
      })();
    }, []);
    
    console.log("user data from setdata", formData);

  const handleInputChange = (event) => {
    // event.persist();
    const key = event.target.name;
    const value = event.target.value;
    // const date = date;
    setFormData((inputs) => ({
      ...inputs,
      [key]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("In handle submit");
    console.log("form", formData);

    let checkInDateFULL = new Date(formData.checkIn);
    let checkOutDateFULL = new Date(formData.checkOut);
  
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
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        checkIn: checkInDateFinal,
        checkOut: checkOutDateFinal,
      };
      
    if(formData.email === useremail){
        console.log("in IF BLOCK");
        try {
            const res = await axios.put(
              `http://localhost:5000/user/updateUserDetails/${userFinalId}`,
              userDetail
            );
                    console.log("User updated details", res.data);
                    props.history.push(`/allRooms?checkIn=${checkInDateFinal}`);

              } catch (err) {
            console.log(err);
          }
    }
    
      else{
console.log("In else ");
    try {
      const res = await axios.post(
        "http://localhost:5000/user/addUserDetails",
        userDetail
      );

    //   setDataId(res.data._id);
      let userId = res.data._id;
      console.log("res of user  id Details", res.data._id);
      console.log("res of user Details", res.data);

        localStorage.setItem('UserId',JSON.stringify(userId));

      props.history.push(`/allRooms?checkIn=${checkInDateFinal}`);
    } catch (err) {
      console.log(err);
    }
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
                  <Typography variant="h6" className={classes.bookRoomTitle}>Stay with Us! Go Grab Amazing Rooms!</Typography>
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
                  <Typography variant="h4" className={classes.bookRoomTitle}>Book Your Room</Typography>
                  <div className={classes.formFields}>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="FirstName"
                        name="firstName"
                        value={formData.firstName}
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
                        value={formData.lastName}
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
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        className={classes.textfieldWidth}
                      />
                    </div>

                    <div>
                      <DatepickerField
                        name="checkIn"
                        label="Check In Date"
                        value={formData.checkIn}
                        onchange={handleInputChange}
                        className={classes.textfieldWidth}
                      />
                    </div>

                    <div>
                      <DatepickerField
                        name="checkOut"
                        label="Check Out Date"
                        value={formData.checkOut}
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