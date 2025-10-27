import { useLocation, useNavigate, Link } from "react-router-dom";
import UserBookingDetails from "../components/UserBookingDetails.jsx";

export default function BookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <main>
        <p>No booking data found.</p>
        <Link to="/book">Go back to booking</Link>
      </main>
    );
  }

  const handleConfirm = (finalData) => {
    navigate("/confirmation", { state: finalData });
  };

  return (
    <main>
      <UserBookingDetails summary={state} onConfirm={handleConfirm} />
    </main>
  );
}
