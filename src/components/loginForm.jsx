import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import From from "../components/Form";
import Instead from "../components/Instead";
import TextInput from "../components/TextInput";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Login.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setloading] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handlelogin(e) {
    e.preventDefault();
    //
    //
    

    try {
      setError("");
      setloading(true);
      await login(email, password);
      navigate("/");
      console.log("user succesfully logined");
    } catch (error) {
      setloading(false);
      console.log(error.message);
      setError("Failed to login!");
    }
  }
  return (
    <From classname={`${classes.login}`} onSubmit={handlelogin}>
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button type="submit" disabled={loading}>
        <span>Login now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <Instead>
        <Link to="/signup"> Signup </Link>
      </Instead>
    </From>
  );
}
