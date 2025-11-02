import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { login } from "../services/authService";
import { useNavigate } from "react-router";

function LoginPage({ setToken, setUserId }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(user);
    console.log(response);
    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", response.user._id);
    setToken(response.token);
    setUserId(response.user._id);
    // navigate to profile page
    navigate(`/users/${response.user._id}`);
  };

  return (
    <AuthForm
      title="Welcome Back"
      buttonText="Login"
      redirectText="Don't have an account?"
      redirectLink="/signup"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      user={user}
    />
  );
}

export default LoginPage;
