// import { sampleEvents } from "../data/sampleEvents.js";

export default function Eventcard({ event }) {
  // function receives event object, stores it in a variable named event

  const {
    _id,
    short_title,
    long_title,
    event_image,
    start_date_time,
    end_date_time,
    venue,
    tiers,
    status,
  } = event;

  // formats date to be shown on card to Sat, Nov 1, 9 AM
  const formatted = new Date(start_date_time).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: undefined,
    hour12: true,
  });

  // showing the lowest price in the card
  let lowestPrice = "FREE";

  if (tiers && tiers.length > 0) {
    const minPrice = Math.min(...tiers.map((tier) => tier.unitPrice));
    lowestPrice = minPrice === 0 ? "FREE" : `from $${minPrice}`;
  }

  return (
    <>
      <a href={`/event/${_id}`} className="placecardlink">
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
                height: "130px",
                borderRadius: "8px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <div style={{ flex: 1, width: "100%" }}>
            <h2 style={{ margin: 3 }}>{long_title}</h2>
            <p style={{ margin: 3 }}>{formatted}</p>
            <p style={{ margin: 3 }}>{venue}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                margin: 0,
                flexDirection: "row",
              }}
            >
              <p style={{ margin: 3 }}>{lowestPrice}</p>
              <p style={{ margin: 3 }}>{status}</p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
