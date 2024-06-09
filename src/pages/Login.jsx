import Illustration from "../components/Illustrartion";
import LoginImage from "../assets/images/login.svg"
import LoginForm from "../components/loginForm";



export default function Signup(){

    return(
    <>
        <h1>Wellcome Back </h1>
        <div className="column">
            <Illustration image={LoginImage}/>
            <LoginForm/>
        </div>
    </>
    )
}