/* eslint-disable react/prop-types */
import classes from "../styles/Illustration.module.css"
export default function Illustration({image}){

    return(
    <div className={classes.illustration}>
        <img src={image} alt="Signup" />
      </div>
    );
}