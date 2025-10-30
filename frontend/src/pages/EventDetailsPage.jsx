import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function EventDetailsPage() {
  const [event, setEvent] = useState({});
  const { eventId } = useParams();
  const start = new Date(event.start_date_time);
  const end = new Date(event.end_date_time);
  //formatting the date
  if (start.toDateString() === end.toDateString()) {
    var formattedDate = `${start.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    })} — ${start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })} to ${end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else {
    // different days
    var formattedDate = `${start.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })} — ${end.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  async function getData(id) {
    const url = `http://localhost:3000/api/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setEvent(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    console.log("eventid:", eventId);
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
        {event?.event_image && (
          <img
            src={event.event_image}
            alt={event.long_title}
            style={{ width: "100%", maxWidth: "600px", borderRadius: "8px" }}
          />
        )}
        <button>→</button>
      </div>

      {/* event details */}
      {event && (
        <div key={event._id}>
          <h2>{event.long_title}</h2>
          <p>{event.event_short_description}</p>
          <p>{event.status}</p>

          <h3>Date and Time</h3>
          <p>{formattedDate}</p>

          <h3>Location</h3>
          <p>{event.venue}</p>
          <p>{event.address}</p>

          <h3>Organised by</h3>
          <div>
            <div>○</div>
            <div>
              <p>{event.organisation?.name}</p>
              <p>{event.organisation?.description}</p>
            </div>
            <a href={`mailto:${event.organiser_email}`}>email</a>
          </div>

          <h3>Details</h3>
          <p>{event.event_long_description}</p>

          <button>Get Tickets</button>
          <hr />
        </div>
      )}
    </div>
  );
}
