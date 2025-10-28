import React from "react";
import { sampleEvents } from "../data/sampleEvents.js";

export default function Eventcard({ event }) {
  //function receives event object, stores it in a variable named event

  const {
    short_title,
    long_title,
    event_image,
    start_time,
    end_time,
    venue,
    tiers,
    status,
  } = event;

  //formats date to be shown on card to Sat, Nov 1, 9 AM
  const formatted = new Date(start_time).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: undefined,
    hour12: true,
  });

  //to show the lowest price tier if tiers exist
  const lowestPrice = tiers && tiers.length > 0 ? tiers[0].price : null;

  return (
    <>
      <div
        style={{
          display: "inline-flex",
          alignItems: "flex-start",
          gap: "20px",
          maxWidth: "700px",
          borderStyle: "solid",
          verticalAlign: "top",
        }}
      >
        {/* image container */}
        <div style={{ flex: "0 0 250px" }}>
          <img
            src={event_image}
            alt={short_title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div>
          <h2 style={{ margin: 3 }}>{short_title}</h2>
          <p style={{ margin: 3 }}>{formatted}</p>
          <p style={{ margin: 3 }}>{venue}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 0,
            }}
          >
            <p style={{ margin: 3 }}>from ${lowestPrice}</p>
            <p style={{ margin: 3 }}>{status}</p>
          </div>
        </div>
      </div>
    </>
  );
}
