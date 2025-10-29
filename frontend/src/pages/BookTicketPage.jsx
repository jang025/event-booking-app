// pages/BookTicketPage.jsx
import { useNavigate } from "react-router-dom";
import BookTickets from "../components/BookTickets";

export default function BookTicketPage() {
  const navigate = useNavigate();
  const eventId = "68ff71f2254ba4d090ac5dc5"; // eventId will be taken event details by statelift add props

  const handleBooked = (bookingId) => {
    console.log("Navigating to /book/" + bookingId);
    navigate(`/book/${bookingId}`);
  };

  return (
    <main>
      <BookTickets eventId={eventId} onBooked={handleBooked} />
    </main>
  );
}
