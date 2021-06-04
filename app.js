require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/api/users')
const tweets = require('./routes/api/tweets')

const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api/users', users)
app.use('/api/tweets', tweets)

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello world'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
