import React from "react";
import { sampleEvents } from "../data/sampleEvents.js";
import Eventcard from "../components/Eventcard.jsx";

export default function EventListPage() {
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
      {/* list of events container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "160px",
          gap: "15px",
        }}
      >
        {sampleEvents.map((event, i) => (
          <Eventcard key={i} event={event} />
        ))}
      </div>
    </div>
  );
}
