import ProfileBookingList from "../components/ProfileBookingList";

function ProfilePage() {
  return (
    <div>
      <h1>My Profile</h1>

      {/* profile details */}
      <div>
        <p>Username: johndoe</p>
        <p>Email: johndoe@example.com</p>
        <button type="submit">Edit Profile</button>
      </div>

      {/* My Bookings */}
      <div>
        <h2>My Bookings</h2>
        <ProfileBookingList />
      </div>
    </div>
  );
}

export default ProfilePage;
