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
    <div>
      <button onClick={prev}>previous</button>
      <img
        src={eventImages[index]}
        alt="event"
        style={{ height: "380px", padding: "20px" }}
      />
      <button onClick={next}>next</button>
    </div>
  );
}
