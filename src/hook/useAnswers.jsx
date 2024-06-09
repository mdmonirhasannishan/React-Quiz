import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useAnswers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answersRef = ref(db, `/answers/${id}/questions`);
      const answersQuery = query(answersRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        // request database
        const snapshot = await get(answersQuery);
        setLoading(false);
        if (snapshot.exists()) {
          const fetchQZ = Object.values(snapshot.val());
          setAnswers((prevVideos) => {
            const quizMap = new Map();

            prevVideos.forEach((quiz, index) => quizMap.set(index, quiz));
            fetchQZ.forEach((quiz, index) => quizMap.set(index, quiz));
            return Array.from(quizMap.values());
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        setError(true);
      }
    }

    fetchAnswers();
  }, [id]);

  return { loading, error, answers };
}
