import ProfileBookingCard from "./ProfileBookingCard";

const bookings = [
  {
    id: 1,
    eventName: "Coldplay Concert",
    date: "2025-11-01",
    location: "Singapore Indoor Stadium",
  },
  {
    id: 2,
    eventName: "Taylor Swift Tour",
    date: "2025-12-12",
    location: "National Stadium",
  },
];

function ProfileBookingList() {
  return (
    <div>
      {bookings.map((booking) => (
        <ProfileBookingCard key={booking.id} {...booking} />
      ))}
    </div>
  );
}

export default ProfileBookingList;
