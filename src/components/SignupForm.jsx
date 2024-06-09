/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Signup.module.css";
import Button from "./Button";
import CheckBox from "./CheckBox";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error,setError] = useState("");
  const [loading,setloading] = useState("");

  const {signup}=useAuth()
  const navigate = useNavigate();


  async function handleSignup(e){
    e.preventDefault();
    //
    //
    if(password!==confirm){
      return setError("password don't match");
    }


    try {
      setError("");
      setloading(true);
      await signup(email,password,name);
      navigate("/");
    } catch (error) {
      setloading(false);
      console.log(error.message);
      setError("Failed to Creat an account!");
    }

  }

  
  return (
    <form className={`${classes.Signup} form`} onSubmit={handleSignup}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        required
        value={confirm}
        onChange={(e) => {
          setConfirm(e.target.value);
        }}
      />
      <CheckBox type="checkbox" required text="  i agree with terms and condition" />
      <Button type="submit" disabled={loading} style={{ width: "100%" }}>
        <span>Create Account</span>
      </Button>
      {error&&<p className="error" >{error}</p>}
      <div className="info">
        Already have an account? <Link to="/Login">Login</Link> instead.
      </div>
    </form>
  );
}
