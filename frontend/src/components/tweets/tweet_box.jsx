import React from 'react';

class TweetBox extends React.Component {
  render() {
    return (
        <article className="card shadow-md my-8 p-8">
            <h3>{this.props.text}</h3>
        </article>
    );
  }
}

export default TweetBox;
