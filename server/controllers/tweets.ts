import express from "express";
import { TweetModel } from "../models/Tweet";
import { isValidObjectId } from "../utils/isValidObjectId";
import { validationResult } from "express-validator";

class TweetsController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweets = await TweetModel.find({})
        .populate("user")
        .sort({ createdAt: "-1" })
        .exec();
      res.json({
        status: "success",
        data: tweets,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;
      if (!isValidObjectId(tweetId)) {
        res.status(400).send();
        return;
      }

      const tweet = await TweetModel.findOne({ _id: tweetId })
        .populate("user")
        .exec();

      if (!tweet) {
        res.status(400).send();
        return;
      }

      res.json({
        status: "success",
        data: tweet,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user: any = req.user;
      if (user) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ status: "error", errors: errors.array() });
          return;
        }
        const data = {
          text: req.body.text,
          images: req.body.images,
          user: user._id,
        };
        const tweet = await TweetModel.create(data);
        res.json({
          status: "success",
          data: await tweet.populate("user").execPopulate(),
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user: any = req.user;
      if (user) {
        const tweetId = req.params.id;
        if (!isValidObjectId(tweetId)) {
          res.status(400).send();
          return;
        }
        const tweet = await TweetModel.findOne({ _id: tweetId });
        if (tweet) {
          if (user._id.equals(tweet.user)) {
            tweet.remove();
            res.status(200).send();
          } else {
            res.status(400).send();
          }
        } else {
          res.status(404).send();
        }
        res.status(200).send();
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user: any = req.user;
      if (user) {
        const tweetId = req.params.id;
        if (!isValidObjectId(tweetId)) {
          res.status(400).send();
          return;
        }
        const tweet = await TweetModel.findOne({ _id: tweetId });

        if (tweet) {
          if (user._id.equals(tweet.user)) {
            const { text } = req.body;
            tweet.text = text;
            tweet.save();
            res.status(200).send();
          } else {
            res.status(400).send();
          }
        } else {
          res.status(404).send();
        }
        res.status(200).send();
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
}

export const TweetsCtrl = new TweetsController();
