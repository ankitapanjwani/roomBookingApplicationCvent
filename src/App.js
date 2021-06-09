import LandingPage from "./Pages/LandingPage/LandingPage";
import { Route, Switch } from "react-router-dom";
import RoomSearch from "./Pages/RoomSearchPage/RoomSearch";
import Error from "./Components/Error/Error";
import AvailableRooms from "./Pages/AvailableRoomsPage/AvailableRooms";
import RoomDetails from "./Pages/RoomDetailPage/RoomDetails";
import Receipt from "./Components/RoomReceipt/Receipt";
import { getUsersData } from "../src/services/axiosData";
import { useState, createContext, useEffect } from "react";
import { set } from "date-fns";

export const UserContext = createContext();

function App() {
  console.log("IN APP  JS FILE");
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    checkIn: new Date(),
    checkOut: new Date(),
  };
  const [usersFormData, setUsersFormdata] = useState(initialState);
  const [userEmail, setUserEmail] = useState('')
 

  let userFinalId = JSON.parse(localStorage.getItem("UserId"));
  // console.log("USER DATA:", usersFormData._id);

  useEffect(() => {
    (async function () {
      try {
        const responseUser = await getUsersData(userFinalId);

        setUsersFormdata(responseUser);
        console.log("RESPONSE USER IN APP JS", responseUser);
        setUserEmail(responseUser.email)
       
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
console.log("USER EMAIL IN APP JS:", userEmail);
  return (
    <div>
      <UserContext.Provider
        value={{
          usersData: [usersFormData, setUsersFormdata],
          userDataEmail: [userEmail, setUserEmail]
         
        }}
      >
        <Switch>
          {/* <LandingPage/> */}
          <Route path="/" component={LandingPage} exact />
          <Route path="/roomSearch" component={RoomSearch} exact />
          <Route path="/allRooms" component={AvailableRooms} exact />
          <Route path="/room-booking-receipt" component={Receipt} exact />
          <Route path="/getRoom/:id" component={RoomDetails} exact />
          <Route component={Error} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
