import express from "express";
import { UserModel } from "../models/User";
import { validationResult } from "express-validator";
import { generateMD5 } from "../utils/generateHash";
import { sendEmail } from "../utils/sendEmail";
import { isValidObjectId } from '../utils/isValidObjectId'
import jwt from "jsonwebtoken";


class UserController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();
      res.json({
        status: "success",
        data: users,
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
      const userId = req.params.id;
      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findOne({ _id: userId }).exec();

      if (!user) {
        res.status(400).send();
        return;
      }

      res.json({
        status: "success",
        data: user,
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", errors: errors.array() });
        return;
      }
      const { email, username, fullname, password } = req.body;
      const data = {
        email,
        username,
        fullname,
        password: generateMD5(password + process.env.SECRET),
        confirm_hash: generateMD5(
          process.env.SECRET || Math.random().toString()
        ),
      };

      const user = await UserModel.create(data);
      sendEmail({
        emailFrom: "admin@twitter.com",
        emailTo: data.email,
        subject: "Подтверждение почты Twitter Clone",
        html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${
          process.env.PORT || 5000
        }/auth/verify?hash=${data.confirm_hash}">по этой ссылке</a>`,
      });
      res.json({ status: "success", data: user });
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;
      if (!hash) {
        res.status(400).send();
        return;
      }
      const user = await UserModel.findOne({ confirm_hash: hash }).exec();
      if (user) {
        user.confirmed = true;
        await user.save();
        res.json({
          status: "success",
        });
      } else {
        res.status(404).json({
          status: "error",
          error: "Пользователь не найден",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
  async login(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as any).toJSON() : undefined;
      res.json({
        status: "success",
        data: {
          ...user,
          token: jwt.sign(
            { data: req.user },
            process.env.SECRET || "secret",
            { expiresIn: "30 days" }
          ),
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
  async getUserInfo(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const user = req.user ? (req.user as any).toJSON() : undefined;
      res.json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        errors: err,
      });
    }
  }
}

export const UserCtrl = new UserController();
