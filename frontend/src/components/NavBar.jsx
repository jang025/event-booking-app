import { Link } from "react-router-dom";

function NavBar() {
    const userId = localStorage.getItem("userId");
  return (
    <nav>
      <ul style={{ listStyle: "none", display: "flex", gap: "20px", margin: 0, padding: "10px" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/eventlist">Events</Link></li>
        <li><Link to="/login">SignIn</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        <li><Link to={`/users/${userId}`}>Profile</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
