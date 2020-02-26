const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies.projedexToken
    // *Check if Cookie exists
    if (tokenFromCookie) {
      // *Verify the jwt value
      const decoded = jwt.verify(tokenFromCookie, process.env.JWT_SECRET)
      const user = await User.findOne({
        _id: decoded._id,
        'tokens.token': tokenFromCookie
      })
      if (!user) {
        throw new Error(`No user found in database. { _id: ${decoded._id}, tokens.token: ${tokenFromCookie}, path: ${req.originalUrl} }`)
      }

      // * User is authenticated
      req.user = user
      next()
    } else {
      console.log({ reqPath: req.path, reqQuery: req.query })
      if (req.path === '/gh' && req.query.accessToken) {
        // * There is no cookie here b/c the user is coming back from GitHub.com
        // TODO - ? Probably check header for if it came from GitHub?
        console.log('User has been redirected from GitHub')
        next()
      } else {
        // * User is not authenticated correctly
        throw new Error(`Request for ${req.originalUrl} was made without a cookie!`)
      }
    }
  } catch (e) {
    console.log(e)
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = auth
