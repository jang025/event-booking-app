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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      console.log("Login successful, backend response:", data);
    } catch (error) {
      console.error(error);
    }
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
