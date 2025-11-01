import ProfileBookingCard from "./ProfileBookingCard";

function ProfileBookingList({ bookings, onDelete }) {
  if (bookings.length === 0) return <p>No bookings found.</p>;
  return (
    <div>
      {bookings.map((booking) => (
        <ProfileBookingCard
          key={booking._id}
          onDelete={onDelete}
          eventName={booking.eventName}
          date={booking.date}
          location={booking.location}
          bookingId={booking._id}
        />
      ))}
    </div>
  );
}

export default ProfileBookingList;
