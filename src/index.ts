import 'dotenv/config';
import './mongoose/connect';
import express from "express";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './graphql/schema';

const app = express();
app.all('/graphql', createHandler({ schema }));

app.get('/', (req, res) => {
  res.send('Hello World.');
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
