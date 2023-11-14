import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(uri);
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo Instance - Mongoose 2');
});

mongoose.connection.on('error', (reason) => {
  console.log('Error connecting to Mongo', reason);
});
