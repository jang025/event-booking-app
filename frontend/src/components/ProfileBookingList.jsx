import ProfileBookingCard from "./ProfileBookingCard";

function ProfileBookingList({ bookings, token }) {
  if (bookings.length === 0) return <p>No bookings found.</p>;
  return (
    <div>
      {bookings.map((booking) => (
        <ProfileBookingCard key={booking.id} {...booking} token={token} />
      ))}
    </div>
  );
}

export default ProfileBookingList;
