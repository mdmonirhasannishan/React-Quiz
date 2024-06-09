/* eslint-disable react/prop-types */
import classes from "../styles/Form.module.css"
export default function Form({classname,children,...rest}){
    return(
        <form className={`${classname} ${classes.form}`} action="#" {...rest}>
              {children}
        </form>
    );

}