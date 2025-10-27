import { useState } from "react";

export default function UserBookingDetails({ summary, onConfirm }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  
  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (onConfirm) onConfirm({ ...summary, attendee: form });
  };

  return (
    <section>
      <h1>Booking</h1>

      <h2>Booking Summary</h2>
      <dl>
        <div>
          <dt>Event</dt>
          <dd>{summary?.event?.title || "Event Title"}</dd>
        </div>
        <div>
          <dt>Ticket</dt>
          <dd>{summary?.ticketCount ?? 1}</dd>
        </div>
        {(summary?.ticketTypes || []).map((t, i) => (
          <div key={i}>
            <dt>{`Ticket-${i + 1} type`}</dt>
            <dd>{t}</dd>
          </div>
        ))}
      </dl>

      <h3>Your Details</h3>
      <form onSubmit={submit}>
        <div>
          <label>
            Name
            <input name="name" value={form.name} onChange={change} required />
          </label>
        </div>
        <div>
          <label>
            Phone number
            <input name="phone" value={form.phone} onChange={change} required />
          </label>
        </div>
        <div>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={change} required />
          </label>
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </section>
  );
}
