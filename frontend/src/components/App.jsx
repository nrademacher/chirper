import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/routeUtil';
import { Switch } from 'react-router-dom';
import NavBar from './nav/NavBar';
import Tweets from './tweets/Tweets';
import MainPage from './main/MainPage';
import LoginForm from './session/LoginForm';
import SignupForm from './session/SignupForm';
import Profile from './profile/Profile';
import TweetCompose from './tweets/TweetCompose';

const App = () => (
  <div className="min-h-screen bg-base-100 text-primary-content subpixel-antialiased">
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />

      <ProtectedRoute exact path="/tweets" component={Tweets} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/new_tweet" component={TweetCompose} />
    </Switch>
  </div>
);

export default App;
