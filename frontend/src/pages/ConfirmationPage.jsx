import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooking, eventData } from "../services/bookingService.js";
import Confirmation from "../components/ConfirmationTicket.jsx";

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getBooking(bookingId);
        setBooking(data);
      } catch (e) {
        console.error("Error fetching booking:", e.message);
      }
    })();
  }, [bookingId]);

  useEffect(() => {
    if (!booking?.eventId) return;
    (async () => {
      try {
        const data = await eventData(booking.eventId);
        setEvent(data);
      } catch (e) {
        console.error("Error fetching event:", e.message);
      }
    })();
  }, [booking]);

  const handleClick = () => navigate("/homepage");

  if (!booking) return <p>Loading confirmation…</p>;

  return (
    <section>
      <h2>Booking Confirmation</h2>
      <h3>{event?.long_title || "Event Title"}</h3>
      <p>
        <b>Booking ID:</b> {booking._id}
      </p>
      <p>
        <b>Status:</b> {booking.status}
      </p>

      <Confirmation booking={booking} />

      <button onClick={handleClick}>HomePage</button>
    </section>
  );
}
