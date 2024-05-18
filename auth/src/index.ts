import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

const PORT = 4000;

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
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
