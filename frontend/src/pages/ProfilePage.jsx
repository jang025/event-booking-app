import { useEffect, useState } from "react";
import ProfileBookingList from "../components/ProfileBookingList";
import { remove, show } from "../services/userService";
import { Link, useNavigate } from "react-router";

function ProfilePage({ userId, token }) {
  const [user, setUser] = useState(null);
  // const [upcomingBookings, setUpcomingBookings] = useState([]);
  // const [pastBookings, setPastBookings] = useState([]);
  const navigate = useNavigate();
  // Fake bookings
  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      _id: "b001",
      eventName: "Coldplay Concert",
      date: "2025-11-20",
      location: "Singapore Indoor Stadium",
      status: "upcoming",
      items: [
        { tierName: "VIP", quantity: 2 },
        { tierName: "Standard", quantity: 1 },
      ],
    },
    {
      _id: "b002",
      eventName: "Taylor Swift Tour",
      date: "2025-12-12",
      location: "National Stadium",
      status: "upcoming",
      items: [{ tierName: "Standard", quantity: 3 }],
    },
  ]);

  const [pastBookings, setPastBookings] = useState([
    {
      _id: "b003",
      eventName: "Ed Sheeran Live",
      date: "2025-09-15",
      location: "Marina Bay Sands",
      status: "past",
      items: [{ tierName: "VIP", quantity: 1 }],
    },
    {
      _id: "b004",
      eventName: "Imagine Dragons Concert",
      date: "2025-08-30",
      location: "Singapore Indoor Stadium",
      status: "past",
      items: [{ tierName: "Standard", quantity: 2 }],
    },
  ]);
  useEffect(() => {
    // If no token or userId, redirect to login page (protected page)
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      const data = await show(userId, token);
      console.log(data);
      if (data) {
        setUser(data.user);
        // setUpcomingBookings(data.upcomingBookings);
        // setPastBookings(data.pastBookings);
      }
    };
    if (userId && token) fetchProfile();
  }, [userId, token, navigate]);

  const handleDelete = async (bookingId) => {
    //! delete the booking with the bookingId and the valid token
    await remove(bookingId, token);
    //! update with new state
    setUpcomingBookings((updatedBookings) =>
      updatedBookings.filter((bookings) => bookings._id !== bookingId)
    );
  };
  if (!user) return <p>Loading profile...</p>;
  return (
    <div>
      <h1>My Profile</h1>
      {/* profile details */}

      <div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <Link to={`/users/${userId}/edit`}>
          <button type="button">Edit Profile</button>
        </Link>
      </div>

      {/* Upcoming Bookings */}
      <div>
        <h2>Upcoming Bookings</h2>
        <ProfileBookingList
          bookings={upcomingBookings}
          onDelete={handleDelete}
        />
      </div>
      {/* Past Bookings  */}
      <div>
        <h2>Past Bookings</h2>
        <ProfileBookingList bookings={pastBookings} />
      </div>
    </div>
  );
}

export default ProfilePage;
