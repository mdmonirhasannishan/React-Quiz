/* eslint-disable no-case-declarations */
import { useState, useReducer, useEffect,} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import _ from "lodash";
import Answers from "../components/Answers";
import { getDatabase, set, ref } from "firebase/database";
import ProgressBar from "../components/ProgressBar";
import Miniplayer from "../components/MiniPlayer";
import useQuiz from "../hook/useQuiz";

const initialState = null;

function reducer(state, action) {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
}

export default function QuizQS() {
  const location = useLocation();
  const { videoTitle } = location.state;
  const navigate = useNavigate();
  const { id } = useParams();
  const [qna, dispatch] = useReducer(reducer, initialState);
  const [currentQus, setCurrentQus] = useState(0);
  const { loading, error, quizes } = useQuiz(id);
  const { currentUser } = useAuth(); // Correct way to use AuthContext
  useEffect(() => {
    if (quizes.length > 0) {
      dispatch({
        type: "questions",
        value: quizes,
      });
    }
  }, [quizes]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQus,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  function nextQS() {
    setCurrentQus((prev) => (prev < qna.length - 1 ? prev + 1 : prev));
  }

  function prevQS() {
    setCurrentQus((prev) => (prev > 0 ? prev - 1 : prev));
  }

  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    navigate(`/result/${id}`, {
      state: {
        qna: qna,
      },
    });
  }

  const percentage =
    quizes.length > 0 ? ((currentQus + 1) / quizes.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading ...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQus].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQus].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQS}
            prev={prevQS}
            submit={submit}
            progress={percentage}
          />
          <Miniplayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
