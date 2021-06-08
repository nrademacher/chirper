const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

// Get all tweets
router.get('/', (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then((tweets) => res.json(tweets))
    .catch((err) => res.status(404).json({ notweetsfound: 'No tweets found' }));
});

// Get a user's tweets
router.get('/user/:userId', (req, res) => {
  Tweet.find({ user: req.params.userId })
    .then((tweets) => res.json(tweets))
    .catch((err) =>
      res.status(404).json({ notweetsfound: 'No tweets found from that user' })
    );
});

// Get an individual tweet
router.get('/:id', (req, res) => {
  Tweet.findById(req.params.id)
    .then((tweet) => res.json(tweet))
    .catch((err) =>
      res.status(404).json({ notweetfound: 'No tweet found with that ID' })
    );
});

// Post tweets on jwt-protected route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTweet = new Tweet({
      text: req.body.text,
      user: req.user.id,
    });

    newTweet.save().then((tweet) => res.json(tweet));
  }
);

router.patch(
  '/:userId/:tweetId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }


    try {
      const tweet = await Tweet.updateOne(
        { _id: req.params.tweetId, user: req.params.userId },
        { text: req.body.text }
      );
      tweet.n
        ? res.json({ success: true, modified: tweet.nModified })
        : res.json({ sucess: false, error: 'no such tweet' });
    } catch {
      res
        .status(404)
        .json({ notweetfound: 'No tweet found from that user with that ID' });
    }
  }
);

router.delete(
  '/:userId/:tweetId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Tweet.deleteOne({ _id: req.params.tweetId, user: req.params.userId })
      .then((tweet) =>
        tweet.deletedCount
          ? res.json({ success: true, deleted: tweet.deletedCount })
          : res.json({ success: false, error: 'no such tweet' })
      )
      .catch((err) =>
        res
          .status(404)
          .json({ notweetfound: 'No tweet found from that user with that ID' })
      );
  }
);

module.exports = router;
