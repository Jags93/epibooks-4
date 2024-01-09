import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

function CommentArea({ asin }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (asin) {
        setIsLoading(true);
        try {
          let response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
            headers: {
              Authorization: "Bearer inserisci-qui-il-tuo-token",
            },
          });
          if (response.ok) {
            let comments = await response.json();
            setComments(comments);
            setIsLoading(false);
            setIsError(false);
          } else {
            setIsLoading(false);
            setIsError(true);
          }
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          setIsError(true);
        }
      }
    };

    fetchComments();
  }, [asin]); // La dipendenza useEffect è 'asin'

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
}

export default CommentArea;
