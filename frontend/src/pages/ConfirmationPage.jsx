import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooking, eventData } from "../services/bookingService.js";
import Confirmation from "../components/ConfirmationTicket.jsx";

export default function ConfirmationPage({ token, userId }) {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const bookingData = await getBooking(bookingId, token);
        setBooking(bookingData);

        if (bookingData?.eventId) {
          const eventDataResult = await eventData(bookingData.eventId, token);
          setEvent(eventDataResult);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [bookingId,token]);
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
