// pages/BookTicketPage.jsx
import { useNavigate } from "react-router-dom";
import BookTickets from "../components/BookTickets";

export default function BookTicketPage({eventId}) {
  const navigate = useNavigate();

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
