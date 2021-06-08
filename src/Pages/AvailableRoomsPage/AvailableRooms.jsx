import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import RoomsList from "../AllRoomsList/RoomsList";
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
function AvailableRooms(props) {
    let query = useQuery();

    const[allrooms, setallRooms] = useState([]);
    // const checkInDateFinal = props.match.params.checkIn;
    let checkInDateFinal = query.get("checkIn");
    console.log("Checkin date , IN available Room ", typeof(checkInDateFinal));
    // useEffect(() => {
    //     (async function () {
    //       const res = await axios.get(`http://localhost:5000/room/getRooms/${checkInDateFinal}`);
          
    //       setallRooms(res.data);
    //     })();
    //   }, []);

      useEffect(() => {
        console.log("in USEEFFECT");
        axios
          .get(`http://localhost:5000/room/getRooms/${checkInDateFinal}`)
          .then((res) => {
            console.log("Response Get in AllRooms:", res.data);
            setallRooms(res.data);;
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      }, []);

      console.log("Rooms after effect", allrooms);
      // debugger
    return (
        <React.Fragment>
            <Header/>
            <RoomsList rooms={allrooms}/>
            <Footer/>
        </React.Fragment>
    )
}

export default AvailableRooms
