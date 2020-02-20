/**
 * Attempts to redirect http requests to the https equivalent request.
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Next function
 */
const secure = (req, res, next) => {
  try {
    if (!req.secure && process.env.NODE_ENV === "production") {
      console.warn(`Request to ${req.url} made via http. Routing to https.`);
      res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
      next();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e });
  }
};

module.exports = secure;
