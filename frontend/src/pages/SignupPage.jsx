import { useState } from "react";
import AuthForm from "../components/AuthForm";

function SignupPage() {
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
    console.log("signup successful");
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
