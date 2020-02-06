const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");

router.get("/gh", auth, async (req, res) => {
  try {
    const response = await axios.get(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_API_CLIENT_ID}&scope=repo`
    );

    if (response.status === 200) {
      res.send(response.data);
    } else {
      throw new Error("Invalid Response from GitHub");
    }
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
