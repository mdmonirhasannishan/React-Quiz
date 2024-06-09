import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByKey,
  get,
  startAt,
  limitToFirst,
} from "firebase/database";

export default function useVideos(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videosQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(12)
      );

      try {
        setLoading(true);
        setError(false);
        // request database
        const snapshot = await get(videosQuery);
        setLoading(false);
        if (snapshot.exists()) {
          const fetchedVideos = Object.values(snapshot.val());
          setVideos((prevVideos) => {
            const videoMap = new Map();
            
            prevVideos.forEach(video => videoMap.set(video.youtubeID, video));
            fetchedVideos.forEach(video => videoMap.set(video.youtubeID, video));
            
            return Array.from(videoMap.values());
          });
          
          setHasMore(fetchedVideos.length > 0);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        setError(true);
      }
    }

    fetchVideos();
    
  }, [page,videos]);

  
  return { loading, error, videos, hasMore };
}
