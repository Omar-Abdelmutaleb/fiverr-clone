import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("USER HAS BEEN CREATED");

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) return next(createError(404, 'User not found'));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, 'PASSWORD OR USERNAME IS INCORRECT'));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...otherInfo } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(otherInfo);
  } catch (error) {
     next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken", {
    sameSite: "none", // This is because the backend and frontend have different PORTS
    secure: true,
  }).status(200).send("USER HAS BEEN LOGGED OUT");
};
