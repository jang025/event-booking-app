import { Link } from "react-router-dom";

export default function ConfirmationTicket({ data = {} }) {
  const event = data.event || {};
  const attendee = data.attendee || {};

  return (
    <section>
      <h1>Confirmation Page</h1>
      <h2>{event.title || "Event Title"}</h2>

      <div>image</div>

      <dl>
        <div>
          <dt>Date and Time</dt>
          <dd>{event.dateTime || "Saturday, November 1, 9am to 5pm"}</dd>
        </div>

        <div>
          <dt>No. of Tickets</dt>
          <dd>{data.ticketCount ?? 1}</dd>
        </div>

        <div>
          <dt>Location</dt>
          <dd>
            {event.locationName || "Venue Name"}
            <br />
            {event.locationAddress || "Address Line"}
          </dd>
        </div>

        {attendee.name && (
          <div>
            <dt>Booked by</dt>
            <dd>
              {attendee.name} · {attendee.email} · {attendee.phone}
            </dd>
          </div>
        )}
      </dl>

      <Link to="/">
        <button type="button">Homepage</button>
      </Link>
    </section>
  );
}
