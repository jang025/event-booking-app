import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooking, eventData } from "../services/bookingService.js";
import Confirmation from "../components/ConfirmationTicket.jsx";

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [event, setEvent] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Protect this page
    if (!token || !userId) {
      navigate("/login");
      return; // stop running fetch if user is not logged in
    }
  
    // 2. Fetch booking and event data
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
  }, [bookingId, token, userId, navigate]);
  
  const handleClick = () => navigate("/");

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

      <button onClick={handleClick }  style={{
    backgroundColor: "#404040ff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#5a5959ff")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "#424242ff")}>HomePage</button>
  
    </section>
  );
}
