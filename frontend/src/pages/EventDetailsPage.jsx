import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function EventDetailsPage() {
  const [events, setEvents] = useState([]);
  const { eventId } = useParams();
  async function getData(id) {
    const url = `http://localhost:3000/api/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setEvents([result]);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    console.log("eventid:", eventId);
    if (eventId) getData(eventId);
  }, [eventId]);

  useEffect(() => {
    if (eventId) getData(eventId);
  }, [eventId]);

  return (
    <div>
      {/* search bar */}
      <div>
        <input type="text" placeholder="Search events" />
        <button>🔍</button>
      </div>

      {/* image */}
      <div>
        <p>image</p>
        <button>→</button>
      </div>

      {/* event details */}
      {events.map((event) => (
        <div key={event._id}>
          <h2>{event.long_title}</h2>
          <p>{event.event_short_description}</p>
          <p>{event.status}</p>

          <h3>Date and Time</h3>
          <p>
            {new Date(event.start_time).toLocaleString()} —{" "}
            {new Date(event.end_time).toLocaleString()}
          </p>

          <h3>Location</h3>
          <p>{event.venue}</p>
          <p>{event.address}</p>

          <h3>Organised by</h3>
          <div>
            <div>○</div>
            <div>
              <p>{event.organiser_name}</p>
              <p>{event.organiser_description}</p>
            </div>
            <a href={`mailto:${event.organiser_email}`}>email</a>
          </div>

          <h3>Details</h3>
          <p>{event.event_long_description}</p>

          <button>Get Tickets</button>

          <hr />
        </div>
      ))}
    </div>
  );
}
