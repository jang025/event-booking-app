import { Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Eventcard from "./components/Eventcard.jsx";
import BookTicketPage from "./pages/BookTicketPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import EventListPage from "./pages/EventListPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import { useState } from "react";
// import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(null);
  // const [available, setAvailable] = useState(true)
  // const [ongoing, setOngoing] = useState(true)

  if (token === null) {
    return (
      <main>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/eventlist" element={<EventListPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/book" element={<BookTicketPage />} />
        <Route path="/book/:bookingId" element={<ConfirmationPage />} />
        </Routes>
      </main>
    );
  }
    // const [eventId, setEventId] = useState("68ff71f2254ba4d090ac5dc2");
 
  return (
    <main>
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/book" element={<BookTicketPage />}>
          <Route path=":bookingId" element={<ConfirmationPage />} />
        </Route> */}
        <Route path="/eventlist" element={<EventListPage />} />\
        <Route path="/users/:userId" element={<ProfilePage />} />
        <Route path="/users/:userId/edit" element={<EditProfilePage />} />
      </Routes>
    </main>
  );
};

export default App;
