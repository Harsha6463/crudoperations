import UserModel from "../models/Usermodels.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import { comparePassword, encryptedPassword } from "../utils/bcrypt.js";

const SecretKey = process.env.SECURIT_KEY;
const tokenExpires = process.env.EXPIRES_TIME;
export const createUser = async (req, res) => {
  try {
    const userExisted = await UserModel.findOne({
      $or: [{ email: req.body.email }, { mobileNo: req.body.mobileNo }],
    });
    console.log(userExisted);
    if (userExisted) {
      throw Error("User Already Existed");
    } else {
      const hashedPassword = encryptedPassword(req.body.password);
      const user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        mobileNo: req.body.mobileNo,
        company: req.body.company,
        country: req.body.country,
      });
      const savedUser = await user.save();
      console.log(savedUser);
      res.status(201).json({ message: "User Created successfully", savedUser });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      throw Error("Email Not found");
    }
    const passMatch = comparePassword(req.body.password, user.password);
    console.log(passMatch)
    if (!passMatch) {
      throw Error("Incorrect password");
    }

    const token = jwt.sign(user.toObject(), SecretKey, {
      expiresIn: tokenExpires,
    });
    console.log({ message: "Login successfully", token });
    res.status(200).send({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Updated successfully ", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

