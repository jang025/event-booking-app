import { Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Eventcard from "./components/Eventcard.jsx";
import BookTicketPage from "./pages/BookTicketPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import EventListPage from "./pages/EventListPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import { useState } from "react";

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
        </Routes>
      </main>
    );
  }
  return (
    <main>
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book" element={<BookTicketPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/eventlist" element={<EventListPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/users/:userId" element={<ProfilePage />} />
        <Route path="/users/:userId/edit" element={<EditProfilePage />} />
      </Routes>
    </main>
  );
};

export default App;
