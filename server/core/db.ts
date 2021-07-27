import mongoose from "mongoose";

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/twitter', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error :"));

export { db, mongoose };
