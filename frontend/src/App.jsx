import { Route, Routes } from "react-router";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Eventcard from "./components/Eventcard.jsx";
import { sampleEvents } from "./data/sampleEvents.js";

const App = () => {
  return (
    <main>
      <Eventcard event={sampleEvents[0]} />
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
};

export default App;
