/* eslint-disable react/prop-types */
import { Fragment } from "react";
import classes from "../styles/Answers.module.css"
import CheckBox from "../components/CheckBox"
export default function Answers ({options = [] , handleChange ,input}) {
    return(
        <div className={classes.answers}>
           {options.map((option , index)=>{
            return (
              <Fragment key={index}>
                {input ? (
                <CheckBox
                  key={index}
                  className={classes.answer}
                  text={option.title}
                  value={index}
                  checked={option.checked}
                  onChange={(e) => handleChange(e, index)}
                />
                ) : (
                <CheckBox
                  key={index}
                  className={`${classes.answer} ${
                    option.correct
                      ? classes.correct
                      : option.checked
                      ? classes.wrong
                      : null
                  } `}
                  text={option.title}
                  defaultChecked={option.checked}
                  disabled
                />
                )}
              </Fragment>
            );
        
           })}
        </div>
    )
}