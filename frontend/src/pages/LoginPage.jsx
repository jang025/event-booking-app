import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { login } from "../services/authService";

function LoginPage({ setToken }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(user);
    console.log(response);
    setToken(response.token);
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
