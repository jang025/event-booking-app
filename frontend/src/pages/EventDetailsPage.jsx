//useEffect again but only to show details of thate vent only

import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCarousel from "../components/EventCarousel";


export default function EventDetailsPage({ selectedEvent }) {
  const { eventId } = useParams();
  const [event, setEvent] = useState(selectedEvent || null);
  const navigate = useNavigate();

  console.log("event id from url is:", eventId);
  console.log("props received in EventDetailsPage:", selectedEvent);
  console.log("event", { event });

  // async function getData(id) {
  //   const url = `http://localhost:3000/api/${id}`;
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log(result);
  //     setEvent(result);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  useEffect(() => {
    // if no event was passed, fetch it
    if (!selectedEvent && eventId) {
      fetch(`http://localhost:3000/api/${eventId}`)
        .then((res) => res.json())
        .then((data) => setEvent(data))
        .catch((err) => console.error(err));
    }
  }, [eventId, selectedEvent]);

  if (!event) return <p>Loading event details...</p>;
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

  // async function getData(id) {
  //   const url = `http://localhost:3000/api/${id}`;
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log(result);
  //     setEvent(result);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  //   useEffect(() => {
  //     if (eventId) getData(eventId);
  //   }, [eventId]);

  const handleChange = () => {
    navigate(`/book/${eventId}`);
  };
  return (
    <div>
      {/* search bar */}
      <div>
        <input type="text" placeholder="Search events" />
        <button>🔍</button>
      </div>

      {/* image */}
      <div>
        {event.event_image && event.event_image.length > 0 && (
          <EventCarousel eventImages={event.event_image} />
        )}
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
          <p style={{ margin: 0 }}>{event.venue}</p>
          <p style={{ margin: "2px 0 0 0" }}>{event.address}</p>

          {/* organiser information conoatiner */}
          <h3>Organised by</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <img
                src={event.organisation?.image}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 25px 0 0",
                }}
              />
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ margin: 0 }}>{event.organisation?.name}</p>
                <p style={{ margin: "2px 0 0 0" }}>
                  {event.organisation?.description}
                </p>
              </div>
              <div style={{ textAlign: "right", marginTop: "5px" }}>
                <a href={`mailto:${event.organiser_email}`}>email</a>
              </div>
            </div>
          </div>

          <h3>Details</h3>
          <p>{event.event_long_description}</p>

          <button onClick={handleChange}>Get Tickets</button>
          <hr />
        </div>
      )}
    </div>
  );
}
