import { Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Eventcard from "./components/Eventcard.jsx";
import BookTicketPage from "./pages/BookTicketPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import EventListPage from "./pages/EventListPage.jsx";
// import { useState } from "react";

const App = () => {
    // const [eventId, setEventId] = useState("68ff71f2254ba4d090ac5dc2");
 
  return (
    <main>
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book" element={<BookTicketPage/>} />
        <Route path="/eventlist" element={<EventListPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </main>
  );
};

export default App;
