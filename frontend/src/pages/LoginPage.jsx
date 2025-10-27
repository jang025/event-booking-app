import { useState } from "react";
import AuthForm from "../components/AuthForm";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "simon",
    password: "321",
    email: "simon111@hotmail.com",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("login successful");
  };

  return (
    <AuthForm
      title="Welcome Back"
      buttonText="Login"
      redirectText="Don't have an account?"
      redirectLink="/signup"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
    />
  );
}

export default LoginPage;
