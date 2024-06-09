/* eslint-disable react/prop-types */

import classess from "../styles/Button.module.css";
import {useState,useRef} from "react"
import classes from "../styles/Prograce.module.css";
export default function ProgressBar({next , prev , submit , progress}) {
  console.log()
  const [tooltip,setTooltip] = useState(false);
  const tooltipRef = useRef();
  function toggleTooltip() {
    if(tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
      
    }else{
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = "block"
    }
  }
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={progress > 25 ? prev : null}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {progress}% Cimplete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggleTooltip}
            onMouseOut={toggleTooltip}
          ></div>
        </div>
      </div>

      <button
        className={`${classess.button} ${classes.next}`}
        onClick={progress === 100 ? submit : next}
        style={{ padding: "7px", margin: "0 7px 0 0" }}
      >
        
        <span>{progress === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </button>
    </div>
  );
}
