process.env.NODE_ENV === 'development' && require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const passport = require('passport');
require('./config/passport')(passport);
const cors = require('cors');
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

// The buildSchema function can take in a string and outputs a GraphQLSchema object
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// We are only including the root resolver for this demonstration to get a response without having a backend
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    // register our schema
    schema: schema,
    // here we setup the root to have our response without a backend
    rootValue: root,
  })
);
app.use('/api/users', users);
app.use('/api/tweets', tweets);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
