import LandingPage from "./Pages/LandingPage/LandingPage";
import { Route, Switch } from "react-router-dom";
import RoomSearch from "./Pages/RoomSearchPage/RoomSearch";
import Error from "./Components/Error/Error";
import AvailableRooms from "./Pages/AvailableRoomsPage/AvailableRooms";
import RoomDetails from "./Pages/RoomDetailPage/RoomDetails";
import Receipt from "./Components/RoomReceipt/Receipt";


function App() {
  return (
   <div>
    <Switch>
     {/* <LandingPage/> */}
     <Route path='/' component={LandingPage} exact />
     <Route path='/roomSearch' component={RoomSearch} exact />
     <Route path='/allRooms' component={AvailableRooms} exact />
     <Route path='/room-booking-receipt' component={Receipt} exact />
     <Route path='/getRoom/:id' component={RoomDetails} exact />
     <Route component={Error} />
     </Switch>
   </div>
  );
}

export default App;
