import React from 'react';

const TweetBox = ({ text, deleteTweet }) => (
  <article className="p-8 my-8 shadow-md card">
    <h3>{text}</h3>
    {deleteTweet && (
      <button className="text-warning" onClick={deleteTweet}>
        Delete
      </button>
    )}
  </article>
);

export default TweetBox;
