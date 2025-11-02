import { Link } from "react-router";
import EditForm from "../components/EditForm";

function EditProfilePage({ userId, token }) {
  return (
    <div>
      <h1>Edit Profile</h1>
      <EditForm userId={userId} token={token} />
      <Link to={`/users/${userId}`}>Back to Profile</Link>
    </div>
  );
}

export default EditProfilePage;
