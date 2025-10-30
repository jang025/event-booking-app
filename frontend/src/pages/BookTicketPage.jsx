// pages/BookTicketPage.jsx
import { useNavigate } from "react-router-dom";
import BookTickets from "../components/BookTickets";
import { useParams } from "react-router-dom";

export default function BookTicketPage() {
  const navigate = useNavigate();
  const eventId = useParams().eventId;
  const handleBooked = (bookingId) => {
    console.log("Navigating to /book/" + bookingId);
    navigate(`/book/${eventId}/${bookingId}`);
  };

  return (
    <main>
      <BookTickets eventId={eventId} onBooked={handleBooked} />
    </main>
  );
}
