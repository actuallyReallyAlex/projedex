const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/gh", auth, async (req, res) => {
  try {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&scope=repo`;
    res.send({ url });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
