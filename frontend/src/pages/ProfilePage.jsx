import { useEffect, useState } from "react";
import ProfileBookingList from "../components/ProfileBookingList";
import { remove, show , deleteUser} from "../services/userService";
import { Link, useNavigate } from "react-router";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
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

  const handleDelete = async (bookingId) => {
    //! delete the booking with the bookingId and the valid token
    await remove(bookingId, token);
    //! update with new state
    setUpcomingBookings((updatedBookings) =>
      updatedBookings.filter((bookings) => bookings._id !== bookingId)
    );
  };
  if (!user) return <p>Loading profile...</p>;
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  }
  const handleDeleteUser = async () => {
    await deleteUser(userId, token);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signup");
  }
  return (
    <div>
      <h1>My Profile</h1>
      <button onClick={handleSignOut}>Signout</button>
      <button onClick={handleDeleteUser}>Delete Account</button>
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
