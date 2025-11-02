import React, { useState, useEffect } from "react";
import EventListPage from "./EventListPage";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(null);

  // fetch api
  useEffect(() => {
    fetch("http://localhost:3000/api/eventlist")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);
  return (
    <div>
      {/* banner section */}
      {events.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            cursor: "pointer",
            padding: "0 10px 20px 10px",
          }}
        >
          <img
            src={events[0].event_image?.[0]} // shows first image of first event
            alt={events[0].long_title}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
      <EventListPage setEventId={setEventId} events={events} />
    </div>
  );
}
