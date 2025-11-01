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
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import { useState } from "react";

const App = () => {
  // const [available, setAvailable] = useState(true);
  // const [ongoing, setOngoing] = useState(true);
  const [eventId, setEventId] = useState("");
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // public routes
  if (token === null) {
    return (
      <main>
        {/* <NavBar /> */}
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/eventlist" element={<EventListPage />} />
          <Route
            path="/event/:eventId"
            element={<EventDetailsPage setEventId={setEventId} />}
          />
          <Route
            path="/book/:eventId"
            element={<BookTicketPage eventId={eventId} />}
          />
          <Route
            path="/book/:eventId/:bookingId"
            element={<ConfirmationPage />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/login"
            element={<LoginPage setToken={setToken} setUserId={setUserId} />}
          />
          <Route
            path="/users/:userId"
            element={<ProfilePage token={token} userId={userId} />}
          />
          <Route
            path="/users/:userId/edit"
            element={<EditProfilePage token={token} userId={userId} />}
          />
        </Routes>
      </main>
    );
  }
  // protected routes (require a token)
  return (
    <main>
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book" element={<BookTicketPage />} />
        <Route path="/eventlist" element={<EventListPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        {/* <Route path="/book" element={<BookTicketPage />}>
          <Route path=":bookingId" element={<ConfirmationPage />} />
        </Route> */}
        {/* <Route path="/users/:userId" element={<ProfilePage />} />
        <Route path="/users/:userId/edit" element={<EditProfilePage />} /> */}
      </Routes>
    </main>
  );
};

export default App;
