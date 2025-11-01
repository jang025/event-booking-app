function ProfileBookingCard({ _id, eventName, date, location, status, token }) {
  return (
    <div>
      <p>{eventName}</p>
      <p>{date}</p>
      <p>{location}</p>
      <p>{status}</p>
      <button type="submit">Cancel Booking</button>
    </div>
  );
}

export default ProfileBookingCard;
