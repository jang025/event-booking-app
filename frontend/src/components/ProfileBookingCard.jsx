function ProfileBookingCard({ eventName, date, location }) {
  return (
    <div>
      <p>{eventName}</p>
      <p>{date}</p>
      <p>{location}</p>
      <button type="submit">Cancel Booking</button>
    </div>
  );
}

export default ProfileBookingCard;
