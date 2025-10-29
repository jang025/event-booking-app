// pages/ConfirmationPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/bookingService.js";
import Confirmation from "../components/ConfirmationTicket.jsx";
import { useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const data = await getBooking(bookingId);
        setBooking(data);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [bookingId]);
  const handleClick = () => {
    navigate(`/homepage`);
  }

  if (!booking) return <p>Loading confirmation…</p>;

  return (
    <section>
      <h2>Booking Confirmation</h2>
      <p><b>Booking ID:</b> {booking._id}</p>
      <p><b>Status:</b> {booking.status}</p>
      <Confirmation booking={booking}/>
      <button onclick={handleClick}>HomePage</button>
    </section>
  );
}
