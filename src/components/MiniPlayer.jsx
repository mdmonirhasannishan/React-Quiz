/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {useRef , useState} from "react"
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css"
export default function Miniplayer ({id,title}) {
    const buttonRef = useRef();
    const [status ,setStatus] = useState(false);
    const url = `https://www.youtube.com/watch?v=${id}`;
    function toggleMiniplayer() {
      if (!status) {
        buttonRef.current.classList.remove(classes.floatingBtn);
        setStatus(true);
      } else {
        buttonRef.current.classList.add(classes.floatingBtn);
        setStatus(false);
      }
    }
    return (
      <div
        className={`${classes.miniPlayer} ${classes.floatingBtn}`}
        ref={buttonRef}
        onClick={toggleMiniplayer}
      >
        <span className={`material-icons-outlined ${classes.open}`}>
          {" "}
          play_circle_filled{" "}
        </span>
        <span
          className={`material-icons-outlined ${classes.close}`}
          onClick={toggleMiniplayer}
        >
          {" "}
          close{" "}
        </span>
        <ReactPlayer className={classes.player} url={url} width="300px" height="168px" playing={status}  controls />
        <p>{title}</p>
      </div>
    );
}