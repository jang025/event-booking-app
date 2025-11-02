// components/BookTickets.jsx
import { useEffect, useState } from "react";
import { eventData, bookTickets } from "../services/bookingService.js";

export default function BookTickets({ eventId, onBooked, userId }) {
  const [eventInfo, setEventInfo] = useState(null);
  const [count, setCount] = useState(1);
  const [types, setTypes] = useState([""]);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await eventData(eventId);
        setEventInfo(data);

        let firstTier = "";
        if (data && data.tiers && data.tiers.length > 0) {
          firstTier = data.tiers[0].tierName;
        }
        setTypes([firstTier]);
      } catch (err) {
        console.error("Failed to load event:", err.message);
      }
    }

    if (eventId) loadEvent();
  }, [eventId]);

  if (!eventInfo) {
    return <p> choose a event to book</p>;
  }

  const ticketOptions = [];
  if (eventInfo.tiers && eventInfo.tiers.length > 0) {
    for (let i = 0; i < eventInfo.tiers.length; i++) {
      ticketOptions.push(eventInfo.tiers[i].tierName);
    }
  }

  const defaultType = ticketOptions.length > 0 ? ticketOptions[0] : "Entry";

  function clamp(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
  }

  function changeCount(delta) {
    const next = clamp(count + delta, 1, 10);
    setCount(next);

    setTypes((prev) => {
      const copy = prev.slice(0, next);
      while (copy.length < next) {
        copy.push(defaultType);
      }
      return copy;
    });
  }

  function changeType(index, value) {
    const copy = types.slice();
    copy[index] = value;
    setTypes(copy);
  }

  function getUnitPriceByTier(tierName) {
    if (!eventInfo.tiers) return 0;
    for (let i = 0; i < eventInfo.tiers.length; i++) {
      const t = eventInfo.tiers[i];
      if (t.tierName === tierName) {
        return t.unitPrice || 0;
      }
    }
    return 0;
  }

  async function handleBook() {
    const group = {};
    for (let i = 0; i < types.length; i++) {
      const name = types[i];
      if (group[name] === undefined) {
        group[name] = 1;
      } else {
        group[name] = group[name] + 1;
      }
    }

    const items = [];
    for (const tierName in group) {
      const qty = group[tierName];
      const unitPrice = getUnitPriceByTier(tierName);
      const totalCost = unitPrice * qty;

      items.push({
        tierName: tierName,
        unitPrice: unitPrice,
        quantity: qty,
        totalCost: totalCost,
      });
    }

    const body = {
      userId: userId, 
      eventId: eventInfo._id,
      items: items,
      status: "confirmed",
      booking_date: new Date().toISOString(),
    };

    try {
      const created = await bookTickets(body);
      console.log("Created booking:", created);

      let id = null;
      if (created && created._id) id = created._id;
      else if (created && created.id) id = created.id;
      else if (created && created.bookingId) id = created.bookingId;

      if (!id) {
        alert("Booking created but no id returned from the server.");
        return;
      }

      if (onBooked) onBooked(id);
    } catch (err) {
      console.error("Booking failed:", err.message);
      alert("Booking failed. Please try again.");
    }
  }

  return (
    <section>
      <h1>{eventInfo.short_title ? eventInfo.short_title : "Event Title"}</h1>
      <h2>{eventInfo.long_title ? eventInfo.long_title : "Event Title"}</h2>
      <img
        src={eventInfo.event_image || eventInfo.image_url || "placeholder.jpg"}
        alt={eventInfo.short_title || "Event"}
        style={{ maxWidth: "300px", borderRadius: "8px" }}
      />
      {/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString */}
      {eventInfo.start_date_time && eventInfo.end_date_time ? (
        <div>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(eventInfo.start_date_time).toDateString() ===
            new Date(eventInfo.end_date_time).toDateString()
              ? new Date(eventInfo.start_date_time).toLocaleDateString()
              : `${new Date(
                  eventInfo.start_date_time
                ).toLocaleDateString()} — ${new Date(
                  eventInfo.end_date_time
                ).toLocaleDateString()}`}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {new Date(eventInfo.start_date_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            to{" "}
            {new Date(eventInfo.end_date_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ) : (
        <p>Date and time not available</p>
      )}
      <div style={{ margin: "1em 0" }}>
        <span>Tickets: </span>
        <button onClick={() => changeCount(-1)}>-</button>
        <span> {count} </span>
        <button onClick={() => changeCount(1)}>+</button>
      </div>

      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <label>
            Ticket {i + 1} Type:{" "}
            <select
              value={types[i] ? types[i] : defaultType}
              onChange={(e) => changeType(i, e.target.value)}
            >
              {ticketOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}

      <button onClick={handleBook}>Book Now</button>
    </section>
  );
}
