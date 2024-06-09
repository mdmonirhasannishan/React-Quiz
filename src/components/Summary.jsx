/* eslint-disable react/prop-types */
import successImage from "../assets/images/success.png";
import useImg from "../hook/useImg";
import classes from "../styles/Summary.module.css";
export default function Summary({ score, noq }) {


 const { loading, error, results } = useImg({score:score,noq:noq});

  const image = results ? results?.photos[0].src.medium : successImage;
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/*  <!-- progress bar will be placed here --> */}
        <p className={classes.score}>
          Your score is <br />
          {score} of {noq * 5}
        </p>
      </div>
      {loading && <div className={classes.badge}>Loading your badge...</div>}

      {error && <div className={classes.badge}>An error occured!</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
