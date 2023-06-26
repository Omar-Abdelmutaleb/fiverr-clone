import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { createError } from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  //const token = req.cookies.accessToken;
  //if (!token) return res.status(401).send("YOU ARE NOT AUTHENTICATED");

 // jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "YOU CAN ONLY DELETE YOUR OWN ACCOUNT"));
      
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(201).send("USER HAS BEEN DELETED");
//   });
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
    res.status(200).send(user);
};

export const xxx = async (req, res, next) => {
  const user = await User.findById(req.params.id);
    res.status(200).send(user);
};

