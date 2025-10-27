import { Route, Routes } from "react-router";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BookTicketPage from "./pages/BookTicketPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";

const App = () => {
  return (
    <main>
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path = "/book" element = {<BookTicketPage/>} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path= "/confirmation" element = {<ConfirmationPage/>} />
      </Routes>
    </main>
  );
};

export default App;
