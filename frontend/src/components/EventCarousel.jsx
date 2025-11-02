import React, { useState } from "react";

export default function EventCarousel({ eventImages }) {
  console.log("eventImages:", eventImages);

  if (!Array.isArray(eventImages) || eventImages.length === 0) {
    return <p>No images available</p>;
  }

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => (i + 1 === eventImages.length ? 0 : i + 1));
  };

  const prev = () => {
    setIndex((i) => (i === 0 ? eventImages.length - 1 : i - 1));
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
      }}
    >
      <div>
        <button onClick={prev}>previous</button>
      </div>
      <div>
        <img
          src={eventImages[index]}
          alt="event"
          style={{
            width: "100%",
            height: "300px",
            margin: "20px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>
      <div>
        <button onClick={next}>next</button>
      </div>
    </div>
  );
}
