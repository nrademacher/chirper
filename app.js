require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const db = process.env.MONGO_URI;
console.log(db)
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello world'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
