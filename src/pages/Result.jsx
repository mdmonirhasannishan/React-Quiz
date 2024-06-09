import _ from "lodash";
import { useLocation } from "react-router-dom";
import Analysis from "../components/Analysis";
import Summary from "../components/Summary";
import useAnswers from "../hook/useAnswers";
export default function Result() {
  const { loading, error, answers } = useAnswers();
  const location = useLocation();
  const { qna } = location.state;
  function calculate() {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked=true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });

    return score;
  }

  const userScore = calculate();
  return (
    <>
      {loading && <>Loading...</>}
      {error && <>There was a error !</>}
      <Summary score={userScore} noq={qna.length}/>
      <Analysis answers={answers} />
    </>
  );
}
