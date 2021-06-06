import axios from 'axios';

export const getTweets = () => {
  return axios.get('http://localhost:5000/api/tweets')
};

export const getUserTweets = id => {
  return axios.get(`http://localhost:5000/api/tweets/user/${id}`)
};

export const writeTweet = data => {
  return axios.post('http://localhost:5000/api/tweets/', data)
}
