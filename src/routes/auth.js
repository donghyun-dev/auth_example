const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const { auth } = require("../middleware/auth");
const authService = require("../services/auth");

router.post("/signup", async (req, res) => {
  const result = await authService.signUp(req, res);
  if (result.status === 200) {
    return res.status(200).json(result);
  } else if (result.status === 409) {
    return res.status(409).json(result);
  } else {
    return res.status(500).json(result);
  }
});

// login
router.post("/login", async (req, res) => {
  const result = await authService.logIn(req, res);
  if (result.status === 200) {
    return res
      .status(200)
      .setHeader("Authorization", "Bearer " + result.accessToken)
      .json(result);
  } else if (result.status === 401) {
    return res.status(401).json(result);
  } else {
    return res.status(500).json(result);
  }
});

// logout
router.get("/logout", auth, (req, res) => {
  return res.status(200).json({ isOk: true });
});

module.exports = router;
