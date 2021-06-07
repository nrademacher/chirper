import React, { useEffect } from "react";
import TweetBox from "../tweets/TweetBox";
import { fetchUserTweets } from "../../actions/tweetActions";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const tweets = useSelector((state) => Object.values(state.tweets.user));
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentUser.id);
    dispatch(fetchUserTweets(currentUser.id));
  }, [currentUser, dispatch]);

  if (tweets.length === 0) {
    return <div>This user has no Tweets</div>;
  } else {
    return (
      <div className="mt-[5vh] max-w-[95vw] md:max-w-[50vw] mx-auto">
        <h2 className="font-semibold text-3xl">Your Tweets</h2>
        {tweets.map((tweet) => (
          <TweetBox key={tweet._id} text={tweet.text} />
        ))}
      </div>
    );
  }
};

export default Profile;
