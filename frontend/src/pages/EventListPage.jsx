import React from "react";
import { sampleEvents } from "../data/sampleEvents.js";
import Eventcard from "../components/Eventcard.jsx";

export default function EventListPage() {
  return (
    <div>
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
