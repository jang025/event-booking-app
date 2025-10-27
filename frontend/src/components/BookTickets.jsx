import { useState } from "react";

export default function BookTickets({ event = {}, onContinue }) {
  const [count, setCount] = useState(1);
  const [types, setTypes] = useState(["General"]);
  const ticketOptions = ["General", "Silver", "Gold", "VIP"];

  const changeCount = (delta) => {
    const next = Math.max(1, Math.min(10, count + delta));
    setCount(next);
    setTypes((prev) => {
      const copy = [...prev];
      if (next > copy.length) {
        while (copy.length < next) copy.push("General");
      } else if (next < copy.length) {
        copy.length = next;
      }
      return copy;
    });
  };

  const changeType = (i, value) => {
    setTypes((prev) => {
      const copy = [...prev];
      copy[i] = value;
      return copy;
    });
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue({
        event,
        ticketCount: count,
        ticketTypes: types,
      });
    }
  };

  return (
    <section>
      <h1>{event.title || "Event Title"}</h1>
      <div>image</div>

      <h2>Date and Time</h2>
      <p>{event.dateTime || "Saturday, November 1, 9am to 5pm"}</p>

      <div>
        <span>Choose number of Tickets </span>
        <button type="button" onClick={() => changeCount(-1)}>-</button>
        <span> {count} </span>
        <button type="button" onClick={() => changeCount(1)}>+</button>
      </div>

      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <label>
            {`Choose Ticket-${i + 1} Category `}
            <select
              value={types[i] || "General"}
              onChange={(e) => changeType(i, e.target.value)}
            >
              {ticketOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
        </div>
      ))}

      <button type="button" onClick={handleContinue}>Continue</button>
    </section>
  );
}
