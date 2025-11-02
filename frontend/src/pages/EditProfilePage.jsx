import { Link, useNavigate } from "react-router";
import EditForm from "../components/EditForm";
import { useEffect } from "react";

function EditProfilePage({ userId, token }) {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect to login if not authenticated
    if (!token || !userId) {
      navigate("/login");
    }
  }, [token, userId, navigate]);
  return (
    <div>
      <h1>Edit Profile</h1>
      <EditForm userId={userId} token={token} />
      <Link to={`/users/${userId}`}>Back to Profile</Link>
    </div>
  );
}

export default EditProfilePage;
