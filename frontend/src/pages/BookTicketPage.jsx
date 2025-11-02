// pages/BookTicketPage.jsx
import { useNavigate } from "react-router-dom";
import BookTickets from "../components/BookTickets";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function BookTicketPage({ token, userId }) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  console.log("token:", token);
  console.log("userId:", userId);
//   useEffect(() => {
//     // Protect this page
//     if (!token || !userId) {
//       navigate("/login");
//     }
//   }, [token, userId, navigate]);

  const handleBooked = (bookingId) => {
    console.log("Navigating to /book/" + bookingId);
    navigate(`/book/${eventId}/${bookingId}`);
  };

  return (
    <main>
      <BookTickets eventId={eventId} onBooked={handleBooked} userId = {userId}/>
    </main>
  );
}
