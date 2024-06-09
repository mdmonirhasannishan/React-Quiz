import classes from "../styles/Videos.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { Link } from "react-router-dom";
import Video from "../components/Video";
import useVideos from "../hook/useVideos";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideos(page);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          className={classes.videos}
          dataLength={videos.length}
          hasMore={hasMore}
          loader={videos.length!==32?<h1>Loading...</h1>:<></>}
          next={() => setPage((prevPage) => prevPage + 1)} // Increment the page number correctly
        >
          {videos.map((video, index) => {
            return video.noq > 0 ? (
              <Link
                to={`/quiz/${video.youtubeID}`}
                state={{
                  videoTitle:video.title,
                }}
                key={`${video.youtubeID}`}
              >
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video
                title={video.title}
                key={`${video.youtubeID}-${index}`}
                id={video.youtubeID}
                noq={video.noq}
              />
            );
          })}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
