import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuiz(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quizes, setQuizes] = useState([]);
  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const quizRef = ref(db, `/quiz/${id}/questions`);
      const quizQuery = query(quizRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        // request database
        const snapshot = await get(quizQuery);
        setLoading(false);
        if (snapshot.exists()) {
          const fetchQZ = Object.values(snapshot.val());
          setQuizes((prevVideos) => {
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

    fetchVideos();
  }, [id]);

  return { loading, error, quizes };
}
