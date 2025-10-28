import { useState } from "react";
import AuthForm from "../components/AuthForm";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `${baseUrl}/api/auth/signup`;
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthForm
      title="Create Account"
      buttonText="Sign Up"
      redirectText="Already have an account?"
      redirectLink="/login"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
    />
  );
}

export default SignupPage;
