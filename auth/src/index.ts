import mongoose from 'mongoose';

import { app } from './app';

const PORT = 4000;

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined.');
  }

  try {
    await mongoose.connect('mongodb://auths-mongo-srv:27017/auths');

    console.log('Connected to MongoDB.');
  } catch (err) {
    console.error(err);
  }
};

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

start();
