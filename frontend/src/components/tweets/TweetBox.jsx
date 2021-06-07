import React from 'react';

const TweetBox = ({ text, deleteTweet }) => (
  <article className="p-8 my-8 shadow-md card">
    <h3 className="text-lg">{text}</h3>
    {deleteTweet && (
      <button
        className="mx-auto mt-8 w-1/4 btn btn-secondary"
        onClick={deleteTweet}
      >
        Delete
      </button>
    )}
  </article>
);

export default TweetBox;
