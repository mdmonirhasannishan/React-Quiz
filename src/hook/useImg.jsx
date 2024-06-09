import { useEffect, useState } from "react";

export default function useImg({ score, noq }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    
    const getKeyWord = () => {
      const percentage = (score / (noq * 5)) * 100;
      if (percentage < 50) {
        return "failed";
      } else if (percentage < 75) {
        return "good";
      } else if (percentage < 100) {
        return "very good";
      } else if (percentage===100) {
        return "excellent";
      }
    };
    
    const fetchImg = async () => {
      try {
        setLoading(true);
        setError(false);
        const keyword = getKeyWord();
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${keyword}&per_page=1`,
          {
            method: "GET",
            headers: { Authorization: import.meta.env.VITE_PEXEL_IMG_API_KEY },
          }
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImg();
  }, [score, noq]);

  return {
    loading,
    error,
    results,
  };
}
