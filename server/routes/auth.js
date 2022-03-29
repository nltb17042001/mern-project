// login logout register
const express = require("express");
const router = express.Router();
const User = require("../models/user");

const argon2 = require("argon2");

const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

//@router GET  api/auth
//@desc Check if user is logged in
//@access Public

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@router POST  api/auth/register
//@desc Register user
//@access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing username or password" });
  } else {
    try {
      // check for existing user
      const user = await User.findOne({ username: username });

      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Username already taken" });
      } else {
        //All good  => adduser
        // step 1: Hashpassword
        const hashedPassword = await argon2.hash(password);
        // step 2: adduser
        const newUser = new User({
          username,
          password: hashedPassword,
        });
        await newUser.save();

        //return token
        const accessToken = jwt.sign(
          { userId: newUser._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({
          success: true,
          message: "Create user successfully",
          accessToken,
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

//@router POST  api/auth/login
//@desc Login user
//@access Public

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing user or password" });

  try {
    //check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user or password" });
    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user or password" });
    // all goood
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ success: true, message: "Login Success", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: false, message: "Internal sever error" });
  }
});

module.exports = router;
