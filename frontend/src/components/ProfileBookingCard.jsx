function ProfileBookingCard({
  eventName,
  date,
  location,
  onDelete,
  bookingId,
}) {
  return (
    <div>
      <p>{eventName}</p>
      <p>{date}</p>
      <p>{location}</p>
      {/* Only show if onDelete function is provided */}
      {onDelete && (
        <button onClick={() => onDelete(bookingId)}>Cancel Booking</button>
      )}
    </div>
  );
}

export default ProfileBookingCard;
