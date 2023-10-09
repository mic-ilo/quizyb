const express = require("express");
const router = express.Router();
const User = require("../objects/user");
const UserModel = require("../models/user.entity");


router.post("/register", async (req, res) => {
  try {
    const user = new User();
    const body = req.body;
    const existingUser = await UserModel.findOne({ username: body.username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    const savedUser = await user.createUser(body);
    res.status(200).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = new User();

    const userDetails = await user.getUserDetails(userId);

    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/update-password/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = new User();
    const newPassword = req.body.newPassword;

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    const updatedUser = await user.updatePassword(userId, newPassword);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/deactivate/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = new User();

    const deactivatedUser = await user.deactivateUser(userId);

    if (!deactivatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deactivated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
