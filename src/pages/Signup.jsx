import Signupimage from "../assets/images/signup.svg";
import Illustration from "../components/Illustrartion";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <>
      <h1 style={{padding:"0 0 20px"}}>Create an account</h1>
      <div className="column">
        <Illustration image={Signupimage} />
        <SignupForm />
      </div>
    </>
  );
}
