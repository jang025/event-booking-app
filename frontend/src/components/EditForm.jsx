import { useState } from "react";
import { useNavigate } from "react-router";
import { update } from "../services/userService";

function EditForm({ userId, token }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await update(user, userId, token);
    console.log(response);
    // navigate back to profile page after submitting the form
    navigate(`/users/${userId}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">New Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Enter new username"
        />
      </div>

      <div>
        <label htmlFor="password">New Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
        />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditForm;
