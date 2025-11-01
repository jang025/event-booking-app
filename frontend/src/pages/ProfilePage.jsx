import { useEffect, useState } from "react";
import ProfileBookingList from "../components/ProfileBookingList";
import { show } from "../services/userService";
import { useNavigate } from "react-router";

function ProfilePage({ userId, token }) {
  const [user, setUser] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const navigate = useNavigate();
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
        setUpcomingBookings(data.upcomingBookings);
        setPastBookings(data.pastBookings);
      }
    };
    if (userId && token) fetchProfile();
  }, [userId, token, navigate]);
  if (!user) return <p>Loading profile...</p>;
  return (
    <div>
      <h1>My Profile</h1>
      {/* profile details */}

      <div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <button type="submit">Edit Profile</button>
      </div>

      {/* Upcoming Bookings */}
      <div>
        <h2>Upcoming Bookings</h2>
        <ProfileBookingList bookings={upcomingBookings} token={token} />
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
