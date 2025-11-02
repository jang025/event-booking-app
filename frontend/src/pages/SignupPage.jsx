import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { signup } from "../services/authService";
import { useNavigate } from "react-router";

function SignupPage() {
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
    const response = await signup(user);
    console.log(response);
    // navigate to event list page
    navigate(`/`);
  };

  return (
    <AuthForm
      title="Create Account"
      buttonText="Sign Up"
      redirectText="Already have an account?"
      redirectLink="/login"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      user={user}
    />
  );
}

export default SignupPage;
