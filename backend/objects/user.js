const UserModel = require("../models/user.entity");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class User {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }
  async login(username, password) {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }
    if (!user.isActive) {
      throw new Error("User is not active");
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const parsedUser = JSON.parse(JSON.stringify(user));
      delete parsedUser.password;
      return jwt.sign(parsedUser, this.secret);
    } else {
      return "";
    }
  }
  async createUser(user) {
    const { username, password, firstName, lastName } = user;
    if (!username || !password || !firstName || !lastName) {
      throw new Error("Invalid request");
    }
    const existingUser = await UserModel.findOne({ username });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (existingUser) {
      throw new Error("Username is already taken");
    }
    const newUser = new UserModel({
      ...user,
      _id: uuidv4(),
      password: hash,
      isActive: true,
    });
    const savedUser = await newUser.save();
    return savedUser;
  }
  async getUserDetails(userId) {
    try {
      const user = await UserModel.findById(userId).select("username firstName lastName role -_id");
      return user;
    } catch (error) {
      console.error("Error getting user details:", error);
      throw error;
    }
  }
  async updatePassword(userId, newPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { password: hash },
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }
  async deactivateUser(userId) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
      );

      return user;
    } catch (error) {
      console.error("Error deactivating user:", error);
      throw error;
    }
  }
}

module.exports = User;
