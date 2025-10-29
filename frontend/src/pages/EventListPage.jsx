import React from "react";
// import { sampleEvents } from "../data/sampleEvents.js";
import Eventcard from "../components/Eventcard.jsx";
import { useState, useEffect } from "react";

export default function EventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/eventlist")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
    console.log("data has been fetched:", events);
  }, []);

  return (
    <div>
      {/* search bar */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 0 20px 0",
          width: "100%",
          height: "38px",
        }}
      >
        <input
          type="text"
          placeholder="Search events"
          style={{
            maxWidth: "350px",
            minWidth: "150px",
            width: "100%",
            height: "100%",
          }}
        ></input>
        <button
          style={{ height: "100%", padding: "0 16px", boxSizing: "border-box" }}
        >
          {" "}
          🔍{" "}
        </button>
      </div>

      {/* filter buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          height: "38px",
        }}
      >
        <button style={{ padding: "0 20px 0 20px" }}>Category ⌄</button>
        <button style={{ padding: "0 20px 0 20px" }}>
          Sort by: earliest first
        </button>
      </div>

      {/* list of events container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "160px",
          gap: "15px",
          alignContent: "center",
        }}
      >
        {events.map((event) => (
          <Eventcard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
