import Answers from "../components/Answers";
import classes from "../styles/Question.module.css";
export default function Question({answers}) {
  return answers.map((question,index)=>{
    return(
      <div className={classes.question} key ={index}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {question.title}
      </div>
      <Answers input={false} options={question.options} />
    </div>
    )
  })
}
