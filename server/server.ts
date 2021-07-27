import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { UserCtrl } from "./controllers/user";
import { TweetsCtrl } from "./controllers/tweets";
import { registerValidations } from "./validations/register";
import { tweetsValidations } from "./validations/tweets";
import { passport } from "./core/passport";

const app = express();

import "./core/db";
import { session } from "passport";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get("/users", UserCtrl.index);
app.get(
  "/users/me",
  passport.authenticate("jwt", { session: false }),
  UserCtrl.getUserInfo
);
app.get("/users/:id", UserCtrl.show);

app.get("/tweets", TweetsCtrl.index);
app.get("/tweets/:id", TweetsCtrl.show);
app.post("/tweets",passport.authenticate("jwt"), tweetsValidations, TweetsCtrl.create);
app.delete("/tweets/:id",passport.authenticate("jwt"), TweetsCtrl.delete);
app.patch("/tweets/:id",passport.authenticate("jwt"),tweetsValidations, TweetsCtrl.update);

app.get("/auth/verify", UserCtrl.verify);
app.post("/auth/register", registerValidations, UserCtrl.create);
app.post("/auth/login", passport.authenticate("local"), UserCtrl.login);
// app.path("/users", UserCtrl.update);
// app.delete("/users", UserCtrl.delete);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
