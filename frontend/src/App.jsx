import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Eventcard from "./components/Eventcard.jsx";
import BookTicketPage from "./pages/BookTicketPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import EventListPage from "./pages/EventListPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";

import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [available, setAvailable] = useState(true);
  // const [ongoing, setOngoing] = useState(true);
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState(null);

  //! always rendering all routes, but protect access inside the page components

  return (
    <main>
      <NavBar  userId = {userId} />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/login"
          element={<LoginPage setToken={setToken} setUserId={setUserId} />}
        />
        <Route
          path="/eventlist"
          element={
            <EventListPage
              setEventId={setEventId}
              setSelectedEvent={setSelectedEvent}
            />
          }
        />
        <Route
          path="/event/:eventId"
          element={<EventDetailsPage setEventId={setEventId} />}
        />

        <Route
          path="/users/:userId"
          element={<ProfilePage token={token} userId={userId} />}
        />
        <Route
          path="/users/:userId/edit"
          element={<EditProfilePage token={token} userId={userId} />}
        />
        <Route
          path="/book/:eventId"
          element={
            <BookTicketPage eventId={eventId} token={token} userId={userId} />
          }
        />
        <Route
          path="/book/:eventId/:bookingId"
          element={<ConfirmationPage token={token} userId={userId} />}
        />
      </Routes>
    </main>
  );
};

export default App;
