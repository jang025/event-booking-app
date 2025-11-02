import React, { useState, useEffect } from "react";

export default function EventCarousel({ eventImages }) {
  console.log("eventImages:", eventImages);
  if (!Array.isArray(eventImages) || eventImages.length === 0) {
    return <p>No images available</p>;
  }

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => {
      if (i + 1 === eventImages.length) {
        //if we are at the last image
        console.log("index now:", 0);
        return 0; //show tthe first image
      } else {
        //if we are not on the last image
        console.log("index now:", i + 1); //show the next image
        return i + 1;
      }
    });
  };

  const prev = () => {
    setIndex((i) => {
      if (i === 0) {
        console.log("index now:", events.length - 1);
        return eventImages.length - 1; //go to the last image if you are on first image and you click previous
      } else {
        console.log("index now:", i - 1);
        return i - 1;
      }
    });
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
